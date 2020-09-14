import * as firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDPwEB1DYbbqeLP51-Y18HzilFhdgYBxHE",
  authDomain: "blog-1fa47.firebaseapp.com",
  databaseURL: "https://blog-1fa47.firebaseio.com",
  projectId: "blog-1fa47",
  storageBucket: "blog-1fa47.appspot.com",
  messagingSenderId: "214518005216",
  appId: "1:214518005216:web:a59b403dafee4e4b073f85",
};

const app = firebase.initializeApp(firebaseConfig);

async function toggleSignIn(email, password) {
  if (firebase.auth().currentUser) {
    console.log(firebase.auth().currentUser);
    firebase.auth().signOut();
  } else {
    return await firebase.auth().signInWithEmailAndPassword(email, password);
  }
}

async function handleSignUp(email, password) {
  return await firebase.auth().createUserWithEmailAndPassword(email, password);
}

export default {
  toggleSignIn,
  handleSignUp,
  app,
  database: firebase.database(),
};
