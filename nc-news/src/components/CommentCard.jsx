import { useState, useEffect } from "react";
import {
  fetchComments,
  fetchAllUsers,
} from "/Users/emmanuellaitopa/Northcoders/frontend/nc-news-frontend/nc-news/apiUtils/api.js";
import { Link } from "react-router-dom";
import commentIcon from "../assets/comments.svg";
import upvoteIcon from "../assets/up-vote.svg";
import downvoteIcon from "../assets/down-vote.svg";

function CommentCard({ articleId, alignRight }) {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    async function fetchArticleComments() {
      try {
        const { comments } = await fetchComments(articleId);
        const { users } = await fetchAllUsers();

        const newComments = comments.map((comment) => {
          const matchedUser = users.find(
            (user) => user.username === comment.author,
          );
          //array method - find user where user.username is equal to authour
          // and save it to matchedUser
          return {
            //return the orriginal comment object if matched user exists then the avatar url
            // is saved on the object on key or avatarImg else null is saved on that key
            ...comment,
            avatarImg: matchedUser ? matchedUser.avatar_url : null,
          };
        });

        setComments(newComments);
      } catch (err) {
        console.log(err);
      }
    }

    fetchArticleComments();
  }, [articleId]);
  if (alignRight) {
    return (
      <>
        {comments.map((comment) => {
          return (
            <div key={comment.comment_id}>
              <img
                style={{ float: alignRight ? "right" : "left" }}
                className="user-pic"
                src={comment.avatarImg}
                alt=""
              />
              <div
                className="comments-divider"
                style={{ maxWidth: alignRight ? "70%" : "100%" }}
              >
                {comment.body}
              </div>
              <div className="comments-prompt">
                <Link to={`/articles/${articleId}`}>
                  <button className="comment-wrapper">
                    <img src={commentIcon} alt="" />
                  </button>
                </Link>

                <p>share your thoughts</p>
                <span className="vote-wrapper">
                  <div className="vote-text">{comment.votes}</div>
                  <button className="overlay-btn">
                    <img src={upvoteIcon} alt="" />
                  </button>
                  <button className="overlay-btn">
                    <img src={downvoteIcon} alt="" />
                  </button>
                </span>
              </div>
            </div>
          );
        })}
      </>
    );
  }
  return (
    <>
      {comments.map((comment) => {
        return (
          <div key={comment.comment_id}>
            <span>{comment.author}</span>
            <img
              style={{ float: alignRight ? "right" : "left" }}
              className="user-pic"
              src={comment.avatarImg}
              alt=""
            />
            <div
              className="comments-divider"
              style={{ maxWidth: alignRight ? "70%" : "100%" }}
            >
              {comment.body}
            </div>
            <div className="comments-prompt">
              <button className="comment-wrapper">
                <img src={commentIcon} alt="" />
              </button>

              <p>join the conversation</p>
              <span className="vote-wrapper">
                <div className="vote-text">{comment.votes}</div>
                <button className="overlay-btn">
                  <img src={upvoteIcon} alt="" />
                </button>
                <button className="overlay-btn">
                  <img src={downvoteIcon} alt="" />
                </button>
              </span>
            </div>
          </div>
        );
      })}
    </>
  );
}

export default CommentCard;
