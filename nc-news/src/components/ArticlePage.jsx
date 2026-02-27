import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchThisArticle,
  fetchAllUsers,
  sendVote,
} from "/Users/emmanuellaitopa/Northcoders/frontend/nc-news-frontend/nc-news/apiUtils/api.js";
import { Link } from "react-router-dom";
import LoadingState from "./LoadingState";
import upvoteIcon from "../assets/up-vote.svg";
import downvoteIcon from "../assets/down-vote.svg";
import Threads from "./CommentsLi";

function ArticlePage() {
  const [articlePage, setArticlePage] = useState({});
  const [authorImg, setAuthorImg] = useState(null);
  const [voted, setVoted] = useState(null);
  const [voteChange, setVoteChange] = useState(0);

  const { article_id } = useParams();

  useEffect(() => {
    const getThisArticle = async () => {
      const result = await fetchThisArticle(article_id);

      const { article } = result;
      setArticlePage(article);
    };
    getThisArticle();
    const getUserImg = async () => {
      const result = await fetchAllUsers();
      const { users } = result;
      users.forEach((user) => {
        if (user.username === articlePage.author) {
          setAuthorImg(user.avatar_url);
        }
      });
    };
    getUserImg();
  }, [articlePage.author]);

  const date = articlePage.created_at
    ? articlePage.created_at.slice(0, 10)
    : "";
  const time = articlePage.created_at
    ? articlePage.created_at.slice(11, 16)
    : "";

  const handleUpvote = async () => {
    try {
      setVoteChange(1);
      setVoted("up");
      const result = await sendVote(articlePage.article_id, 1);
    } catch (err) {
      resetVote();
    }
  };

  const handleDownvote = async () => {
    try {
      setVoteChange(-1);
      setVoted("down");
      const result = await sendVote(articlePage.article_id, -1);
    } catch (err) {
      resetVote();
    }
  };

  const resetVote = async () => {
    const num = -voteChange;
    setVoted(null);
    setVoteChange(0);
    const result = await sendVote(articlePage.article_id, num);
    console.log(result);
  };

  return !articlePage.topic ? (
    <LoadingState isLoading />
  ) : (
    <div>
      <div className="topic">
        <span className="see-text">Discover threads</span>
        <Link to={`/topics/${articlePage.topic}`}>
          <h2>
            {articlePage.topic &&
              "@" +
                articlePage.topic.slice(0, 1).toUpperCase() +
                articlePage.topic.slice(1)}
          </h2>
        </Link>
      </div>
      <div className="card-header">
        <img className="author-avatar" src={authorImg} alt="" />
        <div>
          <h2 className="font">{articlePage.title}</h2>
          <h4>by {articlePage.author}</h4>
          <span className="article-date">
            posted at {date},{time}
          </span>
        </div>
      </div>

      <p style={{ marginBottom: "1.7rem" }}>{articlePage.body}</p>
      <div style={{ marginBottom: "5rem" }} className="action-row">
        <span className="vote-wrapper">
          <div className="vote-text">{articlePage.votes + voteChange}</div>
          <button
            onClick={() => (voted === null ? handleUpvote() : resetVote())}
            className={voted === "up" ? "btn-active" : "overlay-btn"}
            disabled={voted === "down"}
          >
            <img src={upvoteIcon} alt="" />
          </button>
          <button
            onClick={() => (voted === null ? handleDownvote() : resetVote())}
            className={voted === "down" ? "btn-active" : "overlay-btn"}
            disabled={voted === "up"}
          >
            <img src={downvoteIcon} alt="" />
          </button>
        </span>
      </div>
      <div>
        <Threads
          articleName={articlePage.title}
          articleId={articlePage.article_id}
        />
      </div>
    </div>
  );
}

export default ArticlePage;
