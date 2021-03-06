import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Article from "../pages/Article";
import ArticleEdit from "../pages/Article/Edit";
import ErrorPage from "../pages/ErrorPage";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserPage from "../pages/UserPage";
import GlobalStyles from "./GlobalStyles";
import Navbar from "./Navbar";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import Settings from "../pages/Settings";
import Bookmarks from "../pages/Bookmarks";
import Edit from "../pages/Settings/Edit";
import Orders from "../pages/Orders";
import NewStory from "../pages/NewStory";
import Articles from "../pages/Articles";
import Tag from "../pages/Tag";

function App() {
  const {
    state: { user },
  } = useContext(UserContext);

  return (
    <>
      <BrowserRouter>
        <GlobalStyles />
        <Navbar />
        <Wrapper>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="*" element={<ErrorPage />} />
            <Route path="/tag/:tagName" element={<Tag />} />
            <Route path="/new-story" element={user._id ? <NewStory /> : <Navigate to="/login" replace />} />
            <Route path="/orders-history" element={user._id ? <Orders /> : <Navigate to="/login" replace />} />
            <Route path="/bookmarks" element={user._id ? <Bookmarks /> : <Navigate to="/login" replace />} />
            <Route path="/settings" element={user._id ? <Settings /> : <Navigate to="/login" replace />} />
            <Route path="/login" element={user._id ? <Navigate to="/" replace /> : <Login />} />
            <Route path="/signup" element={user._id ? <Navigate to="/" replace /> : <Signup />} />
            <Route path="/:username" element={<UserPage />} />
            <Route path="/:username/edit" element={user._id ? <Edit /> : <Navigate to="/login" replace />} />
            <Route path="/:username/articles" element={user._id ? <Articles /> : <Navigate to="/login" replace />} />
            <Route path="/:username/:slug" element={<Article />} />
            <Route path="/:username/:slug/edit" element={user._id ? <ArticleEdit /> : <Navigate to="/login" replace />} />
          </Routes>
        </Wrapper>
      </BrowserRouter>
    </>
  );
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  min-height: 100vh;
  max-width: 950px;
  margin: 0 auto;
  padding: calc(67px + 16px) 16px 16px 16px;
`;

export default App;
