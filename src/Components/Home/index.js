import {Component} from 'react'

import Cookies from 'js-cookie'

import Header from '../Header'
import './index.css'
import LoaderView from '../LoaderView'
import MoviesSlick from '../MoviesSlick'
import Footer from '../Footer'
import FailureView from '../FailureView'

const apiConstraints = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class Home extends Component {
  state = {
    randomMovie: '',
    orginalsApiStatus: apiConstraints.loading,
    trendingApiStatus: apiConstraints.loading,
    topRatedApiStatus: apiConstraints.loading,
    orginalsData: [],
    trendingData: [],
    topRatedData: [],
  }

  componentDidMount() {
    this.getTrendingNowApiData()
    this.getOrginalsApiData()
    this.getTopRatedApiData()
  }

  getFormattedData = movie => ({
    id: movie.id,
    backdropPath: movie.backdrop_path,
    posterPath: movie.poster_path,
    overview: movie.overview,
    title: movie.title,
  })

  getTopRatedApiData = async () => {
    this.setState({topRatedApiStatus: apiConstraints.loading})

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/movies-app/top-rated-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.results.map(eachMovie =>
        this.getFormattedData(eachMovie),
      )

      this.setState({
        topRatedApiStatus: apiConstraints.success,
        topRatedData: updatedData,
      })
    } else {
      this.setState({topRatedApiStatus: apiConstraints.failure})
    }
  }

  getOrginalsApiData = async () => {
    this.setState({orginalsApiStatus: apiConstraints.loading})

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/movies-app/originals'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const randomMovie = this.getFormattedData(
        data.results[Math.floor(Math.random() * data.results.length)],
      )

      const updatedData = data.results.map(eachMovie =>
        this.getFormattedData(eachMovie),
      )

      this.setState({
        orginalsApiStatus: apiConstraints.success,
        orginalsData: updatedData,
        randomMovie,
      })
    } else {
      this.setState({orginalsApiStatus: apiConstraints.failure})
    }
  }

  getTrendingNowApiData = async () => {
    this.setState({trendingApiStatus: apiConstraints.loading})

    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis.ccbp.in/movies-app/trending-movies'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const updatedData = data.results.map(eachMovie =>
        this.getFormattedData(eachMovie),
      )

      this.setState({
        trendingApiStatus: apiConstraints.success,
        trendingData: updatedData,
      })
    } else {
      this.setState({trendingApiStatus: apiConstraints.failure})
    }
  }

  onClickPlayButton = () => {
    const {history} = this.props
    const {randomMovie} = this.state
    const {id} = randomMovie
    history.push(`/movies/${id}`)
  }

  renderRandomMovie = () => {
    const {randomMovie} = this.state
    const {title, overview} = randomMovie
    const bgUrl = randomMovie.backdropPath

    return (
      <div
        className="random-movie-container"
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
        }}
      >
        <Header className="header" />
        <div className="random-movie-details-container">
          <h1 className="random-movie-title">{title}</h1>
          <p className="random-movie-overview">{overview}</p>

          <button
            type="button"
            className="play-button"
            onClick={this.onClickPlayButton}
          >
            Play
          </button>
        </div>
      </div>
    )
  }

  renderTrendingContainer = () => {
    const {trendingData} = this.state

    return <MoviesSlick heading="Trending Now" data={trendingData} />
  }

  renderOrginalsContainer = () => {
    const {orginalsData} = this.state

    return <MoviesSlick heading="Orginals" data={orginalsData} />
  }

  renderTopRatedContainer = () => {
    const {topRatedData} = this.state

    return <MoviesSlick heading="Top Rated" data={topRatedData} />
  }

  renderRandomMovieView = () => {
    const {orginalsApiStatus} = this.state

    switch (orginalsApiStatus) {
      case apiConstraints.loading:
        return (
          <div className="random-movie-failure-container">
            <Header />
            <LoaderView />
          </div>
        )
      case apiConstraints.success:
        return this.renderRandomMovie()

      case apiConstraints.failure:
        return (
          <div className="random-movie-failure-container">
            <Header />
            <FailureView onClickTryAgain={this.getOrginalsApiData} />
          </div>
        )
      default:
        return null
    }
  }

  renderTrendingView = () => {
    const {trendingApiStatus} = this.state

    switch (trendingApiStatus) {
      case apiConstraints.loading:
        return (
          <div className="loading-container">
            <LoaderView />
          </div>
        )
      case apiConstraints.success:
        return (
          <div className="movies-container">
            {this.renderTrendingContainer()}
          </div>
        )
      case apiConstraints.failure:
        return (
          <div className="loading-container">
            <FailureView onClickTryAgain={this.getTrendingNowApiData} />
          </div>
        )
      default:
        return null
    }
  }

  renderOrginalsView = () => {
    const {orginalsApiStatus} = this.state

    switch (orginalsApiStatus) {
      case apiConstraints.loading:
        return (
          <div className="loading-container">
            <LoaderView />
          </div>
        )
      case apiConstraints.success:
        return (
          <div className="movies-container">
            {this.renderOrginalsContainer()}
          </div>
        )
      case apiConstraints.failure:
        return (
          <div className="loading-container">
            <FailureView onClickTryAgain={this.getOrginalsApiData} />
          </div>
        )
      default:
        return null
    }
  }

  renderTopRatedView = () => {
    const {topRatedApiStatus} = this.state

    switch (topRatedApiStatus) {
      case apiConstraints.loading:
        return (
          <div className="loading-container">
            <LoaderView />
          </div>
        )
      case apiConstraints.success:
        return (
          <div className="movies-container">
            {this.renderTopRatedContainer()}
          </div>
        )
      case apiConstraints.failure:
        return (
          <div className="loading-container">
            <FailureView onClickTryAgain={this.getTopRatedApiData} />
          </div>
        )
      default:
        return null
    }
  }

  render() {
    return (
      <div className="home-bg-container">
        {this.renderRandomMovieView()}
        <h1 className="movies-heading">Trending Now</h1>
        {this.renderTrendingView()}
        <h1 className="movies-heading">Originals</h1>
        {this.renderOrginalsView()}
        <h1 className="movies-heading">Top Rated</h1>
        {this.renderTopRatedView()}
        <Footer />
      </div>
    )
  }
}

export default Home
