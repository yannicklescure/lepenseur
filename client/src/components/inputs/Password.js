import styled from "styled-components";
import { COLORS, MIN_CHAR } from "../../constants";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { useEffect, useState } from "react";

const Password = ({ name, placeholder, handleChange, required, value = '' }) => {
  const [visibility, setVisibility] = useState(false);
  const [type, setType] = useState('password');
  const [valid, setValid] = useState(false);

  useEffect(() => {
    value.length > MIN_CHAR
      ? setValid(true)
      : setValid(false);
  }, [value]);

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
        required={required}
        placeholder={placeholder}
        valid={valid}
        onChange={(ev) => handleChange(name, ev.target.value)}
      />
      <VisibilityBtn
        onClick={(ev) => handleClick(ev)}
        valid={valid}
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
  border-radius: 4px 0 0 4px;
  padding: 8px 12px;
  border: none;
  height: 100%;
  width: 100%;
  background-color: ${({valid}) => valid ? '#e8f0fe' : COLORS.white};
`;
const VisibilityBtn = styled.button`
  border-radius: 0 4px 4px 0;
  border: none;
  font-size: 16px;
  padding: 0 8px;
  background-color: ${({valid}) => valid ? '#e8f0fe' : COLORS.white};
  display: flex;
  align-items: center;
  cursor: pointer;
  color: ${COLORS.secondary};
`;

export default Password;