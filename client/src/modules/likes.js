import {
  createAction,
  handleActions,
} from 'redux-actions';

const LIKES = 'likes';

export const likes = createAction(LIKES);

const initialState = {
  likes: null,
};

export default handleActions({
  [LIKES]: (state, action) => ({
    likes: action.payload,
  }),
}, initialState);
