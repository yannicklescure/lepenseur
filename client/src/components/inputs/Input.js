import { useEffect, useState } from "react";
import styled from "styled-components";
import { COLORS, MIN_CHAR } from "../../constants";

const Input = ({ type, name, required, placeholder, handleChange, value = '' }) => {
  const [valid, setValid] = useState(false);

  useEffect(() => {
    value.length > MIN_CHAR
      ? setValid(true)
      : setValid(false);
  }, [value]);

  return (
    <StyledInput
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      valid={valid}
      onChange={(ev) => handleChange(name, ev.target.value)}
    />
  )
}

const StyledInput = styled.input`
  border: 1px solid ${COLORS.grey};
  margin-bottom: 12px;
  background-color: ${({valid}) => valid ? '#e8f0fe' : COLORS.white};
`;

export default Input;