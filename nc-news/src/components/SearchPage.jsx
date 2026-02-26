import SearchBar from "./searchBar";
import search from "../assets/search.svg";
import { fetchAllComments } from "/Users/emmanuellaitopa/Northcoders/frontend/nc-news-frontend/nc-news/apiUtils/api.js";
import { useEffect, useState } from "react";
import LoadingState from "./LoadingState";
import { Link } from "react-router-dom";
import commentIcon from "../assets/comments.svg";
import upvoteIcon from "../assets/up-vote.svg";
import downvoteIcon from "../assets/down-vote.svg";
import { filterComments } from "/Users/emmanuellaitopa/Northcoders/frontend/nc-news-frontend/nc-news/apiUtils/utils";

function SearchPage() {
  const [commentsArr, setCommentsArr] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const getComments = async () => {
      const { comments } = await fetchAllComments();
      setCommentsArr(comments);
    };
    getComments();
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

  const filteredComments = filterComments(commentsArr)(searchTerm);

  return commentsArr.length === 0 ? (
    <LoadingState isLoading />
  ) : (
    <div className="comments-page-container">
      <div
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
                <span className="article-author">@{comment.author}</span>
              </div>

              <div className="comments-divider">
                <span>{highlightMatch(comment.body, searchTerm)}</span>
              </div>
              <div className="comments-prompt">
                <Link to={`/articles/${comment.article_id}`}>
                  <button className="comment-wrapper">
                    <img src={commentIcon} alt="" />
                  </button>
                </Link>

                <p>go to this conversation</p>
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
