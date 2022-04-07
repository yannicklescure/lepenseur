import { Route, Routes } from "react-router-dom";
import styled from "styled-components";
import Article from "../pages/Article";
import ErrorPage from "../pages/ErrorPage";
import Homepage from "../pages/Homepage";
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import UserPage from "../pages/UserPage";
import GlobalStyles from "./GlobalStyles";
import Navbar from "./Navbar";

function App() {
  return (
    <>
      <GlobalStyles />
      <Navbar />
      <Wrapper>
        <Routes>
          <Route path="*" element={<ErrorPage />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/:username" element={<UserPage />} />
          <Route path="/:username/:slug" element={<Article />} />
        </Routes>
      </Wrapper>
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
  padding-top: calc(67px + 16px);
`;

export default App;
