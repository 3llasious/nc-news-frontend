import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  fetchThisArticle,
  fetchAllUsers,
} from "/Users/emmanuellaitopa/Northcoders/frontend/nc-news-frontend/nc-news/apiUtils/api.js";

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

  console.log();

  return (
    <div>
      <span className="topic">
        <h2>
          {articlePage.topic &&
            "@" +
              articlePage.topic.slice(0, 1).toUpperCase() +
              articlePage.topic.slice(1)}
        </h2>
      </span>
      <div className="card-header">
        <img className="author-avatar" src={authorImg} alt="" />
        <h4>{articlePage.author}</h4>
      </div>

      <p>{articlePage.body}</p>
    </div>
  );
}

export default ArticlePage;
