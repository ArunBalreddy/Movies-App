import React from 'react'

const MoviesContext = React.createContext({
  activeTab: '',
  userDetails: {username: '', password: ''},
  setUserDetails: () => {},
})

export default MoviesContext
