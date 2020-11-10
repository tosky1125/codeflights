import {
  createAction,
  handleActions,
} from 'redux-actions';

const CHANGESIGNUP = 'changeSignup';

export const changeSignup = createAction(CHANGESIGNUP);

const initialState = {
  signupModal: false,
};

export default handleActions({
  [CHANGESIGNUP]: ({
    signupModal,
  }) => ({
    signupModal: !signupModal,
  }),
}, initialState);
