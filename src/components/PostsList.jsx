import React from "react";
import { Link } from "react-router-dom";

function PostsList({ posts }) {
  return (
    <div>
      {posts.map((post) => (
        <div key={post.id} className="card mb-3">
          {post.id % 2 === 0 ? (
            <img
              src="https://placekitten.com/1080/240"
              className="card-img-top"
              alt="..."
            />
          ) : null}

          <div className="card-body">
            <h5 className="card-title">
              <Link
                to={`/posts/${post.id}`}
                // component={() => <Post data={post} />}
              >
                {post.title}
              </Link>
            </h5>
            <p className="card-text">{post.body}</p>
            <p className="card-text">
              <small className="text-muted">Last updated 3 mins ago</small>
              <Link
                className="btn btn-outline-primary ml-auto"
                to={`/posts/${post.id}`}
                style={{ float: "right" }}
              >
                Read more...
              </Link>
            </p>
          </div>
          <div></div>
          {post.id % 2 === 1 ? (
            <img
              src="https://placekitten.com/1080/240"
              className="card-img-bottom"
              alt="..."
            />
          ) : null}
        </div>
      ))}
    </div>
  );
}

export default PostsList;
