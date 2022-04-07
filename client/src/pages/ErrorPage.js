import styled from "styled-components";
import { FaBomb } from "react-icons/fa";
import { NavLink } from "react-router-dom";

const ErrorPage = () => {
  return (
    <Wrapper>
      <IconBox>
        <FaBomb />
      </IconBox>
      <Title>An unknowed error has occured.</Title>
      <TextBox>Please, try refreshing the page, or <NavLink to={'/'}>contact support</NavLink> if problem persists.</TextBox>
    </Wrapper>
  )
};

const Wrapper = styled.div`
  width: 100%;
  /* min-height: 100vh; */
  font-family: 'Raleway', sans-serif;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 16px;
`;

const IconBox = styled.div`
  font-size: 48px;
  margin-bottom: 48px;
`;

const Title = styled.div`
  font-size: 32px;
  font-weight: bold;
  margin-bottom: 24px;
`;

const TextBox = styled.div`
  font-size: 16px;
  font-weight: normal;
`;

export default ErrorPage;