import {Component} from 'react'
import {Link} from 'react-router-dom'
import Slider from 'react-slick'

/* Add css to your project */
import './index.css'

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 4,
  slidesToScroll: 1,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 4,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 800,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 3,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 300,
      settings: {
        slidesToShow: 2,
        slidesToScroll: 1,
      },
    },
  ],
}

class MoviesSlick extends Component {
  renderSlider = () => {
    const {data} = this.props

    return (
      <Slider {...settings}>
        {data.map(eachMovie => {
          const {id, posterPath, title} = eachMovie
          return (
            <div className="slick-item" key={id}>
              <Link to={`/movies/${id}`}>
                <img className="movie-image" src={posterPath} alt={title} />
              </Link>
            </div>
          )
        })}
      </Slider>
    )
  }

  render() {
    return (
      <div className="main-container">
        <div className="slick-container">{this.renderSlider()}</div>
      </div>
    )
  }
}

export default MoviesSlick
