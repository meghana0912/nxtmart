import {Component} from 'react'
import {Link} from 'react-router-dom'
import Cookies from 'js-cookie'
import {LuShoppingCart} from 'react-icons/lu'
import {FiHome} from 'react-icons/fi'
import {TbLogout2} from 'react-icons/tb'
import Header from '../Header'
import CartContext from '../../context/CartContext'
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

class Cart extends Component {
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

  // Function to parse price and remove any non-numeric symbols
  parsePrice = price => {
    // Remove non-numeric characters (except dot for decimal places)
    const numericPrice = price.replace(/[^0-9.]/g, '')
    return parseFloat(numericPrice) || 0
  }

  render() {
    const {activeItem} = this.state
    return (
      <CartContext.Consumer>
        {value => {
          const {
            cartList,
            incrementCartItemQuantity,
            decrementCartItemQuantity,
            addCartItem,
          } = value

          // Calculate total amount
          const totalAmount = cartList.reduce((acc, product) => {
            const price = this.parsePrice(product.price)
            const quantity = parseInt(product.quantity, 10) || 0
            return acc + price * quantity
          }, 0)

          return (
            <div className="cart-container">
              <Header />
              {cartList.length === 0 ? (
                <div className="empty">
                  <img
                    className="empty-img"
                    src="https://res.cloudinary.com/dayzpflw1/image/upload/v1722317842/Group_8_ghkrax.png"
                    alt="empty cart"
                  />
                  <h1 className="description">Your cart is empty</h1>
                </div>
              ) : (
                <div className="items-container">
                  <p className="checkbox">Checkout</p>
                  <p className="items-count">items ({cartList.length})</p>
                  <ul className="cart-items-container">
                    {cartList.map(product => {
                      const cartItem = cartList.find(
                        item => item.id === product.id,
                      )
                      const quantity = cartItem ? cartItem.quantity : 0
                      const price = this.parsePrice(product.price)

                      return (
                        <>
                          <li
                            data-testid="cartItem"
                            className="cart-item-container"
                            key={product.id}
                          >
                            <div className="product-details">
                              <img
                                className="cart-image"
                                src={`${product.image}`}
                                alt="product"
                              />
                              <div className="jj">
                                <p className="product-name">{product.name}</p>
                                <p className="product-weight">
                                  {product.weight}
                                </p>
                                <p className="product-price">
                                  $
                                  {(
                                    price * (parseInt(quantity, 10) || 0)
                                  ).toFixed(2)}
                                </p>
                              </div>
                            </div>

                            <div className="quantity-controls">
                              <button
                                data-testid="decrement-quantity"
                                className="quantity-btn"
                                type="button"
                                onClick={() =>
                                  decrementCartItemQuantity(product.id)
                                }
                              >
                                -
                              </button>
                              <p
                                data-testid="item-quantity"
                                className="quantity"
                              >
                                {quantity}
                              </p>
                              <button
                                data-testid="increment-quantity"
                                type="button"
                                className="quantity-btn"
                                onClick={() =>
                                  incrementCartItemQuantity(product.id)
                                }
                              >
                                +
                              </button>
                            </div>
                          </li>
                          <hr className="hr" />
                        </>
                      )
                    })}
                  </ul>
                  {cartList.length > 0 ? (
                    <div className="checkou-container">
                      <div className="price-container">
                        <h1
                          data-testid="total-price"
                          className="total-amount-count"
                        >
                          Total ({cartList.length} items):
                        </h1>
                        <p className="price">{totalAmount.toFixed(2)}</p>
                      </div>
                      <Link to="/cartsuccess">
                        <button className="checkout-btn" type="button">
                          Checkout
                        </button>
                      </Link>
                    </div>
                  ) : (
                    ''
                  )}
                </div>
              )}

              <>
                {cartList.length > 0 ? (
                  <div className="checkout-container">
                    <p className="total amount-count">
                      Total ({cartList.length} items) : ${' '}
                      {totalAmount.toFixed(2)}
                    </p>
                    <Link to="/cartsuccess">
                      <button className="checkout-btn" type="button">
                        Checkout
                      </button>
                    </Link>
                  </div>
                ) : (
                  ''
                )}
                <ul className="navs-container">
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
              </>
              <Queries />
            </div>
          )
        }}
      </CartContext.Consumer>
    )
  }
}

export default Cart
