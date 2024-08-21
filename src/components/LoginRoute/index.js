import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import {CgProfile} from 'react-icons/cg'
import './index.css'

class LoginRoute extends Component {
  state = {
    username: '',
    password: '',
    errorMsg: '',
    showErrorMsg: false,
    isChecked: false,
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      const {history} = this.props
      Cookies.set('jwt_token', data.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({errorMsg: data.error_msg, showErrorMsg: true})
    }
  }

  onChangeCheckBox = () => {
    this.setState(prevState => ({
      isChecked: !prevState.isChecked,
    }))
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  render() {
    const {isChecked, username, password, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-details-container">
          <img
            className="website-logo"
            src="https://res.cloudinary.com/dayzpflw1/image/upload/v1721647113/Logo_2_pn1im3.png"
            alt="login website logo"
          />
          <form onSubmit={this.onSubmitForm}>
            <label className="label" htmlFor="username">
              USERNAME
            </label>
            <div className="input-container">
              <CgProfile className="icon" />
              <input
                className="input"
                onChange={this.onChangeUsername}
                id="username"
                type="text"
                value={username}
              />
            </div>
            <label className="label" htmlFor="password">
              PASSWORD
            </label>
            <div className="input-container">
              <img
                src="https://res.cloudinary.com/dayzpflw1/image/upload/v1721702934/Group_14_cyrtje.svg"
                className="icon"
                alt="lock"
              />
              <input
                className="input"
                onChange={this.onChangePassword}
                id="password"
                value={password}
                type={isChecked ? 'text' : 'password'}
              />
            </div>
            <div className="show-password-container">
              <input
                className="check-box"
                onChange={this.onChangeCheckBox}
                type="checkBox"
                id="checkbox"
              />
              <label htmlFor="checkbox" className="check-box-label">
                Show Password
              </label>
            </div>
            <button className="login-button" type="submit">
              Login
            </button>
            {showErrorMsg ? <p className="error-msg">{errorMsg}</p> : ''}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
