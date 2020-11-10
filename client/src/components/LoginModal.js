import GoogleLogin from 'react-google-login';
import React from 'react';
import './Modal.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as loginActions from '../modules/loginModal';
import * as signupActions from '../modules/signupModal';
import * as signinActions from '../modules/isLogin';
import * as userActions from '../modules/user';

axios.defaults.withCredentials = true;

//로그인 모달
class LoginModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleLoginSubmit = this.handleLoginSubmit.bind(this);
  }

  handleChange = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  goToSignUp = () => {
    const { changeLogin, changeSignup } = this.props;
    changeLogin();
    changeSignup();
  };

  responseGoogle = (res) => {
    const { changeLogin, userinfo, loginStatus } = this.props;
    changeLogin();
    const data = { tokenId: res.tokenId };

    axios.post('https://codeflights.xyz/auth/google', data).then((result) => {
      localStorage.userinfo = JSON.stringify(result.data);
      userinfo(result.data);
      loginStatus();
    });
  };

  handleLoginSubmit(e) {
    const { email, password } = this.state;
    const { userinfo, loginStatus, changeLogin } = this.props;
    const data = { email, password };
    axios
      .post('https://codeflights.xyz/user/signin', data, {
        withCredentials: true,
      })
      .then((res) => {
        userinfo(res.data);
        localStorage.userinfo = JSON.stringify(res.data);
        loginStatus();
        changeLogin();
      })
      .catch();
    e.preventDefault();
  }

  render() {
    const { loginModal, changeLogin } = this.props;
    const { email, password } = this.state;
    if (loginModal) {
      return (
        <div>
          <div className='modal' />
          <div className='modalContents'>
            <form className='modalForm' onSubmit={this.handleLoginSubmit}>
              <div className='login'>
                <h3 onClick={changeLogin}>✖</h3>
                <h2>로그인</h2>
              </div>
              <GoogleLogin
                clientId='956886343865-f8080heu2d93mukf82e027btrg0mgcl8.apps.googleusercontent.com'
                buttonText='Login'
                onSuccess={this.responseGoogle}
                onFailure={this.responseGoogle}
                cookiePolicy='single_host_origin'
              />
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={email}
                onChange={this.handleChange('email')}
              />
              <input
                type='password'
                minLength='8'
                name='password'
                placeholder='Password'
                value={password}
                onChange={this.handleChange('password')}
              />
              <button type='submit'>Login</button>
              <div>
                <p onClick={this.goToSignUp}>아직 아이디가 없으신가요?</p>
              </div>
            </form>
          </div>
        </div>
      );
    } else {
      return <div />;
    }
  }
}

export default connect(
  (state) => ({
    loginModal: state.loginModal.loginModal,
    signupModal: state.signupModal.signupModal,
    isLogin: state.isLogin.login,
    userinfo: state.user.userinfo,
  }),
  (dispatch) => ({
    changeLogin: () => dispatch(loginActions.changeLogin()),
    changeSignup: () => dispatch(signupActions.changeSignup()),
    loginStatus: () => dispatch(signinActions.loginStatus()),
    userinfo: (data) => dispatch(userActions.userinfo(data)),
  })
)(LoginModal);
