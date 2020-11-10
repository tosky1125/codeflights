import React from 'react';
import './Modal.css';
import axios from 'axios';
import { connect } from 'react-redux';
import * as loginActions from '../modules/loginModal';
import * as signupActions from '../modules/signupModal';

axios.defaults.withCredentials = true;

class SignupModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: '',
      username: '',
      password: '',
      passwordConfirm: '',
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSignupSubmit = this.handleSignupSubmit.bind(this);
  }

  goToLogin = () => {
    const { changeSignup, changeLogin } = this.props;
    changeSignup();
    changeLogin();
  };

  handleChange = (key) => (e) => {
    this.setState({ [key]: e.target.value });
  };

  handlePasswordMatch() {
    const { password, passwordConfirm } = this.state;
    return password === passwordConfirm;
  }

  handleSignupSubmit(e) {
    const { changeSignup } = this.props;
    const {
      email, username, password, passwordConfirm,
    } = this.state;
    axios({
      method: 'post',
      url: 'https://codeflights.xyz/user/signup',
      data: {
        email,
        username,
        password,
        passwordConfirm,
      },
      withCredentials: true,
      crendtials: 'include',
    })
      .then(() => {
        changeSignup();
      })
      .catch();
    e.preventDefault();
  }

  renderPasswordCheckMessage() {
    const { passwordConfirm } = this.state;

    if (passwordConfirm) {
      if (!this.handlePasswordMatch()) {
        return (
          <div className='invaild-message'>패스워드가 일치하지 않습니다.</div>
        );
      }
    }
    return false;
  }

  render() {
    const { signupModal, changeSignup } = this.props;
    const {
      email, username, password, passwordConfirm,
    } = this.state;
    if (signupModal) {
      return (
        <div>
          <div className='modal' />
          <div className='modalContents'>
            <form className='modalForm' onSubmit={this.handleSignupSubmit}>
              <div className='login'>
                {' '}
                <h3 onClick={changeSignup}>✖</h3>
                <h2>회원가입</h2>
              </div>
              <input
                type='email'
                name='email'
                placeholder='Email'
                value={email}
                onChange={this.handleChange('email')}
              />
              <input
                type='username'
                name='username'
                placeholder='Username'
                value={username}
                onChange={this.handleChange('username')}
              />
              <input
                type='password'
                minLength='8'
                name='password'
                placeholder='Password'
                value={password}
                onChange={this.handleChange('password')}
              />
              <input
                type='password'
                minLength='8'
                name='passwordConfirm'
                placeholder='PasswordConfirm'
                value={passwordConfirm}
                onChange={this.handleChange('passwordConfirm')}
              />
              {this.renderPasswordCheckMessage()}
              <button type='submit'>submit</button>
              <div>
                <p onClick={this.goToLogin}>이미 아이디가 있으신가요?</p>
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
  }),
  (dispatch) => ({
    changeLogin: () => dispatch(loginActions.changeLogin()),
    changeSignup: () => dispatch(signupActions.changeSignup()),
  }),
)(SignupModal);
