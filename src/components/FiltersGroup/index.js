import {Component} from 'react'

import {BsSearch} from 'react-icons/bs'

import RatingItem from '../RatingItem'

import CategoryItem from '../categoryItem'

import './index.css'

class FiltersGroup extends Component {
  state = {searchInput: ''}

  render() {
    const {
      categoryOptionsList,
      ratingsList,
      onChangeCategoryId,
      onChangeRatingId,
      onChangeTitleSearchInput,
      onClearingParameters,
    } = this.props

    const {searchInput} = this.state

    console.log(searchInput)

    const changingInput = event => {
      this.setState({
        searchInput: event.target.value,
      })
    }

    const functionToSendInput = () => {
      onChangeTitleSearchInput(searchInput)
    }

    const sendInput = event => {
      event.preventDefault()
      console.log('Done')
      functionToSendInput()
    }

    const onClickCategoryItem = CatId => {
      onChangeCategoryId(CatId)
    }

    const onClickRatingId = ratingId => {
      onChangeRatingId(ratingId)
    }

    const clearBtn = () => {
      console.log('Clicked ClearBt')
      this.setState(
        {
          searchInput: '',
        },
        onClearingParameters,
      )
    }

    return (
      <form className="filters-group-container" onSubmit={sendInput}>
        <div className="search-cont">
          <input
            type="search"
            placeholder="Search"
            className="inputSearchEl"
            onChange={changingInput}
            value={searchInput}
          />
          <BsSearch />
        </div>
        <h1 className="main-heading">Category</h1>
        <ul className="category-list">
          {categoryOptionsList.map(each => (
            <CategoryItem
              eachCat={each}
              key={each.categoryId}
              onClickCategoryItem={onClickCategoryItem}
            />
          ))}
        </ul>
        <h1 className="main-heading">Rating</h1>
        <ul className="ratings-list">
          {ratingsList.map(each => (
            <RatingItem
              eachRat={each}
              key={each.ratingId}
              onClickRatingId={onClickRatingId}
            />
          ))}
        </ul>
        <button type="button" className="clear-btn" onClick={clearBtn}>
          Clear Filters
        </button>
      </form>
    )
  }
}

export default FiltersGroup
