import './index.css'

const CategoryItem = props => {
  const {eachCat, onClickCategoryItem} = props
  const {categoryId, name} = eachCat
  const sendCatId = () => {
    onClickCategoryItem(categoryId)
  }

  return (
    <li className="category-item">
      <button type="button" className="cat-btn" onClick={sendCatId}>
        <p>{name}</p>
      </button>
    </li>
  )
}

export default CategoryItem
