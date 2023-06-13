import {Component} from 'react'
import Cookies from 'js-cookie'

import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import MoviesContext from '../../Context/MoviesContext'

class Account extends Component {
  onClickLogoutButton = () => {
    Cookies.remove('jwt_token')

    const {history} = this.props
    history.replace('/login')
  }

  renderAccountView = () => (
    <MoviesContext.Consumer>
      {value => {
        const {userDetails} = value

        return (
          <div className="account-container">
            <h1 className="account-heading">Account</h1>
            <hr className="horizontal-line" />
            <div className="member-ship-container">
              <p className="member-ship">Member ship</p>
              <div>
                <p className="username">{userDetails.username}</p>
                <p className="password">Password ********</p>
              </div>
            </div>
            <hr className="horizontal-line" />
            <div className="plan-details-container">
              <p className="member-ship">Plan Details</p>

              <p className="username">Premium</p>
              <p className="quality">Ultra HD</p>
            </div>
            <hr className="horizontal-line" />
            <button
              className="logout-button"
              type="button"
              onClick={this.onClickLogoutButton}
            >
              Logout
            </button>
          </div>
        )
      }}
    </MoviesContext.Consumer>
  )

  render() {
    return (
      <div className="account-bg-container">
        <Header bgColor=" #131313" />
        {this.renderAccountView()}
        <Footer />
      </div>
    )
  }
}

export default Account
