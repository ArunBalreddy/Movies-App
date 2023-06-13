import {Component} from 'react'
import {Link} from 'react-router-dom'
import './index.css'
import {HiOutlineSearch} from 'react-icons/hi'
import {AiFillCloseCircle} from 'react-icons/ai'
import {MdMenuOpen} from 'react-icons/md'
import MoviesContext from '../../Context/MoviesContext'

class Header extends Component {
  state = {showMenu: false}

  toggleMenu = () => {
    this.setState(prevState => ({showMenu: !prevState.showMenu}))
  }

  render() {
    const {showMenu} = this.state

    return (
      <MoviesContext.Consumer>
        {value => {
          const {activeTab, setActiveTab} = value

          const home = activeTab === 'home' ? 'active-tab' : ''
          const popular = activeTab === 'popular' ? 'active-tab' : ''
          const account = activeTab === 'account' ? 'active-tab' : ''

          const onChangeSearchInputHeader = event => {
            const {onChangeSearchInput} = this.props
            onChangeSearchInput(event)
          }

          const {
            searchInput,
            onClickSearchButton,
            searchRoute,
            bgColor,
          } = this.props

          const opacity = bgColor === undefined ? '0.7' : ''

          const searchEl =
            searchRoute === 'search' ? (
              <div className="search-input-container">
                <input
                  type="text"
                  className="search-input"
                  onChange={onChangeSearchInputHeader}
                  value={searchInput}
                />
                <button
                  data-testid="searchButton"
                  className="search-icon-button"
                  type="button"
                  onClick={() => {
                    onClickSearchButton()
                  }}
                >
                  <HiOutlineSearch className="search-icon2" />
                </button>
              </div>
            ) : (
              <Link to="/search">
                <button
                  data-testid="searchButton"
                  className="search-icon-button"
                  type="button"
                  onClick={() => setActiveTab('search')}
                >
                  <HiOutlineSearch className="search-icon" />
                </button>
              </Link>
            )

          return (
            <nav className="navbar" style={{opacity}}>
              <div>
                <div className="website-logo-container">
                  <img
                    src="https://res.cloudinary.com/dpnwub4a7/image/upload/v1685708402/Group_7399_e15e6r.png"
                    alt="website logo"
                    className="website-logo"
                  />
                  <Link
                    to="/"
                    className="home-navigation"
                    onClick={() => setActiveTab('home')}
                  >
                    <p className={home}>Home</p>
                  </Link>
                  <Link
                    to="/popular"
                    className="popular-navigation"
                    onClick={() => setActiveTab('popular')}
                  >
                    <p className={popular}>Popular</p>
                  </Link>
                </div>
                <div className="profile-container">
                  {searchEl}

                  <Link
                    to="/account"
                    className="profile-img"
                    onClick={() => setActiveTab('account')}
                  >
                    <img
                      src="https://res.cloudinary.com/dpnwub4a7/image/upload/v1685776617/Avatar_ujpdgq.png"
                      alt="profile"
                      className="profile"
                    />
                  </Link>
                  <MdMenuOpen
                    size={25}
                    className="menu-icon"
                    onClick={this.toggleMenu}
                  />
                </div>
              </div>
              {showMenu && (
                <ul className="menu-list-container">
                  <Link
                    to="/"
                    className="link-item"
                    onClick={() => setActiveTab('home')}
                  >
                    <li className={home}>Home</li>
                  </Link>
                  <Link
                    to="/popular"
                    className="link-item"
                    onClick={() => setActiveTab('popular')}
                  >
                    <li className={popular}>Popular</li>
                  </Link>
                  <Link
                    to="/account"
                    className="link-item"
                    onClick={() => setActiveTab('account')}
                  >
                    <li className={account}>Account</li>
                  </Link>
                  <li>
                    <AiFillCloseCircle onClick={this.toggleMenu} />
                  </li>
                </ul>
              )}
            </nav>
          )
        }}
      </MoviesContext.Consumer>
    )
  }
}
export default Header
