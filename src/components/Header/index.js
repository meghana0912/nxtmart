import {Component} from 'react'
import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import {TbLogout2} from 'react-icons/tb'
import './index.css'

class Header extends Component {
  state = {active: 'home'}

  componentDidMount() {
    this.updateActiveState()
  }

  componentDidUpdate(prevProps) {
    const {location} = this.props
    if (location.pathname !== prevProps.location.pathname) {
      this.updateActiveState()
    }
  }

  updateActiveState = () => {
    const {location} = this.props
    const activeRoute = location.pathname === '/cart' ? 'cart' : 'home'
    this.setState({active: activeRoute})
  }

  logoutBtn = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {active} = this.state
    return (
      <div className="c">
        <div className="container">
          <div className="header-container">
            <Link to="/">
              <img
                src="https://res.cloudinary.com/dayzpflw1/image/upload/v1721647113/Logo_2_pn1im3.png"
                alt="website logo"
                className="logo"
              />
            </Link>
            <div className="nav-container">
              <Link className="link" to="/">
                <button
                  type="button"
                  className={active === 'home' ? 'active' : ''}
                >
                  Home
                </button>
              </Link>
              <Link className="link" to="/cart">
                <button
                  type="button"
                  className={active === 'cart' ? 'active' : ''}
                >
                  Cart
                </button>
              </Link>
              <button
                className="logout-btn"
                onClick={this.logoutBtn}
                type="button"
              >
                <TbLogout2 /> <p className="logout">Logout</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default withRouter(Header)