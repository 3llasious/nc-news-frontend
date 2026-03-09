import { useEffect, useState } from "react";
import {
  fetchAllArticles,
  fetchAllUsers,
  fetchAllArticlesquery,
} from "/Users/emmanuellaitopa/Northcoders/frontend/nc-news-frontend/nc-news/apiUtils/api.js";
import Article from "./Article";
import Thread from "./TopicPage";
import LoadingState from "./LoadingState";

function ArticlesList() {
  const [articlesArr, setArticlesArr] = useState([]);

  const [commentsOpen, setCommentsOpen] = useState(false);

  const [activeId, setActiveId] = useState(null);

  //will be a pulsating "welcome to the digest" title when loading

  useEffect(() => {
    async function getArticles() {
      try {
        const result = await fetchAllArticles();
        const { articles } = result;
        setArticlesArr(articles);
      } catch (err) {
        console.log(err);
      }
    }
    getArticles();
  }, []);

  const popularHandler = async () => {
    const result = await fetchAllArticlesquery("votes", "desc");
    const { articles } = result;
    setArticlesArr(articles);
  };
  const latestHandler = async () => {
    const result = await fetchAllArticlesquery("created_at", "desc");
    const { articles } = result;
    console.log(result);
    setArticlesArr(articles);
  };

  return articlesArr.length === 0 ? (
    <LoadingState isLoading />
  ) : (
    <div className="article-list">
      <div className="sort-btns">
        <button
          key="latest"
          className={`sort-button ${activeId === "latest" ? "sort-button-active" : ""}`}
          onClick={(e) => {
            setActiveId("latest");
            latestHandler();
          }}
        >
          latest
        </button>
        <button
          key="popular"
          className={`sort-button ${activeId === "popular" ? "sort-button-active" : ""}`}
          onClick={(e) => {
            setActiveId("popular");
            popularHandler();
          }}
        >
          popular
        </button>
      </div>
      {articlesArr.map((article) => {
        return (
          <Article
            key={article.article_id}
            articleobj={article}
            openPopup={() => {
              setCommentsOpen(true);
            }}
            closePopup={(e) => {
              setCommentsOpen(false);
            }}
            isOpen={commentsOpen}
          />
        );
      })}
    </div>
  );
}

export default ArticlesList;
