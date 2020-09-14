import React, { useContext, useEffect } from "react";
import PostsList from "../components/PostsList";
import { PostsContext } from "../context/posts/postsContext";
import Loader from "../components/Loader";

function Posts(props) {
  const { loading, posts, fetchPosts } = useContext(PostsContext);

  useEffect(() => {
    fetchPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <div className="row">
      <div className="col-lg-3">
        <h1>Posts page</h1>
      </div>
      <div className="col-lg-9">
        {loading ? <Loader /> : <PostsList posts={posts} />}
      </div>
    </div>
  );
}

export default Posts;
