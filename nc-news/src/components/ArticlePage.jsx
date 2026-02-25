import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { fetchThisArticle } from "/Users/emmanuellaitopa/Northcoders/frontend/nc-news-frontend/nc-news/apiUtils/api.js";

function ArticlePage() {
  const [articlePage, setArticlePage] = useState({});

  const { article_id } = useParams();

  useEffect(() => {
    const getThisArticle = async () => {
      const result = await fetchThisArticle(article_id);
      console.log(result);
      const { article } = result;
      setArticlePage(article);
    };
    getThisArticle();
  }, [articlePage?.author]);

  return <div>{articlePage.author}</div>;
}

export default ArticlePage;
