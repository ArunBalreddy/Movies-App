import {Component} from 'react'
import Cookies from 'js-cookie'

import Header from '../Header'
import MovieCard from '../MovieCard'
import FailureView from '../FailureView'
import LoaderView from '../LoaderView'

import './index.css'
import Footer from '../Footer'

const apiConstraints = {
  loading: 'LOADING',
  success: 'SUCCESS',
  failure: 'FAILURE',
  empty: 'EMPTY',
}

class Search extends Component {
  state = {searchInput: '', data: [], apiStatus: 'LOADING', searchText: ''}

  componentDidMount() {
    this.getSearchInputApiData()
  }

  getFormattedData = movie => ({
    id: movie.id,
    backdropPath: movie.backdrop_path,
    posterPath: movie.poster_path,
    title: movie.title,
  })

  getSearchInputApiData = async () => {
    this.setState({apiStatus: apiConstraints.loading})

    const {searchInput} = this.state

    const apiUrl = `https://apis.ccbp.in/movies-app/movies-search?search=${searchInput}`

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
      if (updatedData.length === 0) {
        this.setState({apiStatus: apiConstraints.empty})
      } else {
        this.setState({apiStatus: apiConstraints.success})
      }
      this.setState({data: updatedData})
    } else {
      this.setState({apiStatus: apiConstraints.failure})
    }
  }

  onChangeSearchInput = event => {
    this.setState({searchInput: event.target.value})
  }

  onClickSearchButton = () => {
    const {searchInput} = this.state
    this.setState({searchText: searchInput})

    this.getSearchInputApiData()
  }

  renderLoaderView = () => <LoaderView className="loader-container" />

  EmptyListView = () => {
    const {searchText} = this.state

    return (
      <div className="emty-view">
        <img
          src="https://res.cloudinary.com/dpnwub4a7/image/upload/v1686584215/Group_7394_zktftm.png"
          alt="empty view"
          className="empty-list-img"
        />
        <h1 className="empty-heading">
          your search for {searchText} did not find any matches.
        </h1>
      </div>
    )
  }

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

  renderFailureView = () => (
    <div className="failure-view">
      <FailureView
        imgUrl="search"
        onClickTryAgain={this.getSearchInputApiData}
      />
    </div>
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
      case apiConstraints.empty:
        return this.EmptyListView()
      default:
        return null
    }
  }

  render() {
    const {searchInput} = this.state

    return (
      <div className="search-bg-container">
        <Header
          searchRoute="search"
          searchInput={searchInput}
          onChangeSearchInput={this.onChangeSearchInput}
          onClickSearchButton={this.onClickSearchButton}
        />
        {this.renderView()}
      </div>
    )
  }
}

export default Search
