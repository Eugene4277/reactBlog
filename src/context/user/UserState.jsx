import React, { useReducer, useEffect } from "react";
import { userReducer } from "./userReducer";
import { UserContext } from "./userContext";
import firebase from "../../firebase/firebase";
import * as actions from "../actionTypes";

function UserState({ children }) {
  const [state, dispatch] = useReducer(userReducer, {
    user: {},
    loading: false,
  });

  useEffect(() => {
    firebase.app.auth().onAuthStateChanged((user) => {
      if (user) {
        const email = user.email;
        const payload = {
          email,
        };
        dispatch({
          type: actions.LOGIN_USER,
          payload,
        });
      }
    });
  }, []);

  const showLoader = () => {
    dispatch({
      type: actions.SHOW_LOADER,
      loading: true,
    });
  };

  const registration = (email, password, name) => {
    const user = {
      email,
      password,
      name,
    };
    try {
      showLoader();
      firebase
        .handleSignUp(email, password)
        .then((res) => {
          console.log(res);

          const db = firebase.database;
          db.ref("user").push({ email, password, name });

          const payload = { ...user };
          dispatch({
            type: actions.ADD_USER,
            payload,
          });
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;

          if (errorCode === "auth/weak-password") {
            alert("The password is too weak.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
          dispatch({
            type: actions.SHOW_LOADER,
            loading: false,
          });
        });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const login = (email, password, goBack) => {
    const user = {
      email,
      password,
    };
    try {
      showLoader();
      firebase
        .toggleSignIn(email, password)
        .then(() => {
          const payload = { ...user };
          dispatch({
            type: actions.LOGIN_USER,
            payload,
          });
          goBack();
        })
        .catch(function (error) {
          var errorCode = error.code;
          var errorMessage = error.message;

          if (errorCode === "auth/wrong-password") {
            alert("Wrong password.");
          } else {
            alert(errorMessage);
          }
          console.log(error);
          dispatch({
            type: actions.SHOW_LOADER,
            loading: false,
          });
        });
    } catch (e) {
      throw new Error(e.message);
    }
  };

  const logout = () => {
    firebase.app
      .auth()
      .signOut()
      .then(function () {
        const payload = {};
        dispatch({
          type: actions.LOGOUT_USER,
          payload,
        });
      })
      .catch(function (error) {
        throw new Error(error);
      });
  };
  return (
    <UserContext.Provider
      value={{
        registration,
        login,
        logout,
        user: state.user,
        loading: state.loading,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}

export default UserState;
