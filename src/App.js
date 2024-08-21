import {Component} from 'react'
import {Redirect, Switch, Route} from 'react-router-dom'
import NotFound from './components/NotFound'
import LoginRoute from './components/LoginRoute'
import ProtectedRoute from './components/ProtectedRoute'
import HomeRoute from './components/HomeRoute'
import Cart from './components/Cart'
import CartSuccess from './components/CartSuccess'
import CartContext from './context/CartContext'
import './App.css'

class App extends Component {
  constructor(props) {
    super(props)
    this.state = {
      cartList: this.getCartFromLocalStorage() || [],
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const {cartList} = this.state
    if (prevState.cartList !== cartList) {
      this.updateLocalStorage()
    }
  }

  getCartFromLocalStorage = () => {
    const cartData = localStorage.getItem('cartData')
    return cartData ? JSON.parse(cartData) : []
  }

  updateLocalStorage = () => {
    const {cartList} = this.state
    localStorage.setItem('cartData', JSON.stringify(cartList))
  }

  addCartItem = product => {
    this.setState(prevState => ({
      cartList: [...prevState.cartList, {...product, quantity: 1}],
    }))
  }

  incrementCartItemQuantity = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.map(item =>
        item.id === productId ? {...item, quantity: item.quantity + 1} : item,
      ),
    }))
  }

  decrementCartItemQuantity = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList
        .map(item =>
          item.id === productId ? {...item, quantity: item.quantity - 1} : item,
        )
        .filter(item => item.quantity > 0),
    }))
  }

  removeCartItem = productId => {
    this.setState(prevState => ({
      cartList: prevState.cartList.filter(item => item.id !== productId),
    }))
  }

  render() {
    const {cartList} = this.state

    return (
      <CartContext.Provider
        value={{
          cartList,
          addCartItem: this.addCartItem,
          incrementCartItemQuantity: this.incrementCartItemQuantity,
          decrementCartItemQuantity: this.decrementCartItemQuantity,
          removeCartItem: this.removeCartItem,
        }}
      >
        <Switch>
          <Route exact path="/login" component={LoginRoute} />
          <ProtectedRoute exact path="/" component={HomeRoute} />
          <ProtectedRoute exact path="/cart" component={Cart} />
          <ProtectedRoute exact path="/cartsuccess" component={CartSuccess} />
          <Route path="/not-found" component={NotFound} />
          <Redirect to="/not-found" />
        </Switch>
      </CartContext.Provider>
    )
  }
}

export default App