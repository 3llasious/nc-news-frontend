import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchThisArticle,
  fetchAllUsers,
} from "/Users/emmanuellaitopa/Northcoders/frontend/nc-news-frontend/nc-news/apiUtils/api.js";
import { Link } from "react-router-dom";
import LoadingState from "./LoadingState";
import commentIcon from "../assets/comments.svg";
import upvoteIcon from "../assets/up-vote.svg";
import downvoteIcon from "../assets/down-vote.svg";
import Threads from "./CommentsLi";

function ArticlePage() {
  const [articlePage, setArticlePage] = useState({});
  const [authorImg, setAuthorImg] = useState(null);

  const { article_id } = useParams();

  useEffect(() => {
    const getThisArticle = async () => {
      const result = await fetchThisArticle(article_id);
      console.log(result);
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
  }, [articlePage?.author]);

  return !articlePage.topic ? (
    <LoadingState isLoading />
  ) : (
    <div>
      <div className="topic">
        <span className="see-text">Discover more</span>
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
          <h3>{articlePage.title}</h3>
          <h4>by {articlePage.author}</h4>
        </div>
      </div>

      <p style={{ marginBottom: "1.7rem" }}>{articlePage.body}</p>
      <div style={{ marginBottom: "5rem" }} className="action-row">
        <span className="vote-wrapper">
          <div className="vote-text">{articlePage.votes}</div>
          <button className="overlay-btn">
            <img src={upvoteIcon} alt="" />
          </button>
          <button className="overlay-btn">
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
