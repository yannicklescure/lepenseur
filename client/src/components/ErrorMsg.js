import { useState } from "react";
import styled from "styled-components";
import { COLORS } from "../constants";

const ErrorMsg = ({ message = "An unknown error has occurred", setMessage, width = '100%' }) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true);
    setMessage('');
  }

  return (
    <Wrapper
      width={width}
      isClicked={isClicked}
      onClick={handleClick}
    >
      <TextMsg>{ message }</TextMsg>
      <CloseBtn>&#10005;</CloseBtn>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: ${COLORS.warning};
  width: ${({width}) => width};
  margin-top: 16px;
  border-radius: 4px;
  display: ${({isClicked}) => isClicked ? 'none' : 'flex'};
  align-items: center;
  justify-content: space-between;
`;
const CloseBtn = styled.button`
  cursor: pointer;
  border: none;
  background: none;
  outline: none;
  padding: 16px;
  color: ${COLORS.dark};
`;
const TextMsg = styled.div`
  color: ${COLORS.dark};
  padding: 16px;
`;

export default ErrorMsg;