import { createAction, handleActions } from 'redux-actions';

const ISLOGIN = 'loginStatus';

export const loginStatus = createAction(ISLOGIN);

const initialState = {
  login: false,
};

export default handleActions(
  {
    [ISLOGIN]: ({ login }) => ({ login: !login }),
  },
  initialState,
);
