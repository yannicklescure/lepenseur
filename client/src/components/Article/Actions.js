import styled from "styled-components";
import { FaShare, FaRegCommentAlt } from "react-icons/fa";
import { COLORS } from "../../constants";
import Like from "../Like";
import Bookmark from "../Bookmark";

const Actions = ({ article, handleShowComments }) => {
  return (
    <Wrapper>
      <Container>
        <div>{article.views} views</div>
        <Like article={article} />
      </Container>
      <Container>
        <Comments onClick={handleShowComments}>
          <FaRegCommentAlt />
        </Comments>
        <Bookmark article={article} />
        <FaShare />
      </Container>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 48px 0;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  color: ${COLORS.secondary};
  gap: 16px;
`;
const Comments = styled.button`
  display: flex;
  align-items: center;
  background: none;
  outline: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 16px;
`;

export default Actions;