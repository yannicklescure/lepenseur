import styled from "styled-components";
import { FaShare, FaCommentAlt, FaRegCommentAlt } from "react-icons/fa";
import { COLORS } from "../../constants";
import Like from "../Like";
import Bookmark from "../Bookmark";
import { useContext } from "react";
import { CommentContext } from "../../contexts/CommentContext";

const Actions = ({ article, handleShowComments }) => {

  const {
    state: {
      comments,
    },
  } = useContext(CommentContext);

  return (
    <Wrapper>
      <Container>
        <div>{article.views} views</div>
        <Like article={article} />
      </Container>
      <Container>
        <Comments onClick={handleShowComments}>
          <Icon>
            {
              comments.length > 0
              ? <FaCommentAlt />
              : <FaRegCommentAlt />
            }
          </Icon>    
          <div>{ comments.length } { comments.length === 1 ? 'comment' : 'comments' }</div>
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
  gap: 8px;
  background: none;
  outline: none;
  border: none;
  padding: 0;
  cursor: pointer;
  font-size: 16px;
`;
const Icon = styled.div`
  display: flex;
  align-items: center;
`;

export default Actions;