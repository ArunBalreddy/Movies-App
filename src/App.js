import {Component} from 'react'

import {Switch, Route, Redirect} from 'react-router-dom'

import Login from './Components/Login'
import Home from './Components/Home'
import Popular from './Components/Popular'

import './App.css'

import MoviesContext from './Context/MoviesContext'
import MovieItemDetails from './Components/MovieItemDetails'
import Search from './Components/Search'
import Account from './Components/Account'
import ProtectedRoute from './Components/ProtectedRoute'
import NotFound from './Components/NotFound'

class App extends Component {
  state = {userDetails: '', activeTab: 'home'}

  setUserDetails = data => {
    this.setState({userDetails: data})
  }

  setActiveTab = id => {
    this.setState({activeTab: id})
  }

  render() {
    const {userDetails, activeTab} = this.state

    return (
      <MoviesContext.Provider
        value={{
          userDetails,
          setUserDetails: this.setUserDetails,
          activeTab,
          setActiveTab: this.setActiveTab,
        }}
      >
        <Switch>
          <Route exact path="/login" component={Login} />
          <ProtectedRoute exact path="/" component={Home} />
          <ProtectedRoute exact path="/popular" component={Popular} />
          <ProtectedRoute
            exact
            path="/movies/:movieId"
            component={MovieItemDetails}
          />
          <ProtectedRoute exact path="/search" component={Search} />
          <ProtectedRoute exact path="/account" component={Account} />
          <ProtectedRoute exact path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </MoviesContext.Provider>
    )
  }
}

export default App
