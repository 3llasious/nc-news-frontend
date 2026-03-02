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
  const [voted, setVoted] = useState(null);
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
  }, [articleobj.author]);

  //change later when we add a single user id path or id queries to the backend
  const dateRaw = articleobj.created_at;
  const date = dateRaw.slice(0, 10);
  const dateArranged =
    date.slice(-2) + "-" + date.slice(5, 8) + date.slice(0, 4);
  const time = dateRaw.slice(11, 16);

  const handleClose = () => {
    setOpen(false);
    setCommentClicked(0);
    closePopup();
  };

  const handleUpvote = async () => {
    try {
      setVoteChange(1);
      setVoted("up");
      const result = await sendVote(articleobj.article_id, 1);
    } catch (err) {
      resetVote();
    }
  };

  const handleDownvote = async () => {
    try {
      setVoteChange(-1);
      setVoted("down");
      const result = await sendVote(articleobj.article_id, -1);
    } catch (err) {
      resetVote();
    }
  };

  const resetVote = async () => {
    const num = -voteChange;
    setVoted(null);
    setVoteChange(0);
    const result = await sendVote(articleobj.article_id, num);
    console.log(result);
  };

  return (
    <div className="card">
      <Link to={`/articles/${articleobj.article_id}`}>
        {" "}
        <div className="card-header">
          <img className="author-avatar" src={authorImg} alt="author" />
          <div className="card-header-text">
            <span className="article-author">{articleobj.author}</span>
            <span className="article-date">
              posted {time} on {dateArranged}
            </span>
          </div>
        </div>
      </Link>

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
          <div className="overlay-bottom">
            {" "}
            <Link to={`/articles/${articleobj.article_id}`}>
              <h1 className="article-title">{articleobj.title}</h1>
            </Link>
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
                  key={`up-${voted}`}
                  onClick={(e) => {
                    voted === null ? handleUpvote() : resetVote();
                  }}
                  className={voted === "up" ? "btn-active" : "overlay-btn"}
                  disabled={voted === "down"}
                >
                  <img src={upvoteIcon} alt="" />
                </button>
                <button
                  key={`down-${voted}`}
                  onClick={(e) => {
                    voted === null ? handleDownvote() : resetVote();
                  }}
                  className={voted === "down" ? "btn-active" : "overlay-btn"}
                  disabled={voted === "up"}
                >
                  <img src={downvoteIcon} alt="" />
                </button>
              </span>
            </div>
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
