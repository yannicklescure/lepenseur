import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../constants";

const Banner = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate('/signup');
  }
  return (
    <Wrapper>
      <Container>
        <div>
          <Title>Share your words</Title>
          <SubTitle>In a matter of free speech, we believe every word counts.<br />Let your audience reward yours.</SubTitle>
          <ClickToAction onClick={handleClick}>Start reading</ClickToAction>
        </div>
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: ${COLORS.turquoise};
  width: calc(100vw);
  margin-left: calc(-1 *(100vw - 950px + 32px)/2);
  margin-top: -16px;
  border-bottom: 1px solid ${COLORS.dark};
  `;
const Container = styled.div`
  display: flex;
  /* flex-direction: column; */
  align-items: center;
  min-height: 50vh;
  width: 100%;
  max-width: 950px;
  margin: 0 auto;
  padding: 16px;
  line-height: 1.2;
`;
const Title = styled.h1`
  font-family: 'Playfair Display', serif;
  font-size: 96px;
  font-weight: normal;
  color: ${COLORS.black};
  margin-bottom: 16px;
`;
const SubTitle = styled.div`
  font-size: 24px;
  color: ${COLORS.dark};
  margin-bottom: 24px;
`;
const ClickToAction = styled.button`
  background-color: ${COLORS.dark};
  outline: none;
  border: none;
  color: ${COLORS.light};
  padding: 12px 28px;
  font-size: 18px;
  border-radius: 24px;
  cursor: pointer;
`;

export default Banner;