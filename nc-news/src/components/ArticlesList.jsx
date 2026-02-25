import { useEffect, useState } from "react";
import {
  fetchAllArticles,
  fetchAllUsers,
  fetchAllArticlesquery,
} from "/Users/emmanuellaitopa/Northcoders/frontend/nc-news-frontend/nc-news/apiUtils/api.js";
import Article from "./Article";
import Thread from "./Topic";
import { Link } from "react-router-dom";

function ArticlesList() {
  const [articlesArr, setArticlesArr] = useState([]);
  const [voteChange, setVoteChange] = useState(0);
  const [isLoading, setIsLoading] = useState(false);

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

  return (
    <div>
      <div className="sort-btns">
        <button className="sort-btn" onClick={latestHandler}>
          latest
        </button>
        <button className="sort-btn" onClick={popularHandler}>
          popular
        </button>
      </div>
      {articlesArr.map((article) => {
        return (
          <>
            <Article key={article.article_id} articleobj={article} />
          </>
        );
      })}
    </div>
  );
}

export default ArticlesList;
