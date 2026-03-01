import axios from "axios";

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
  const articles = await (await fetch(url)).json();
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

export const fetchThisUser = async (username) => {
  const url = `https://nc-backend-solosprint.onrender.com/api/users/${username}`;
  const res = await fetch(url);
  const data = await res.json();
  return data.user;
};

export const addThisUser = async (username, name, avatar_url) => {
  const url = `https://nc-backend-solosprint.onrender.com/api/users`;
  const { data } = await axios.post(url, {
    username: username,
    name: name,
    avatar_url: avatar_url,
  });
  return data.user;
};

export const fetchComments = async (article_id) => {
  const url = `https://nc-backend-solosprint.onrender.com/api/articles/${article_id}/comments`;
  const comments = (await fetch(url)).json();
  return comments;
};

export const sendVote = async (articleId, num) => {
  const url = `https://nc-backend-solosprint.onrender.com/api/articles/${articleId}`;
  const { data } = await axios.patch(url, { inc_votes: num });
  //axios wraps the response in a data object,
  //my object is stored on akey called article
  return data.article;
};

export const sendComment = async (articleId, username, body) => {
  const url = `https://nc-backend-solosprint.onrender.com/api/articles/${articleId}/comments`;
  const { data } = await axios.post(url, { author: username, body });
  return data.comment;
};

export const fetchAllComments = async () => {
  const url = `https://nc-backend-solosprint.onrender.com/api/comments`;
  const comments = (await fetch(url)).json();
  return comments;
};

export const deleteThisComment = async (id) => {
  const url = `https://nc-backend-solosprint.onrender.com/api/comments/${id}`;
  const { data } = await axios.delete(url);
  return "deleted";
};
