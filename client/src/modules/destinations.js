import {
  createAction,
  handleActions,
} from 'redux-actions';

const DESTINATIONS = 'destinationsCheck';

export const destinationsCheck = createAction(DESTINATIONS);

const initialState = {
  place: [],
};

export default handleActions({
  [DESTINATIONS]: (state, action) => ({
    place: action.payload,
  }),
}, initialState);
