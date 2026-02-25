import { useEffect, useState } from "react";
import {
  fetchAllArticles,
  fetchAllUsers,
} from "/Users/emmanuellaitopa/Northcoders/frontend/nc-news-frontend/nc-news/apiUtils/api.js";
import Threads from "./CommentsLi";
import { Link } from "react-router-dom";

function Article({ articleobj }) {
  const [authorImg, setAuthorImg] = useState("");
  const [commentsOpen, setCommentsOpen] = useState(false);

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

  const getAuthourPic = () => {
    return authorImg;
  };

  return (
    <div className="card">
      <div className="card-header">
        <img className="author-avatar" src={authorImg} alt="author" />
        <div className="card-header-text">
          <span className="article-title">{articleobj.title}</span>
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

        <div className="button-row">
          <span
            className="comment-wrapper"
            onClick={() => setCommentsOpen(true)}
            style={{ cursor: "pointer" }}
          >
            <div className="vote-text">{articleobj.comment_count}</div>
            <img src="./src/assets/comments.svg" alt="" />
          </span>

          <span className="vote-wrapper">
            <div className="vote-text">{articleobj.votes}</div>
            <button className="overlay-btn">
              <img src="./src/assets/up-vote.svg" alt="" />
            </button>
            <button className="overlay-btn">
              <img src="./src/assets/down-vote.svg" alt="" />
            </button>
          </span>
        </div>
      </div>

      <Threads
        isOpen={commentsOpen}
        closePopup={(e) => {
          setCommentsOpen(false);
        }}
        articleId={articleobj.article_id}
      />
    </div>
  );
}

export default Article;
