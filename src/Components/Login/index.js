import {Component} from 'react'
import {Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'

import './index.css'
import MoviesContext from '../../Context/MoviesContext'

class Login extends Component {
  state = {username: '', password: '', showErrMsg: false, errorMsg: ''}

  onSubmit = async () => {
    const {username, password} = this.state

    const userDetails = {username, password}

    const apiUrl = 'https://apis.ccbp.in/login'

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(apiUrl, options)
    const data = await response.json()

    if (response.ok === true) {
      const jwtToken = data.jwt_token
      Cookies.set('jwt_token', jwtToken, {expires: 30})
      const {history} = this.props
      history.replace('/')
    } else {
      this.setState({showErrMsg: true, errorMsg: data.error_msg})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {username, password, showErrMsg, errorMsg} = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <MoviesContext.Consumer>
        {value => {
          const {setUserDetails} = value

          const userDetails = {username, password}

          const onSubmitUserDetails = event => {
            event.preventDefault()
            this.onSubmit()
            setUserDetails(userDetails)
          }

          return (
            <div className="login-bg-container">
              <div className="logo-container">
                <img
                  src="https://res.cloudinary.com/dpnwub4a7/image/upload/v1685708402/Group_7399_e15e6r.png"
                  alt="login website logo"
                  className="login-website-logo"
                />
              </div>
              <div className="login-container">
                <form className="form-container" onSubmit={onSubmitUserDetails}>
                  <h1 className="login-heading">Login</h1>
                  <div className="input-container">
                    <label htmlFor="username" className="label-el">
                      USERNAME
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="input-el"
                      onChange={this.onChangeUsername}
                      value={username}
                    />
                  </div>
                  <div className="input-container">
                    <label htmlFor="password" className="label-el">
                      PASSWORD
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="input-el"
                      onChange={this.onChangePassword}
                      value={password}
                    />
                  </div>
                  <div className="error-container">
                    {showErrMsg && <p className="error-msg">{errorMsg}</p>}
                  </div>
                  <button className="login-button" type="submit">
                    Login
                  </button>

                  <div className="information-container">
                    <p className="information"> Use:</p>
                    <p className="information"> Username: rahul</p>
                    <p className="information">Password: rahul@2021</p>
                  </div>
                </form>
              </div>
            </div>
          )
        }}
      </MoviesContext.Consumer>
    )
  }
}

export default Login
