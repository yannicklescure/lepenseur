import { COLORS } from "../../constants";
import styled from "styled-components";
import { capitalizeStr, readingTime, shortWrittenDate } from "../../helpers";
import { FaCircle } from "react-icons/fa";
import Content from './Content';

const Article = ({ user, article }) => {
  return (
    <Wrapper>
      <Container>
        <UserImage src={user.imageSrc} alt={user.username} />
        <Wrapper>
          <StyledName>
            <div>{capitalizeStr(user.firstName)}</div>
            <div>{capitalizeStr(user.lastName)}</div>
          </StyledName>
          <StyledInfo>
            <StyledDate>{shortWrittenDate(new Date(article.createdAt), 'en-US')}</StyledDate>
            <Circle><FaCircle /></Circle>
            <div>{readingTime(article.content)} min read</div>
          </StyledInfo>
        </Wrapper>
      </Container>
      <Title>{article.title}</Title>
      <Content article={article} />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const StyledName = styled(Container)`
  gap: 4px;
`;
const StyledInfo = styled(Container)`
  gap: 4px;
  color: ${COLORS.secondary};
  font-size: 14px;
`;
const UserImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 50%;
`;
const Title = styled.h1`
  /* font-family: 'Mochiy Pop P One', sans-serif; */
  font-size: 32px;
  margin: 24px 0;
  line-height: 1.6;
`;
const StyledDate = styled.div`
  color: ${COLORS.secondary};
`;
const Circle = styled.div`
  font-size: 4px;
`;

export default Article;