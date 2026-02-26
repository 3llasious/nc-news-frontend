import {
  fetchAllTopicsquery,
  fetchAllTopicsSortquery,
} from "/Users/emmanuellaitopa/Northcoders/frontend/nc-news-frontend/nc-news/apiUtils/api.js";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import Article from "./Article";

function Thread() {
  const { topic } = useParams();
  const [topicalArticles, setTopicalArticles] = useState([]);
  const [commentsOpen, setCommentsOpen] = useState(false);

  useEffect(() => {
    const fetchArticles = async () => {
      const result = await fetchAllTopicsquery(topic);
      const { articles } = result;
      setTopicalArticles(articles);
    };
    fetchArticles();
  }, [topic]);

  console.log(topicalArticles);

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
    <div>
      <div className="sort-btns">
        <button className="sort-btn" onClick={latestHandler}>
          latest
        </button>
        <button className="sort-btn" onClick={popularHandler}>
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
