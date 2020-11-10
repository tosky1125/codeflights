import {
  createAction,
  handleActions,
} from 'redux-actions';

const USERINFO = 'userinfo';

export const userinfo = createAction(USERINFO);

const initialState = {
  info: null,
};

export default handleActions({
  [USERINFO]: (state, action) => ({
    info: action.payload,
  }),
}, initialState);
