import styled from "styled-components";
import Content from './Content';
import Head from './Head';

const Article = ({ user, article }) => {
  return (
    <Wrapper>
      <Head user={user} article={article} />
      <Title>{article.title}</Title>
      <StyledImg src={article.imageSrc} />
      <Content article={article} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Title = styled.h1`
  /* font-family: 'Mochiy Pop P One', sans-serif; */
  font-size: 32px;
  margin: 24px 0;
  line-height: 1.6;
`;
const StyledImg = styled.img``;

export default Article;