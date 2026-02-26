import { useEffect, useState } from "react";
import {
  fetchAllArticles,
  fetchAllUsers,
  sendVote,
} from "/Users/emmanuellaitopa/Northcoders/frontend/nc-news-frontend/nc-news/apiUtils/api.js";
import Threads from "./CommentsLi";
import { Link } from "react-router-dom";
import commentsIcon from "../assets/comments.svg";
import upvoteIcon from "../assets/up-vote.svg";
import downvoteIcon from "../assets/down-vote.svg";

function Article({ articleobj, openPopup, closePopup }) {
  const [authorImg, setAuthorImg] = useState(null);
  const [open, setOpen] = useState(false);
  const [commentClicked, setCommentClicked] = useState(0);
  const [voted, setVoted] = useState(0);
  const [voteChange, setVoteChange] = useState(0);

  useEffect(() => {
    const getUserImg = async () => {
      const result = await fetchAllUsers();
      const { users } = result;
      users.forEach((user) => {
        if (user.username === articleobj.author) {
          setAuthorImg(user.avatar_url);
        }
      });
    };
    getUserImg();
  }, [articleobj?.author]);

  //change later when we add a single user id path or id queries to the backend
  const dateRaw = articleobj.created_at;
  const date = dateRaw.slice(0, 10);
  const time = dateRaw.slice(11, 16);

  console.log(articleobj);

  const handleClose = () => {
    setOpen(false);
    setCommentClicked(0);
    closePopup();
  };

  const handleUpvote = async () => {
    setVoteChange(1);
    setVoted(1);
    await sendVote(articleobj.article_id, 1);
  };

  const handleDownvote = async () => {
    setVoteChange(-1);
    setVoted(1);
    await sendVote(articleobj.article_id, -1);
  };

  const resetVote = () => {
    setVoted(0);
    setVoteChange(0);
  };

  return (
    <div className="card">
      <div className="card-header">
        <img className="author-avatar" src={authorImg} alt="author" />
        <div className="card-header-text">
          <span className="article-author">{articleobj.author}</span>
          <span className="article-date">
            posted {date} at {time}{" "}
          </span>
        </div>
      </div>

      <div className="image-wrapper">
        <Link to={`/articles/${articleobj.article_id}`}>
          <img
            className="article-image"
            src={articleobj.article_img_url}
            alt=""
          />
        </Link>
        <div className="image-overlay">
          <h3 className="topic">in @{articleobj.topic}</h3>
          <h1 className="article-title">{articleobj.title}</h1>
          <div className="button-row">
            <span
              className="comment-wrapper"
              onClick={() => {
                if (commentClicked === 0) {
                  setCommentClicked(1);
                  setOpen(true);
                  openPopup();
                } else {
                  setCommentClicked(0);
                  setOpen(false);
                  closePopup();
                }
              }}
              style={{ cursor: "pointer" }}
            >
              <div className="vote-text">{articleobj.comment_count}</div>
              <img src={commentsIcon} alt="" />
            </span>

            <span className="vote-wrapper">
              <div className="vote-text">{articleobj.votes + voteChange}</div>
              <button
                onClick={() => (voted === 0 ? handleUpvote() : resetVote())}
                className="overlay-btn"
              >
                <img src={upvoteIcon} alt="" />
              </button>
              <button
                onClick={() => (voted === 0 ? handleDownvote() : resetVote())}
                className="overlay-btn"
              >
                <img src={downvoteIcon} alt="" />
              </button>
            </span>
          </div>
        </div>
      </div>

      <Threads
        articleName={articleobj.title}
        isOpen={open}
        closeComments={handleClose}
        articleId={articleobj.article_id}
      />
    </div>
  );
}

export default Article;
