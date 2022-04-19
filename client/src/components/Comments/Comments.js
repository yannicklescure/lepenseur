import styled, { keyframes } from "styled-components";
import { COLORS } from "../../constants";
import { FaTimes, FaRegCommentAlt } from "react-icons/fa";
import { useEffect, useState } from "react";

const Comments = ({ show, handleShowComments }) => {
  const [display, setDisplay] = useState(show);

  useEffect(() => {
    if (show) {
      setDisplay(true);
    }
    else {
      setTimeout(() => setDisplay(false), 250);
    }
  }, [show]);

  return (
    <Wrapper
      show={show}
      display={display}
    >
      <Top>
        <TopTitle>
          <Icon><FaRegCommentAlt /></Icon>
          <div>Comments</div>
        </TopTitle>
        <Close 
          show={show}
          onClick={handleShowComments}
        >
          <FaTimes />
        </Close>
      </Top>
      <Content>
        Comments
      </Content>
    </Wrapper>
  )
}

const slideIn = keyframes`
  from {
    right: -33vw;
  }

  to {
    right: 0;
  }
`;
const slideOut = keyframes`
  from {
    right: 0;
  }

  to {
    right: -33vw;
  }
`;
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: 0;
  display: ${({display}) => display ? 'block' : 'none'};
  width: 33vw;
  height: 100vh;
  background-color: ${COLORS.white};
  padding: 16px;
  animation: ${({show}) => show ? slideIn : slideOut} 300ms ease;
  border-left: 1px solid ${COLORS.secondary};
`;
const Top = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-bottom: 16px;
  border-bottom: 1px solid ${COLORS.secondary};
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  padding: 16px 0;
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

export default Comments;