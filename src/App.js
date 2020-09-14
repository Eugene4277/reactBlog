import React from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";

import Home from "./pages/Home";
import Posts from "./pages/Posts";
import Navbar from "./components/Navbar";
import Post from "./pages/Post";
import Login from "./pages/Login";
import Registr from "./pages/Registr";
import PostsState from "./context/posts/PostsState";
import UserState from "./context/user/UserState";
import Logout from "./pages/Logout";
import NotFound from "./pages/NotFound";
import Breadcrumbs from "./components/Breadcrumbs";
import Profile from "./pages/Profile";

function App() {
  return (
    <UserState>
      <PostsState>
        <BrowserRouter>
          <Navbar />
          <div className="container mt-5 pt-4">
            <Breadcrumbs />
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/posts" exact component={Posts} />
              <Route path="/signin" exact component={Login} />
              <Route path="/signup" exact component={Registr} />
              <Route path="/profile" exact component={Profile} />
              <Route path="/logout" component={Logout} />
              <Route path="/posts/:id" component={Post} />
              <Route path="/not-found" component={NotFound} />
              <Redirect to="/not-found" />
            </Switch>
          </div>
        </BrowserRouter>
      </PostsState>
    </UserState>
  );
}

export default App;
