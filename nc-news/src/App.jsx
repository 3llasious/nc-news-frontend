import "./App.css";
import ArticlesList from "./components/ArticlesList";
import Header from "./components/Header";
import Nav from "./components/Nav";
import ArticlePage from "./components/ArticlePage";
import Thread from "./components/TopicPage";
import Threads from "./components/CommentsLi";
import SearchPage from "./components/SearchPage";
import LoginPage from "./components/LoginPage";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { LoginProvider } from "./context/LoginContext";

function App() {
  return (
    <LoginProvider>
      <div>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          {/* essentially a feed */}
          <Route path="/login" element={<LoginPage />} />
          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route path="/topics/:topic" element={<Thread />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/articles/:article_id/comments" element={<Threads />} />
          {/* articles for a particular topic  */}
        </Routes>
      </div>
    </LoginProvider>
  );
}

export default App;
