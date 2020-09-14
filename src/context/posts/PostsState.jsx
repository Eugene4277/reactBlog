import React, { useReducer } from "react";
import axios from "axios";
import { postsReducer } from "./postsReducer";
import { PostsContext } from "./postsContext";
import * as actions from "../actionTypes";
import firebase from "../../firebase/firebase";
import { random } from "lodash";

const url = process.env.REACT_APP_DB_URL;

function PostsState({ children }) {
  const initialState = {
    post: {},
    posts: [],
    loading: false,
  };
  const [state, dispatch] = useReducer(postsReducer, initialState);

  const showLoader = () => dispatch({ type: actions.SHOW_LOADER });

  const fetchPosts = async () => {
    try {
      if (!state.posts.length) {
        showLoader();
        const { data: posts } = await axios.get(`${url}/posts.json`);
        const realPosts = posts.filter((p) => p);
        dispatch({ type: actions.FETCH_POSTS, payload: realPosts });
      }
    } catch (ex) {
      throw new Error(ex.message);
    }
  };

  const fetchPost = async (postId) => {
    try {
      showLoader();
      const db = firebase.database;
      await db
        .ref("/posts")
        .once("value")
        .then(function (posts) {
          const post = posts.val().filter((p) => p.id === Number(postId))[0];
          dispatch({ type: actions.FETCH_POST, payload: post });
        });
    } catch (ex) {
      throw new Error(ex.message);
    }
  };

  const addComment = (comment) => {
    const comm = {
      id: random(100),
      ...comment,
    };
    dispatch({ type: actions.ADD_COMMENT, payload: comm });
  };

  return (
    <PostsContext.Provider
      value={{
        showLoader,
        fetchPosts,
        fetchPost,
        addComment,
        loading: state.loading,
        posts: state.posts,
        post: state.post,
      }}
    >
      {children}
    </PostsContext.Provider>
  );
}

export default PostsState;
