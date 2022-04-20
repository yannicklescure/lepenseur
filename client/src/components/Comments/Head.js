import styled from "styled-components";
import { COLORS } from "../../constants";
import { FaTimes, FaCommentAlt, FaRegCommentAlt } from "react-icons/fa";

const Head = ({ show, handleShowComments, count }) => {
  return (
    <Top>
      <TopTitle>
        <Icon>
          {
            count > 0
            ? <FaCommentAlt />
            : <FaRegCommentAlt />
          }
        </Icon>
        <div>{count} {count === 1 ? 'comment' : 'comments'}</div>
      </TopTitle>
      <Close 
        show={show}
        onClick={handleShowComments}
      >
        <FaTimes />
      </Close>
    </Top>
  )
}

const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid ${COLORS.secondary};
`;
const Close = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  background: none;
  outline: none;
  border: none;
  cursor: pointer;
  font-size: 16px;
`;
const TopTitle = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const Icon = styled.div`
  display: flex;
  align-items: center;
`;

export default Head;