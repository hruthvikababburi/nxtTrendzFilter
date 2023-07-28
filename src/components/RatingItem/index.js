import './index.css'

const RatingItem = props => {
  const {eachRat, onClickRatingId} = props
  const {ratingId, imageUrl} = eachRat
  const sendRatingId = () => {
    onClickRatingId(ratingId)
  }
  const altConstant = `rating ${ratingId}`
  return (
    <li className="each-star-item">
      <button type="button" className="ratingBtn" onClick={sendRatingId}>
        <img src={imageUrl} alt={altConstant} className="stars" />
        <p className="text">& up</p>
      </button>
    </li>
  )
}

export default RatingItem
