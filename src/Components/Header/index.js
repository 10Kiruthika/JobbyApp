import './index.css'
import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {IoMdHome} from 'react-icons/io'
import {MdLocalPostOffice} from 'react-icons/md'
import {FiLogOut} from 'react-icons/fi'

class Header extends Component {
  clickLogoutButton = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    return (
      <div className="head_cont">
        <Link to="/">
          <img
            className="logo_header"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />
        </Link>

        <ul className="nav_links">
          <li className="heading">
            <Link to="/" className="link_style">
              Home
            </Link>
          </li>
          <li className="heading">
            <Link to="/jobs" className="link_style">
              Jobs
            </Link>
          </li>
        </ul>

        <button
          className="logout_button"
          onClick={this.clickLogoutButton}
          type="button"
        >
          Logout
        </button>

        <div className="header_mobile_cont">
          <ul className="mobile_cont_unorder">
            <Link to="/" className="link_style">
              <li>
                <IoMdHome size={26} />
              </li>
            </Link>

            <Link to="/jobs" className="link_style">
              <li>
                <MdLocalPostOffice size={26} />
              </li>
            </Link>

            <li>
              <button
                className="home_logout"
                onClick={this.clickLogoutButton}
                type="button"
              >
                <FiLogOut size={26} />
              </button>
            </li>
          </ul>
        </div>
      </div>
    )
  }
}
export default withRouter(Header)
