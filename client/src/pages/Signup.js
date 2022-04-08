import styled from "styled-components";
import { useState, useRef, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { COLORS } from "../constants";
import { UserContext } from "../contexts/UserContext";
import Loading from "../components/Loading/Loading";
import { FaFeatherAlt } from "react-icons/fa";

const SignUp = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [valid, setValid] = useState(false);

  const {
    state: { status },
    actions: { loadingUser, receivedUserFromServer, errorFromServerUser },
  } = useContext(UserContext);

  // create a reference for each input to store the values
  const firstName = useRef();
  const lastName = useRef();
  const email = useRef();
  const password = useRef();
  const confirmPassword = useRef();

  // check if all inputs are filled--if true, enable Sign Up button
  const handleChange = (ev) => {
    if (password.current.value !== confirmPassword.current.value) {
      // console.log("Passwords don't match");
      // we need a return to end the function if the passwords don't match
      setValid(false);
      setDisabled(true);
      return;
    }
    if (
      firstName.current.value.length > 0 &&
      lastName.current.value.length > 0 &&
      email.current.value.length > 0 &&
      password.current.value.length > 0 &&
      confirmPassword.current.value.length > 0
    ) {
      setDisabled(false);
    }
    // if all inputs are valid, setValid(true)
    setValid(true);
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (valid) {
      const formData = {
        firstName: firstName.current.value,
        lastName: lastName.current.value,
        email: email.current.value,
        password: password.current.value,
      };
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
          receivedUserFromServer({ user: json.data });
          // Go to homepage
          navigate("/");
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
        <FirstName
          type="text"
          name="first-name"
          required
          placeholder="First Name"
          ref={firstName}
          onChange={handleChange}
        ></FirstName>
        <LastName
          type="text"
          name="last-name"
          required
          placeholder="Last Name"
          ref={lastName}
          onChange={handleChange}
        ></LastName>

        <Email
          type="email"
          name="email"
          required
          placeholder="E-mail"
          ref={email}
          onChange={handleChange}
        ></Email>

        <Password
          type="password"
          name="password"
          required
          placeholder="Password"
          ref={password}
          onChange={handleChange}
        ></Password>
        {/* Show/hide eye icon */}
        <ConfirmPassword
          type="password"
          name="confirm-password"
          required
          placeholder="Confirm Password"
          ref={confirmPassword}
          onChange={handleChange}
        ></ConfirmPassword>

        <SignUpBtn
          type="submit"
          onClick={(ev) => handleSubmit(ev)}
          disabled={disabled}
        >
          {status === "loading-user" ? <Loading size="18" /> : "Sign Up"}
        </SignUpBtn>
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

const StyledInput = styled.input`
  border: 1px solid ${COLORS.grey};
  margin-bottom: 12px;
`;

const FirstName = styled(StyledInput)``;
const LastName = styled(StyledInput)``;
const Email = styled(StyledInput)``;
const Password = styled(StyledInput)``;
const ConfirmPassword = styled(StyledInput)``;

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
