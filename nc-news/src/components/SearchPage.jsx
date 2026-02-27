import SearchBar from "./searchBar";
import search from "../assets/search.svg";
import {
  fetchAllComments,
  fetchThisArticle,
  fetchAllTopics,
} from "/Users/emmanuellaitopa/Northcoders/frontend/nc-news-frontend/nc-news/apiUtils/api.js";
import { Fragment, useEffect, useState } from "react";
import LoadingState from "./LoadingState";
import { Link } from "react-router-dom";
import thread from "../assets/thread.svg";
import upvoteIcon from "../assets/up-vote.svg";
import downvoteIcon from "../assets/down-vote.svg";
import { filterComments } from "/Users/emmanuellaitopa/Northcoders/frontend/nc-news-frontend/nc-news/apiUtils/utils";

function SearchPage() {
  const [commentsArr, setCommentsArr] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [topicsArr, setTopicsArr] = useState([]);
  const [articleTitles, setArticleTitles] = useState({});

  useEffect(() => {
    const getCommentsAndTitles = async () => {
      const { comments } = await fetchAllComments();
      setCommentsArr(comments); // set comments as normal

      // now `comments` directly
      const titles = {};
      for (const comment of comments) {
        if (!titles[comment.article_id]) {
          const { article } = await fetchThisArticle(comment.article_id);
          titles[comment.article_id] = article.title;
          //making look up obj
        }
      }
      setArticleTitles(titles);
    };

    getCommentsAndTitles();
    handleTopics();
  }, []);

  const highlightMatch = (text, searchTerm) => {
    if (!searchTerm) return text;
    const regex = new RegExp(`(${searchTerm})`, "gi");
    const parts = text.split(regex);
    return parts.map((part, index) => {
      if (part.toLowerCase() === searchTerm.toLowerCase()) {
        return <mark key={index}>{part}</mark>;
      } else {
        return part;
      }
    });
  };

  const handleTopics = async () => {
    const { topics } = await fetchAllTopics();
    setTopicsArr(topics);
  };

  const filteredComments = filterComments(commentsArr)(searchTerm);

  return commentsArr.length === 0 ? (
    <LoadingState isLoading />
  ) : (
    <div className="comments-page-container">
      <div className="action-row" style={{ marginBottom: "20px", gap: "25px" }}>
        {topicsArr
          ? topicsArr.map((topic) => {
              return (
                <Link to={`/topics/${topic.slug}`}>
                  {" "}
                  <button
                    className="delete-btn"
                    style={{ marginTop: "30px", borderRadius: "20px" }}
                  >
                    @{topic.slug}
                  </button>
                </Link>
              );
            })
          : null}
      </div>
      <div
        className="search-wrapper"
        style={{ display: "flex", alignItems: "center", marginBottom: "40px" }}
      >
        <SearchBar setSearchTerm={setSearchTerm} />
        <button className="nav-btn">
          <img src={search} alt="" />
        </button>
      </div>
      {filteredComments.length !== 0 ? (
        filteredComments.map((comment) => {
          return (
            <div style={{ marginBottom: "80px" }} key={comment.comment_id}>
              <div className="comment-header">
                {/* <img className="user-pic" src={comment.avatarImg} alt="" /> */}
                <span className="article-author">
                  @{comment.author} posted in
                </span>
                <span className="article-author">
                  : {articleTitles[comment.article_id]}
                </span>
              </div>

              <div className="comments-divider">
                <span>{highlightMatch(comment.body, searchTerm)}</span>
              </div>
              <div className="comments-prompt">
                <Link to={`/articles/${comment.article_id}`}>
                  <button className="comment-wrapper">
                    <img src={thread} alt="" />
                  </button>
                </Link>

                <p style={{ maxWidth: "50px" }}>go to thread</p>
                <span className="vote-wrapper">
                  <div className="vote-text">{comment.votes}</div>
                  <button className="overlay-btn">
                    <img src={upvoteIcon} alt="" />
                  </button>
                  <button className="overlay-btn">
                    <img src={downvoteIcon} alt="" />
                  </button>
                </span>
              </div>
            </div>
          );
        })
      ) : (
        <p>no comments found, search something else?</p>
      )}
    </div>
  );
}

export default SearchPage;
