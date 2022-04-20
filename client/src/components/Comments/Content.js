import styled from "styled-components";
import { COLORS } from "../../constants";
import { shortWrittenDate } from "../../helpers";
import Loading from '../Loading';
import { NavLink } from "react-router-dom";

const Content = ({ loading, comments }) => {

  if (loading) return (
    <Wrapper>
      <Loading size="32" />
    </Wrapper>
  )

  return (
    <Wrapper>
      {
        comments.length > 0
        ? (
          <>
            {
              comments.map(comment => (
                <Comment key={comment._id} >
                  <Container>
                    <UserName to={`/${comment.username}`}>{ comment.firstName } { comment.lastName }</UserName>
                    <StyledDate>{ shortWrittenDate(comment.createdAt) }</StyledDate>
                  </Container>
                  <Text>{ comment.content }</Text>
                </Comment>
              ))
            }
          </>
        )
        : (
          <>No comments</>
        )
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
`;
const Comment = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 24px;
`;
const UserName = styled(NavLink)`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-weight: bold;
  font-size: 14px;
  color: ${COLORS.secondary};
  text-decoration: none;
`;
const Text = styled.div`
  display: flex;
  padding: 16px;
  background-color: ${COLORS.light};
  border-radius: 4px;
  color: ${COLORS.dark};
`;
const Container = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  margin-bottom: 8px;
  gap: 8px;
`;
const StyledDate = styled.div`
  color: ${COLORS.grey};
  font-size: 14px;
`;

export default Content;