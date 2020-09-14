import { ADD_USER, LOGIN_USER, SHOW_LOADER, LOGOUT_USER } from "../actionTypes";

const handlers = {
  [SHOW_LOADER]: (state, { loading }) => ({
    ...state,
    loading,
  }),
  [ADD_USER]: (state, { payload }) => ({
    ...state,
    loading: false,
    user: { ...state.user, payload },
  }),
  [LOGIN_USER]: (state, { payload }) => ({
    ...state,
    loading: false,
    user: { ...state.user, payload },
  }),
  [LOGOUT_USER]: (state, { payload }) => ({
    ...state,
    user: { ...state.user, payload },
  }),
  DEFAULT: (state) => state,
};

export function userReducer(state, action) {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
}
