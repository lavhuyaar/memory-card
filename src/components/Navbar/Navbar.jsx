import PropTypes from "prop-types"

function Navbar({score, bestScore}) {
  return (
    <nav>
      <h1 className="logo">PokeGo</h1>
      <div className="scores">
      <p className="current-score">Current score: <b>{score}</b></p>
      <p className="best-score">Best score: <b>{bestScore}</b></p>
      </div>
      

    </nav>
  )
}

export default Navbar


Navbar.propTypes = {
  score: PropTypes.number.isRequired,
  bestScore: PropTypes.number.isRequired,
}