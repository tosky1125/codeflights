import { createAction, handleActions } from 'redux-actions';

const CHANGESIDEBAR = 'changeSidebar';

export const changeSidebar = createAction(CHANGESIDEBAR);

const initialState = {
  sidebar: false,
};

export default handleActions(
  {
    [CHANGESIDEBAR]: ({ sidebar }) => ({ sidebar: !sidebar }),
  },
  initialState,
);
