import styled from "styled-components";
import { FaBookmark, FaRegBookmark, FaRegHeart, FaHeart, FaShare } from "react-icons/fa";
import { COLORS } from "../../constants";

const Actions = ({ article }) => {
  return (
    <Wrapper>
      <Container>
        <FaRegHeart />
        {article.views} views
      </Container>
      <Container>
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