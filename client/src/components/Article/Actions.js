import styled from "styled-components";
import { FaBookmark, FaRegBookmark, FaShare, FaRegCommentAlt } from "react-icons/fa";
import { COLORS } from "../../constants";
import Like from "../Like";

const Actions = ({ article }) => {
  return (
    <Wrapper>
      <Container>
        <div>{article.views} views</div>
        <Like article={article} />
      </Container>
      <Container>
        <FaRegCommentAlt />
        <FaRegBookmark />
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

export default Actions;