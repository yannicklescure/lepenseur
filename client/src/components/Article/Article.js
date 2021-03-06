import styled from "styled-components";
import Content from './Content';
import Head from './Head';
import Actions from './Actions';
import Tags from "./Tags";
import Comments from "../Comments";
import { useState } from "react";

const Article = ({ user, article }) => {
  const [show, setShow] = useState(false);
  const handleShowComments = () => {
    setShow(!show);
  }

  return (
    <Wrapper>
      <Head user={user} article={article} />
      <Title>{article.title}</Title>
      <StyledImg src={article.imageSrc} />
      <Content article={article} />
      <Tags article={article} />
      <Actions
        article={article}
        handleShowComments={handleShowComments}
      />
      <Comments
        show={show}
        handleShowComments={handleShowComments}
        articleId={article._id}
      />
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
const StyledImg = styled.img`
  margin-bottom: 48px;
`;

export default Article;