import {Component} from 'react'
import Cookies from 'js-cookie'

import {format} from 'date-fns'

import Header from '../Header'

import './index.css'
import MovieCard from '../MovieCard'
import Footer from '../Footer'
import FailureView from '../FailureView'
import LoaderView from '../LoaderView'

const apiConstraints = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
}

class MovieItemDetails extends Component {
  state = {
    movieDetails: '',
    similarMovies: [],
    apiStatus: apiConstraints.loading,
  }

  componentDidMount() {
    this.getApiMovieData()
  }

  setDataInState = movie => {
    const updatedData = {
      adult: movie.adult,
      backdropPath: movie.backdrop_path,
      budget: movie.budget,
      genres: movie.genres,
      id: movie.id,
      overview: movie.overview,
      posterPath: movie.poster_path,
      releaseDate: movie.release_date,
      runtime: movie.runtime,
      similarMovies: movie.similar_movies,
      title: movie.title,
      voteAverage: movie.vote_average,
      voteCount: movie.vote_count,
      spokenLanguages: movie.spoken_languages.map(language => ({
        id: language.id,
        englishName: language.english_name,
      })),
    }

    const similarData = updatedData.similarMovies.map(similarMovie => ({
      backdropPath: similarMovie.backdrop_path,
      id: similarMovie.id,
      posterPath: similarMovie.poster_path,
      title: similarMovie.title,
    }))

    this.setState({
      movieDetails: updatedData,
      similarMovies: similarData,
      apiStatus: apiConstraints.success,
    })
  }

  getApiMovieData = async () => {
    this.setState({apiStatus: apiConstraints.loading})

    const {match} = this.props
    const {params} = match
    const {movieId} = params

    const apiUrl = `https://apis.ccbp.in/movies-app/movies/${movieId}`

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
      this.setDataInState(data.movie_details)
    } else {
      this.setState({apiStatus: apiConstraints.failure})
    }
  }

  renderMovie = () => {
    const {movieDetails} = this.state
    const {title, overview, runtime, releaseDate, adult} = movieDetails
    const bgUrl = movieDetails.backdropPath
    const hours = Math.floor(runtime / 60)
    const minutes = runtime % 60
    const runtimeInHoursAndMinutes = `${hours}h ${minutes}m`
    const certification = adult ? 'A' : 'U/A'
    const releaseYear = format(new Date(releaseDate), 'yyyy')

    return (
      <div
        className="movie-container"
        style={{
          backgroundImage: `url(${bgUrl})`,
          backgroundSize: 'cover',
        }}
      >
        <Header className="header" />
        <div className="movie-details-container">
          <h1 className="movie-title">{title}</h1>
          <div className="runtime-container">
            <p className="runtime">{runtimeInHoursAndMinutes}</p>
            <p className="certification">{certification}</p>
            <p className="release-year">{releaseYear}</p>
          </div>
          <p className="movie-overview">{overview}</p>
          <button type="button" className="play-button">
            Play
          </button>
        </div>
      </div>
    )
  }

  renderAboutMovieContainer = () => {
    const {movieDetails} = this.state
    const {
      genres,
      spokenLanguages,
      voteAverage,
      voteCount,
      budget,
      releaseDate,
    } = movieDetails

    const releaseDateFormat = format(new Date(releaseDate), 'do MMMM yyyy')

    return (
      <div className="about-movie-container">
        <div className="details-container">
          <h1 className="side-heading">Genres</h1>
          {genres.map(genre => (
            <p key={genre.id} className="side-heading-answer">
              {genre.name}
            </p>
          ))}
        </div>

        <div className="details-container">
          <h1 className="side-heading">Audio Available</h1>
          {spokenLanguages.map(language => (
            <p className="side-heading-answer" key={language.id}>
              {language.englishName}
            </p>
          ))}
        </div>

        <div className="details-container">
          <h1 className="side-heading">Rating Count</h1>
          <p className="side-heading-answer">{voteCount}</p>
          <h1 className="side-heading">Rating Average</h1>
          <p className="side-heading-answer">{voteAverage}</p>
        </div>

        <div className="details-container">
          <h1 className="side-heading">Budget</h1>
          <p className="side-heading-answer">{budget}</p>
          <h1 className="side-heading">Release Date</h1>
          <p className="side-heading-answer">{releaseDateFormat}</p>
        </div>
      </div>
    )
  }

  renderSimilarMoviesView = () => {
    const {similarMovies} = this.state

    return (
      <div className="similar-movies-container">
        <h1 className="similar-heading">More like this</h1>
        <ul className="similar-list-container">
          {similarMovies.map(eachMovie => (
            <MovieCard key={eachMovie.id} movieDetails={eachMovie} />
          ))}
        </ul>
      </div>
    )
  }

  renderFailureView = () => (
    <div className="failure-view">
      <FailureView onClickTryAgain={this.getApiMovieData} />
    </div>
  )

  renderLoaderView = () => <LoaderView className="loader-container" />

  renderSuccessView = () => (
    <>
      {this.renderMovie()}
      {this.renderAboutMovieContainer()}
      {this.renderSimilarMoviesView()}
      <Footer />
    </>
  )

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
    return <div className="movie-details-bg-container">{this.renderView()}</div>
  }
}

export default MovieItemDetails
