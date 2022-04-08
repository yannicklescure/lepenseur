import styled from "styled-components";
import { COLORS } from "../../constants";

const Input = ({ type, name, required, placeholder, handleChange }) => {
  return (
    <StyledInput
      type={type}
      name={name}
      required={required}
      placeholder={placeholder}
      onChange={(ev) => handleChange(name, ev.target.value)}
    />
  )
}

const StyledInput = styled.input`
  border: 1px solid ${COLORS.grey};
  margin-bottom: 12px;
`;

export default Input;