import styled from "styled-components";
import { useState, useRef, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { COLORS, MIN_CHAR } from "../constants";
import { UserContext } from "../contexts/UserContext";
import Loading from "../components/Loading/Loading";
import { FaFeatherAlt } from "react-icons/fa";
import Input from "../components/inputs/Input";
import Password from "../components/inputs/Password";
import { signUpInitialState } from "../settings";
import ErrorMsg from "../components/ErrorMsg";

const SignUp = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [valid, setValid] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [formData, setFormData] = useState(signUpInitialState);

  const {
    state: { status },
    actions: { loadingUser, logoutUser, receivedUserFromServer, errorFromServerUser },
  } = useContext(UserContext);

  // check if all inputs are filled--if true, enable Sign Up button
  const handleChange = (key, value) => {
    const data = { ...formData, [key]: value };
    setFormData(data);
    console.log(data);
    if (data.password !== data.confirmPassword) {
      // console.log("Passwords don't match");
      // we need a return to end the function if the passwords don't match
      setValid(false);
      setDisabled(true);
      return;
    }
    if (
      data.firstName.length > MIN_CHAR &&
      data.lastName.length > MIN_CHAR &&
      data.email.length > MIN_CHAR &&
      data.password.length > MIN_CHAR &&
      data.confirmPassword.length > MIN_CHAR
    ) {
      setDisabled(false);
    }
    // if all inputs are valid, setValid(true)
    setValid(true);
    setErrorMessage('');
    return;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (valid) {
      console.log(formData);
      loadingUser();
      fetch(`/api/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((json) => {
          console.log(json);
          if (json.status === 200) {
            receivedUserFromServer({ user: json.data });
            // Go to homepage
            navigate("/");
          }
          else {
            setErrorMessage(json.message);
            setValid(false);
            setDisabled(true);
            logoutUser();
          }
        })
        .catch((err) => {
          console.error(err);
          errorFromServerUser({ message: "An unknown error has occurred" });
        });
    }
  };

  return (
    <Wrapper>
      <StyledLogo>
        <FaFeatherAlt />
      </StyledLogo>
      <Title>Sign up to Le penseur</Title>
      <SignUpForm>
        <Input
          type="text"
          name="firstName"
          required={true}
          placeholder="First Name"
          handleChange={handleChange}
        />
        <Input
          type="text"
          name="lastName"
          required={true}
          placeholder="Last Name"
          handleChange={handleChange}
        />

        <Input
          type="email"
          name="email"
          required={true}
          placeholder="E-mail"
          handleChange={handleChange}
        />

        <Password
          name="password"
          required={true}
          placeholder="Password"
          handleChange={handleChange}
        />
        <ConfirmPassword
          name="confirmPassword"
          required={true}
          placeholder="Confirm Password"
          handleChange={handleChange}
        />
        <SignUpBtn
          type="submit"
          onClick={(ev) => handleSubmit(ev)}
          disabled={disabled}
        >
          {status === "loading-user" ? <Loading size="18" /> : "Sign Up"}
        </SignUpBtn>
        { errorMessage && <ErrorMsg message={errorMessage} width="336px" /> }
      </SignUpForm>

      <StyledInfo>
        Already have an account? <LoginLink to="/login">Login</LoginLink>
      </StyledInfo>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  min-height: calc(100vh - 150px);
  padding: 16px;
`;
const ConfirmPassword = styled(Password)``;
const StyledLogo = styled.div`
  font-size: 48px;
  margin-bottom: 16px;
`;

const Title = styled.h1`
  font-size: 18px;
  margin-bottom: 24px;
  color: ${COLORS.dark};
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.light};
  border: 1px solid ${COLORS.grey};
  padding: 16px;
  border-radius: 4px;
  width: 336px;
`;

const StyledInfo = styled.div`
  text-align: center;
  font-size: 14px;
  margin-top: 16px;
  width: 262px;
  background-color: ${COLORS.light};
  border: 1px solid ${COLORS.grey};
  padding: 16px;
  border-radius: 4px;
  width: 336px;
`;
const SignUpBtn = styled.button`
  border: none;
  background-color: ${COLORS.purple};
  color: ${COLORS.light};
  font-size: 16px;
  padding: 8px 12px;
  border-radius: 4px;

  ${({ disabled }) =>
    disabled
      ? `
      cursor: not-allowed;
      opacity: 0.5;
      `
      : `
      cursor: pointer;
  `};
`;

const LoginLink = styled(NavLink)``;

export default SignUp;
