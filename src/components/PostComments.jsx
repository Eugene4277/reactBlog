import React, { useContext, useState } from "react";
import _ from "lodash";
import { UserContext } from "../context/user/userContext";
import { PostsContext } from "../context/posts/postsContext";

function PostComments({ comments }) {
  const { post, addComment } = useContext(PostsContext);
  const { user } = useContext(UserContext);
  const [value, setValue] = useState("");

  const isDisabled = value ? false : true;

  const handleComment = (e) => {
    e.preventDefault();
    const comment = {
      postId: post.id,
      email: user.payload.email,
      body: value,
    };

    addComment(comment);
    setValue("");
  };

  return (
    <>
      <ul className="list-unstyled" id="comments-block">
        {comments.map((comment) => (
          <li key={comment.id} className="media my-4 comment-body">
            <div className="media-body">
              <h5 className="mt-0 mb-1">{comment.email.split("@")[0]}</h5>
              <p>{comment.body}</p>
            </div>
          </li>
        ))}
      </ul>
      <form onSubmit={handleComment} className="mb-5">
        <div className="form-group">
          <label htmlFor="new-comment">
            <h5>Add new comment</h5>
          </label>
          <textarea
            className="form-control"
            id="new-comment"
            rows="3"
            value={value}
            onChange={(e) => setValue(e.target.value)}
          ></textarea>
        </div>
        {_.isEmpty(user) ? (
          <div
            tabIndex="0"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Sign In To Add a Comment"
          >
            <button
              className="btn btn-success btn-block"
              style={{ pointerEvents: "none" }}
              type="button"
              disabled
            >
              Add
            </button>
          </div>
        ) : isDisabled ? (
          <div
            tabIndex="0"
            data-toggle="tooltip"
            data-placement="bottom"
            title="Write a comment"
          >
            <button
              className="btn btn-success btn-block"
              style={{ pointerEvents: "none" }}
              type="button"
              disabled
            >
              Add
            </button>
          </div>
        ) : (
          <button type="submit" className="btn btn-success btn-block">
            Add
          </button>
        )}
      </form>
    </>
  );
}

export default PostComments;
