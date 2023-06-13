import './index.css'

import {Link} from 'react-router-dom'

const MovieCard = props => {
  const {movieDetails} = props

  const {posterPath, title, id} = movieDetails

  return (
    <li className="movie-card">
      <Link to={`/movies/${id}`}>
        <img src={posterPath} alt={title} className="movie-poster" />
      </Link>
    </li>
  )
}

export default MovieCard
