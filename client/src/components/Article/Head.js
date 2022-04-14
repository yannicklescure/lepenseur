import styled from "styled-components";
import { COLORS } from "../../constants";
import { capitalizeStr, readingTime, shortWrittenDate } from "../../helpers";
import { FaCircle, FaFacebook, FaTwitter, FaLinkedin, FaShare } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import Avatar from "../Avatar";

const Head = ({ user, article }) => {
  return (
    <Wrapper>
      <Container>
        <NavLink to={`/${article.user.username}`}>
          <Avatar user={article.user} size="48" />          
        </NavLink>
        <StyledDiv>
          <StyledName to={`/${article.user.username}`}>
            <span>{capitalizeStr(article.user.firstName)}</span>
            &nbsp;
            <span>{capitalizeStr(article.user.lastName)}</span>
          </StyledName>
          <StyledInfo>
            <StyledDate>{shortWrittenDate(new Date(parseInt(article.createdAt)), 'en-US')}</StyledDate>
            <Circle><FaCircle /></Circle>
            <div>{readingTime(article.content)} min read</div>
          </StyledInfo>
        </StyledDiv>
      </Container>
      {
        user._id === article.user._id
        ? <EditLink to={`/${user.username}/${article.slug}/edit`}>edit</EditLink>
        : (
          <ShareLinks>
            <FaTwitter />
            <FaFacebook />
            <FaLinkedin />
            <FaShare />
          </ShareLinks>
        )
      }      
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 0 4px;
`;
const StyledDiv = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const StyledName = styled(NavLink)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: ${COLORS.dark};
  &:hover {
    text-decoration: underline;
  }
`;
const StyledInfo = styled(Container)`
  gap: 4px;
  color: ${COLORS.secondary};
  font-size: 14px;
`;
const StyledDate = styled.div`
  color: ${COLORS.secondary};
`;
const Circle = styled.div`
  font-size: 4px;
`;
const EditLink = styled(NavLink)``;
const ShareLinks = styled.div`
  display: flex;
  font-size: 18px;
  gap: 16px;
  color: ${COLORS.dark};
`;

export default Head;