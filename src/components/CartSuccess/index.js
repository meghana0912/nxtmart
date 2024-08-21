import {Component} from 'react'
import Cookies from 'js-cookie'
import {Link} from 'react-router-dom'
import {LuShoppingCart} from 'react-icons/lu'
import {FiHome} from 'react-icons/fi'
import {TbLogout2} from 'react-icons/tb'
import Header from '../Header'
import Queries from '../Queries'
import './index.css'

const navigationIcons = [
  {
    icon: <FiHome />,
    id: 1,
  },
  {
    icon: <LuShoppingCart />,
    id: 2,
  },
]

class CartSuccess extends Component {
  state = {activeItem: 2}

  onClickBtn = id => {
    const {history} = this.props
    this.setState({activeItem: id})
    if (id === 1) {
      history.push('/')
    }
  }

  logoutBtn = () => {
    const {history} = this.props
    Cookies.remove('jwt_token')
    history.replace('/login')
  }

  render() {
    const {activeItem} = this.state
    return (
      <>
        <Header />
        <div className="success-cart">
          <div className="success-img-container">
            <img
              className="success"
              src="https://res.cloudinary.com/dayzpflw1/image/upload/v1722315794/Vector_3_hcfjba.svg"
              alt="success"
            />
          </div>

          <h1 className="heading">Payment Successful</h1>
          <p className="description">
            Thank you for ordering. Your payment is successfully completed.
          </p>
          <Link to="/">
            <button className="return-to-homepage-btn" type="button">
              Return to Homepage
            </button>
          </Link>

          <ul className="c-container">
            {navigationIcons.map(eachIcon => (
              <li className="icon" key={eachIcon.id}>
                <button
                  onClick={() => this.onClickBtn(eachIcon.id)}
                  className={
                    activeItem === eachIcon.id ? 'activeIcon' : 'iconBtn'
                  }
                  type="button"
                >
                  {eachIcon.icon}
                </button>
              </li>
            ))}
            <li className="icon">
              <button
                type="button"
                className="iconBtn"
                onClick={this.logoutBtn}
              >
                <TbLogout2 />
                <p className="hide">.</p>
              </button>
            </li>
          </ul>
          <Queries />
        </div>
      </>
    )
  }
}

export default CartSuccess
