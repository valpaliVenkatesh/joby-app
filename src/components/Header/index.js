import './index.css'
import {Link, withRouter} from 'react-router-dom'

import Cookies from 'js-cookie'

const Header = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-background" id="home-place">
      <Link to="/">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          className="login-website-logo-desktop-image"
          alt="website logo"
        />
      </Link>
      <ul className="nav-content-list">
        <Link to="/" className="nav-link">
          <li className="nav-content-list-item">Home</li>
        </Link>
        <Link to="/Jobs" className="nav-link">
          <li className="nav-content-list-item">Jobs</li>
        </Link>
      </ul>

      <button type="button" className="login-button" onClick={onClickLogout}>
        Logout
      </button>
    </nav>
  )
}
export default withRouter(Header)
