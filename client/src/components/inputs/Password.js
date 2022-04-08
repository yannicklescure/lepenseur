import styled from "styled-components";
import { COLORS } from "../../constants";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useState } from "react";

const Password = ({ name, placehoder, handleChange }) => {
  const [visibility, setVisibility] = useState(false);
  const [type, setType] = useState('password');

  const handleClick = (ev) => {
    ev.preventDefault();
    const show = !visibility;
    setVisibility(show);
    setType(show ? 'text' : 'password');
  }

  return (
    <Wrapper>
      <StyledInput
        type={type}
        name={name}
        required
        placeholder={placehoder}
        onChange={(ev) => handleChange(name, ev.target.value)}
      />
      <VisibilityBtn
        onClick={(ev) => handleClick(ev)}
      >
        {
          visibility
            ? <FaRegEye />
            : <FaRegEyeSlash />
        }
      </VisibilityBtn>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  font-size: 16px;
  height: 34px;
  border-radius: 4px;
  border: 1px solid ${COLORS.grey};
  outline: none;
  box-sizing: border-box;
  margin-bottom: 12px;
  display: flex;
`;
const StyledInput = styled.input`
  border-radius: 4px;
  padding: 8px 12px;
  border: none;
  height: 100%;
  width: 100%;
`;
const VisibilityBtn = styled.button`
  border-radius: 4px;
  border: none;
  font-size: 16px;
  padding: 0 8px;
  background-color: ${COLORS.white};
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${COLORS.secondary};
`;

export default Password;