export const fetchAllArticles = async () => {
  const url = "https://nc-backend-solosprint.onrender.com/api/articles";
  const articles = (await fetch(url)).json();
  return articles;
};

export const fetchAllArticlesquery = async (sortColumn, orderby) => {
  const url = `https://nc-backend-solosprint.onrender.com/api/articles?sort_by=${sortColumn}&order=${orderby}`;
  const articles = (await fetch(url)).json();
  return articles;
};

export const fetchAllTopicsquery = async (topic) => {
  const url = `https://nc-backend-solosprint.onrender.com/api/articles?topic=${topic}`;
  const articles = (await fetch(url)).json();
  return articles;
};

export const fetchAllTopicsSortquery = async (sortColumn, orderby, topic) => {
  const url = `https://nc-backend-solosprint.onrender.com/api/articles?sort_by=${sortColumn}&order=${orderby}&topic=${topic}`;
  const articles = (await fetch(url)).json();
  return articles;
};

export const fetchAllTopics = async () => {
  const url = "https://nc-backend-solosprint.onrender.com/api/topics";
  const topics = (await fetch(url)).json();
  return topics;
};

export const fetchThisArticle = async (article_id) => {
  const url = `https://nc-backend-solosprint.onrender.com/api/articles/${article_id}`;
  const article = (await fetch(url)).json();
  return article;
};

export const fetchAllUsers = async () => {
  const url = "https://nc-backend-solosprint.onrender.com/api/users";
  const users = (await fetch(url)).json();
  return users;
};

export const fetchComments = async (article_id) => {
  const url = `https://nc-backend-solosprint.onrender.com/api/articles/${article_id}/comments`;
  const comments = (await fetch(url)).json();
  return comments;
};
