import React from "react";
import CommentForm from "./CommentForm";

const Post = ({
  title,
  description,
  user,
  comments,
  _id,
  deletePost,
  refresh
}) => (
  <div className="post">
    <h2>
      {title} - {user && `${user.firstName} ${user.lastName}`}
    </h2>
    <p>{description}</p>
    <button onClick={() => deletePost(_id)}>Delete Post</button>
    {comments.map(comment => (
      <li key={comment._id}>
        {comment.comment} - {new Date(comment.date).toString()}
        {comment.user && `${comment.user.firstName} ${comment.user.lastName}`}
      </li>
    ))}
    <CommentForm _id={_id} refresh={refresh} />
  </div>
);

export default Post;
