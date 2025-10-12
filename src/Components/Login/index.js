import './index.css'
import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

class Login extends Component {
  state = {
    inputName: '',
    inputPassword: '',
    isErrorOccurred: false,
    errorName: '',
    isNameMissed: false,
    isPasswordMissed: false,
  }

  changeInputName = event => {
    this.setState({inputName: event.target.value, isNameMissed: false})
  }

  changeInputPassword = event => {
    this.setState({inputPassword: event.target.value, isPasswordMissed: false})
  }

  clickSubmitButton = async event => {
    event.preventDefault()
    const {inputName, inputPassword} = this.state

    if (inputName === '') {
      this.setState({isNameMissed: true})
    } else if (inputPassword === '') {
      this.setState({isPasswordMissed: true})
    } else if (inputName !== '' && inputPassword !== '') {
      const details = {
        username: inputName,
        password: inputPassword,
      }
      const url = 'https://apis.ccbp.in/login'
      const options = {
        method: 'POST',
        body: JSON.stringify(details),
      }
      const response = await fetch(url, options)
      const data = await response.json()
      console.log(data)
      if (response.ok === true) {
        this.renderSuccess(data.jwt_token)
      } else {
        this.renderFailure(data.error_msg)
      }
    }
  }

  renderSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {expires: 7})
    history.replace('/')
  }

  renderFailure = message => {
    this.setState({isErrorOccurred: true, errorName: message})
  }

  render() {
    const {
      isErrorOccurred,
      errorName,
      isNameMissed,
      isPasswordMissed,
    } = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login_container">
        <div className="input_cont">
          <img
            className="logoimg"
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
          />

          <form className="form_cont" onSubmit={this.clickSubmitButton}>
            <label className="label_style" htmlFor="input_name">
              USERNAME
            </label>
            <input
              onChange={this.changeInputName}
              className="input_box"
              type="text"
              id="input_name"
              placeholder="Username"
            />
            {isNameMissed ? <p className="error_para">*Enter Your Name</p> : ''}

            <label className="label_style" htmlFor="input_password">
              PASSWORD
            </label>
            <input
              onChange={this.changeInputPassword}
              className="input_box"
              type="password"
              id="input_password"
              placeholder="Password"
            />
            {isPasswordMissed ? (
              <p className="error_para">*Enter Your Password</p>
            ) : (
              ''
            )}

            <button type="submit" className="login_button">
              Login
            </button>
            {isErrorOccurred ? <p className="error_para">*{errorName}</p> : ''}
          </form>
        </div>
      </div>
    )
  }
}
export default Login
