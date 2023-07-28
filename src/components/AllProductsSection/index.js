import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'

import FiltersGroup from '../FiltersGroup'
import ProductCard from '../ProductCard'
import ProductsHeader from '../ProductsHeader'

import './index.css'

const categoryOptions = [
  {
    name: 'Clothing',
    categoryId: '1',
  },
  {
    name: 'Electronics',
    categoryId: '2',
  },
  {
    name: 'Appliances',
    categoryId: '3',
  },
  {
    name: 'Grocery',
    categoryId: '4',
  },
  {
    name: 'Toys',
    categoryId: '5',
  },
]

const sortbyOptions = [
  {
    optionId: 'PRICE_HIGH',
    displayText: 'Price (High-Low)',
  },
  {
    optionId: 'PRICE_LOW',
    displayText: 'Price (Low-High)',
  },
]

const ratingsList = [
  {
    ratingId: '4',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-four-stars-img.png',
  },
  {
    ratingId: '3',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-three-stars-img.png',
  },
  {
    ratingId: '2',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-two-stars-img.png',
  },
  {
    ratingId: '1',
    imageUrl:
      'https://assets.ccbp.in/frontend/react-js/rating-one-star-img.png',
  },
]

const apiStatusConstants = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class AllProductsSection extends Component {
  state = {
    productsList: [],
    apiStatus: apiStatusConstants.initial,
    activeOptionId: sortbyOptions[0].optionId,
    category: '',
    titleSearch: '',
    rating: '',
  }

  componentDidMount() {
    this.getProducts()
  }

  onChangeCategoryId = CatId => {
    this.setState(
      {
        category: CatId,
      },
      this.getProducts,
    )
  }

  onChangeRatingId = RatId => {
    this.setState(
      {
        rating: RatId,
      },
      this.getProducts,
    )
  }

  onChangeTitleSearchInput = searchInput => {
    this.setState(
      {
        titleSearch: searchInput,
      },
      this.getProducts,
    )
  }

  onClearingParameters = () => {
    this.setState(
      {
        titleSearch: '',
        rating: '',
        category: '',
      },
      this.getProducts,
    )
  }

  getProducts = async () => {
    this.setState({
      apiStatus: apiStatusConstants.inProgress,
    })
    const jwtToken = Cookies.get('jwt_token')

    // TODO: Update the code to get products with filters applied
    const {category, titleSearch, rating} = this.state
    console.log(titleSearch)
    const categoryFilter =
      category === '' ? `category=` : `category=${category}`
    const titleSearchFilter =
      titleSearch === '' ? `title_search=` : `title_search=${titleSearch}`
    const ratingFilter = rating === '' ? `rating=` : `rating=${rating}`

    const {activeOptionId} = this.state
    const apiUrl = `https://apis.ccbp.in/products?sort_by=${activeOptionId}&${titleSearchFilter}&${categoryFilter}&${ratingFilter}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = fetchedData.products.map(product => ({
        title: product.title,
        brand: product.brand,
        price: product.price,
        id: product.id,
        imageUrl: product.image_url,
        rating: product.rating,
      }))
      this.setState({
        productsList: updatedData,
        apiStatus: apiStatusConstants.success,
      })
    } else {
      this.setState({
        apiStatus: apiStatusConstants.failure,
      })
    }
  }

  changeSortby = activeOptionId => {
    this.setState({activeOptionId}, this.getProducts)
  }

  renderProductsList = () => {
    const {productsList, activeOptionId} = this.state

    // TODO: Add No Products View
    if (productsList.length === 0) {
      return (
        <div className="no-products-cont">
          <img
            src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-no-products-view.png"
            alt="no products"
            className="no-products-img"
          />
          <h1 className="no-products-heading">No Products Found</h1>
          <p className="no-products-para">
            we could not find any products. Try other filters.
          </p>
        </div>
      )
    }
    return (
      <div className="all-products-container">
        <ProductsHeader
          activeOptionId={activeOptionId}
          sortbyOptions={sortbyOptions}
          changeSortby={this.changeSortby}
        />
        <ul className="products-list">
          {productsList.map(product => (
            <ProductCard productData={product} key={product.id} />
          ))}
        </ul>
      </div>
    )
  }

  renderLoader = () => (
    <div className="products-loader-container">
      <Loader type="ThreeDots" color="#0b69ff" height="50" width="50" />
    </div>
  )

  // TODO: Add failure view
  renderFailureView = () => (
    <div className="failure-view-cont">
      <img
        src="https://assets.ccbp.in/frontend/react-js/nxt-trendz/nxt-trendz-products-error-view.png"
        alt="products failure"
        className="failure-view-img"
      />
      <h1 className="failure-view-heading">Oops! Something Went Wrong</h1>
      <p className="failure-view-para">
        We are having some trouble processing your request. Please try again.
      </p>
    </div>
  )

  render() {
    const {apiStatus} = this.state

    const displayElement = () => {
      switch (apiStatus) {
        case apiStatusConstants.inProgress:
          return this.renderLoader()
        case apiStatusConstants.success:
          return this.renderProductsList()
        case apiStatusConstants.failure:
          return this.renderFailureView()
        default:
          return null
      }
    }

    return (
      <div className="all-products-section">
        {/* TODO: Update the below element */}
        <FiltersGroup
          categoryOptionsList={categoryOptions}
          ratingsList={ratingsList}
          onChangeCategoryId={this.onChangeCategoryId}
          onChangeRatingId={this.onChangeRatingId}
          onChangeTitleSearchInput={this.onChangeTitleSearchInput}
          onClearingParameters={this.onClearingParameters}
        />
        {displayElement()}
      </div>
    )
  }
}

export default AllProductsSection
