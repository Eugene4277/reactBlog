import {
  FETCH_POSTS,
  SHOW_LOADER,
  FETCH_POST,
  ADD_COMMENT,
} from "../actionTypes";

const handlers = {
  [SHOW_LOADER]: (state) => ({ ...state, loading: true }),
  [FETCH_POSTS]: (state, { payload }) => ({
    ...state,
    posts: payload,
    loading: false,
  }),
  [FETCH_POST]: (state, { payload }) => ({
    ...state,
    post: payload,
    loading: false,
  }),
  [ADD_COMMENT]: (state, { payload }) => ({
    ...state,
    post: {
      ...state.post,
      ...state.post.comments.push(payload),
    },
  }),
  DEFAULT: (state) => state,
};

export const postsReducer = (state, action) => {
  const handle = handlers[action.type] || handlers.DEFAULT;
  return handle(state, action);
};
