import {Component} from 'react'
import Cookies from 'js-cookie'
import Header from '../Header'
import MovieCard from '../MovieCard'

import './index.css'
import Footer from '../Footer'
import LoaderView from '../LoaderView'
import FailureView from '../FailureView'

const apiConstraints = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Popular extends Component {
  state = {apiStatus: '', data: []}

  componentDidMount() {
    this.getPopularMoviesData()
  }

  getFormattedData = movie => ({
    id: movie.id,
    backdropPath: movie.backdrop_path,
    posterPath: movie.poster_path,
    title: movie.title,
  })

  getPopularMoviesData = async () => {
    this.setState({apiStatus: apiConstraints.loading})
    const apiUrl = 'https://apis.ccbp.in/movies-app/popular-movies'

    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.results.map(movie =>
        this.getFormattedData(movie),
      )
      this.setState({data: updatedData, apiStatus: apiConstraints.success})
    } else {
      this.setState({apiStatus: apiConstraints.failure})
    }
  }

  renderLoaderView = () => <LoaderView className="loader-container" />

  renderFailureView = () => (
    <div className="failure-view">
      <FailureView
        imgUrl="popular"
        onClickTryAgain={this.getPopularMoviesData}
      />
    </div>
  )

  renderSuccessView = () => {
    const {data} = this.state

    return (
      <>
        <ul className="movies-cards-container">
          {data.map(movie => (
            <MovieCard key={movie.id} movieDetails={movie} />
          ))}
        </ul>
        <Footer />
      </>
    )
  }

  renderView = () => {
    const {apiStatus} = this.state

    switch (apiStatus) {
      case apiConstraints.loading:
        return this.renderLoaderView()
      case apiConstraints.success:
        return this.renderSuccessView()
      case apiConstraints.failure:
        return this.renderFailureView()
      default:
        return null
    }
  }

  render() {
    return (
      <div className="popular-bg-container">
        <Header />
        {this.renderView()}
      </div>
    )
  }
}

export default Popular
