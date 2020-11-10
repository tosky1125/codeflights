import {
  createAction,
  handleActions,
} from 'redux-actions';

const VIEW = 'view';

export const view = createAction(VIEW);

const initialState = {
  article: null,
  articleLoaded: false,
};

export default handleActions({
  [VIEW]: (state, action) => ({
    article: action.payload,
    articleLoaded: !state.articleLoaded,
  }),
}, initialState);
