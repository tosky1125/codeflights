import {
  createAction,
  handleActions,
} from 'redux-actions';

const WHENISDEPDATE = 'whenIsDepDate';

export const whenIsDepDate = createAction(WHENISDEPDATE);

const initialState = {
  isLoad: false,
};

export default handleActions({
  [WHENISDEPDATE]: ({
    isLoad,
  }) => ({
    isLoad: !isLoad,
  }),
}, initialState);
