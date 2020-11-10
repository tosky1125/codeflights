import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import Navbar from './components/Navbar';
import Main from './components/Main';
import Mypage from './components/Mypage';
import Posting from './components/Editor';
import './App.css';
import Result from './components/Result';
import Schedule from './components/Schedule';
import View from './components/View';
import LoginModal from './components/LoginModal';
import SignupModal from './components/SignupModal';
import * as signinActions from './modules/isLogin';
import * as userActions from './modules/user';
import * as sidebarActions from './modules/navbar';

axios.defaults.withCredentials = true;
class App extends React.Component {
  componentDidMount() {
    const { userinfo, loginStatus } = this.props;
    axios({
      method: 'GET',
      url: 'https://codeflights.xyz/user/info',
      withCredentials: true,
      crendtials: 'include',
    })
      .then((res) => {
        userinfo(res.data);
        localStorage.userinfo = JSON.stringify(res.data);
        loginStatus();
      })
      .catch();
  }

  render() {
    const info = this.state;
    const { sidebar } = this.props;
    return (
      <>
        <Router>
          <div className='App-component'>
            <video
              className='video'
              autoPlay
              playsInline
              loop='loop'
              muted
              width='1280'
              height='720'
            >
              <source src='/Videos/background.mp4' type='video/mp4' />
            </video>
            <div className={info && 'test'}>
              <Navbar />
              <SignupModal />
              <LoginModal />
              <div className={sidebar && 'App-contents'}>
                <Switch>
                  <Route path='/' exact component={Main} />
                  <Route path='/Mypage' component={Mypage} />
                  <Route path='/Posting' component={Posting} />
                  <Route path='/result/:city/:article' component={View} />
                  <Route path='/result/:city' component={Schedule} />
                  <Route path='/search/result' component={Result} />
                </Switch>
              </div>
            </div>
          </div>
        </Router>
      </>
    );
  }
}

export default connect(
  (state) => ({
    isLogin: state.isLogin.isLogin,
    info: state.user.userinfo,
    sidebar: state.navbar.sidebar,
  }),
  (dispatch) => ({
    loginStatus: () => dispatch(signinActions.loginStatus()),
    userinfo: (data) => dispatch(userActions.userinfo(data)),
    changeSidebar: () => dispatch(sidebarActions.changeSidebar()),
  }),
)(App);
