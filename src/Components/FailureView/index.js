import './index.css'

const FailureView = props => {
  const {onClickTryAgain, imgUrl} = props

  const imageUrl =
    imgUrl !== undefined
      ? 'https://res.cloudinary.com/dpnwub4a7/image/upload/v1686588543/Background-Complete_1_rxq7oo.png'
      : 'https://res.cloudinary.com/dkbxi5qts/image/upload/v1660451047/movies%20prime%20app/alert-triangle_najaul.png'

  const classname = imgUrl !== undefined ? 'failure-img2' : 'failure-img'

  return (
    <div className="failure-container">
      <img src={imageUrl} alt="failure view" className={classname} />
      <p className="failure-para">Something went wrong. Please try again</p>
      <button
        type="button"
        className="try-again-button"
        onClick={() => {
          onClickTryAgain()
        }}
      >
        Try Again
      </button>
    </div>
  )
}

export default FailureView
