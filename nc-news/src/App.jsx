import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import ArticlesList from "./components/ArticlesList";
import Header from "./components/Header";
import Nav from "./components/Nav";
import ArticlePage from "./components/ArticlePage";
import Thread from "./components/Topic";
import Threads from "./components/CommentsLi";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Nav />
        <Routes>
          <Route path="/" element={<ArticlesList />} />
          {/* essentially a feed */}

          <Route path="/articles/:article_id" element={<ArticlePage />} />
          <Route path="/articles/:topic" element={<Thread />} />
          <Route path="/articles" element={<ArticlesList />} />
          <Route path="/articles/:article_id/comments" element={<Threads />} />
          {/* articles for a particular topic  */}
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
