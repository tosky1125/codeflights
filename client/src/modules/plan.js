import {
  createAction,
  handleActions,
} from 'redux-actions';

const GETPLAN = 'getPlan';
const LOADED = 'loaded';
const CHANGELOAD = 'changeLoad';
export const getPlan = createAction(GETPLAN);
export const loaded = createAction(LOADED);
export const changeLoad = createAction(CHANGELOAD);

const initialState = {
  flights: [],
  blogPostings: [],
  userPostings: [],
  load: false,
  city: null,
};

export default handleActions({
  [GETPLAN]: (state, action) => ({
    flights: action.payload.flights,
    blogPostings: action.payload.blogPostings,
    userPostings: action.payload.userPostings,
    load: state.load,
  }),
  [LOADED]: (state, action) => ({
    flights: state.flights,
    blogPostings: state.blogPostings,
    userPostings: state.userPostings,
    load: true,
    city: action.payload,
  }),
  [CHANGELOAD]: (state, action) => ({
    flights: state.flights,
    blogPostings: state.blogPostings,
    userPostings: state.userPostings,
    load: false,
    city: action.payload,
  }),
}, initialState);
