import { createAction, handleActions } from 'redux-actions';

const CHANGELOGIN = 'changeLogin';

export const changeLogin = createAction(CHANGELOGIN);

const initialState = {
  loginModal: false,
};

export default handleActions(
  {
    [CHANGELOGIN]: ({ loginModal }) => ({ loginModal: !loginModal }),
  },
  initialState,
);
