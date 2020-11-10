import {
  combineReducers,
} from 'redux';
import loginModal from './loginModal';
import view from './view';
import signupModal from './signupModal';
import isLogin from './isLogin';
import user from './user';
import destinations from './destinations';
import plan from './plan';
import travel from './travel';
import navbar from './navbar';
import likes from './likes';

export default combineReducers({
  loginModal,
  signupModal,
  isLogin,
  user,
  destinations,
  plan,
  travel,
  view,
  likes,
  navbar,
});
