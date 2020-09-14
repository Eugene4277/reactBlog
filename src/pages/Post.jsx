import React, { useContext, useEffect } from "react";
import { PostsContext } from "../context/posts/postsContext";
import Loader from "../components/Loader";
import PostBody from "../components/PostBody";

function Post(props) {
  const { id: postId } = props.match.params;
  const { fetchPost, loading, post } = useContext(PostsContext);

  //post = posts.filter((p) => Number(postId) === p.id)[0];
  useEffect(() => {
    fetchPost(postId);
    // eslint-disable-next-line
  }, []);

  return <>{loading ? <Loader /> : <PostBody post={post} />}</>;
}

export default Post;
