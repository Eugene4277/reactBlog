import React, { useState, useEffect } from "react";
import PostComments from "./PostComments";

function PostBody({ post }) {
  const { body, title, comments } = post;
  const [comm, setComm] = useState([]);

  useEffect(() => {
    if (comments === undefined) {
      post.comments = [];
      setComm([]);
    } else setComm(comments);

    // eslint-disable-next-line
  }, [comments]);

  return (
    <div className="container">
      <div className="row">
        <div id="post-options" className="list-group col-3">
          <a
            className="list-group-item list-group-item-action"
            href="#post-body"
          >
            {title}
          </a>
          <a
            className="list-group-item list-group-item-action"
            href="#comments"
          >
            Comments ({comm.length})
          </a>
        </div>
        <div
          data-spy="scroll"
          data-target="#post-options"
          data-offset="0"
          className="col-9"
        >
          <h4 id="post-body">{title}</h4>
          <p>{body}</p>
          <div>
            <h4 id="comments">Comments ({comm.length})</h4>
            <PostComments comments={comm} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default PostBody;
