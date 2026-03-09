import {
  fetchAllTopicsquery,
  fetchAllTopicsSortquery,
  fetchAllTopics,
} from "/Users/emmanuellaitopa/Northcoders/frontend/nc-news-frontend/nc-news/apiUtils/api.js";
import { useParams } from "react-router-dom";
import { use, useEffect, useState } from "react";
import Article from "./Article";

function Thread() {
  const { topic } = useParams();
  const [topicalArticles, setTopicalArticles] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);
  const [allTopics, setAllTopics] = useState([]);
  const [activeId, setActiveId] = useState(null);

  useEffect(() => {
    const fetchArticles = async () => {
      const result = await fetchAllTopicsquery(topic);
      const { articles } = result;
      setTopicalArticles(articles);
    };
    fetchArticles();
  }, [topic]);

  const fetchTopics = async () => {
    const result = await fetchAllTopics();
    const { topics } = result;
    setAllTopics(topics);
  };

  const popularHandler = async () => {
    const result = await fetchAllTopicsSortquery("votes", "desc", topic);
    const { articles } = result;
    setTopicalArticles(articles);
  };
  const latestHandler = async () => {
    const result = await fetchAllTopicsSortquery("created_at", "desc", topic);
    const { articles } = result;
    console.log(result);
    setTopicalArticles(articles);
  };

  return !topicalArticles ? (
    <LoadingState isLoading />
  ) : (
    <div className="article-list">
      <div className="sort-btns">
        <button
          key="latest"
          className={
            activeId === "latest" ? "sort-button-active" : "sort-button"
          }
          onClick={(e) => {
            setActiveId("latest");
            latestHandler();
          }}
        >
          latest
        </button>
        <button
          key="popular"
          className={
            activeId === "popular" ? "sort-button-active" : "sort-button"
          }
          onClick={(e) => {
            setActiveId("popular");
            popularHandler();
          }}
        >
          popular
        </button>
      </div>
      <div className="topic">
        <h1>@{topic}</h1>
      </div>
      {topicalArticles.map((article) => {
        return (
          <>
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
          </>
        );
      })}
    </div>
  );
}

export default Thread;
