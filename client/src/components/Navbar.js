import React from 'react';
import { Link } from 'react-router-dom';
import { IconContext } from 'react-icons';
import * as FaIcons from 'react-icons/fa';
import * as IoIcons from 'react-icons/io';
import * as FiIcons from 'react-icons/fi';
import { connect } from 'react-redux';
import axios from 'axios';
import SidebarUserData from './LoginSidelist';
import * as loginActions from '../modules/loginModal';
import * as signupActions from '../modules/signupModal';
import * as signinActions from '../modules/isLogin';
import * as sidebarActions from '../modules/navbar';
import logo from '../Images/logo.png';
import './Navbar.css';

function Navbar(props) {

  const { login } = props;
  const logOut = () => {
    props.loginStatus();
    axios.post('https://codeflights.xyz/user/logout');
  };

  const {
    username, changeSidebar, sidebar, changeLogin, changeSignup,
  } = props;

  if (login) {
    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar'>
            <Link to='/'>
              <img src={logo} className='logo focus' alt='logo' />
            </Link>
            <p className='welcome blink'>
              {`행복한 상상 중인 ${username.username}님`}
            </p>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={changeSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={changeSidebar}>
              <li className='navbar-toggle' />
              {SidebarUserData.map((item, index) => (
                <li key={index} className={item.className}>
                  <Link to={item.path}>
                    {item.icon}
                    <span>{item.title}</span>
                  </Link>
                </li>
              ))}
              <li onClick={logOut} className='nav-text'>
                <Link to='/'>
                  <FaIcons.FaSignOutAlt />
                  <span>LOGOUT</span>
                </Link>
              </li>
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  } else {
    return (
      <>
        <IconContext.Provider value={{ color: '#fff' }}>
          <div className='navbar'>
            <Link to='/'>
              <img src={logo} className='logo focus' alt='logo' />
            </Link>
            <Link to='#' className='menu-bars'>
              <FaIcons.FaBars onClick={changeSidebar} />
            </Link>
          </div>
          <nav className={sidebar ? 'nav-menu active' : 'nav-menu'}>
            <ul className='nav-menu-items' onClick={changeSidebar}>
              <li className='navbar-toggle' />
              <li className='nav-text'>
                <FaIcons.FaHome />
                <span>
                  <Link to='/'>Main</Link>
                </span>
              </li>
              <li className='nav-text'>
                <FiIcons.FiUserPlus />
                <span onClick={changeSignup}>
                  <Link to='#'>SIGN UP</Link>
                </span>
              </li>
              <li className='nav-text'>
                <IoIcons.IoIosLogIn />
                <span onClick={changeLogin}>
                  <Link to='#'>LOGIN</Link>
                </span>
              </li>
            </ul>
          </nav>
        </IconContext.Provider>
      </>
    );
  }
}

export default connect(
  (state) => ({
    loginModal: state.loginModal.loginModal,
    signupModal: state.signupModal.signupModal,
    login: state.isLogin.login,
    sidebar: state.navbar.sidebar,
    username: state.user.info,
  }),
  (dispatch) => ({
    changeLogin: () => dispatch(loginActions.changeLogin()),
    changeSignup: () => dispatch(signupActions.changeSignup()),
    loginStatus: () => dispatch(signinActions.loginStatus()),
    changeSidebar: () => dispatch(sidebarActions.changeSidebar()),
  }),
)(Navbar);
