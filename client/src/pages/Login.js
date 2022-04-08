import styled from "styled-components";
import { useState, useContext } from "react";
import { useNavigate, NavLink } from "react-router-dom";
import { COLORS, MIN_CHAR } from "../constants";
import { UserContext } from "../contexts/UserContext";
import Loading from "../components/Loading/Loading";
import { FaFeatherAlt } from "react-icons/fa";
import { loginInitialState } from "../settings";
import Password from "../components/inputs/Password";
import Input from "../components/inputs/Input";
import ErrorMsg from "../components/ErrorMsg";

const Login = () => {
  const navigate = useNavigate();
  const [disabled, setDisabled] = useState(true);
  const [valid, setValid] = useState(false);
  const [formData, setFormData] = useState(loginInitialState);
  const [errorMessage, setErrorMessage] = useState('');
  const [forceUpdate, setForceUpdate] = useState(0);
  const {
    state: { status },
    actions: { loadingUser, logoutUser, receivedUserFromServer, errorFromServerUser },
  } = useContext(UserContext);

  // check if all inputs are filled--if true, enable Sign Up button
  const handleChange = (key, value) => {
    const data = { ...formData, [key]: value };
    console.log(key + ': ' + value);
    setFormData(data);
    data.email.length > MIN_CHAR && data.password.length > MIN_CHAR
      ? setDisabled(false)
      : setDisabled(true);
    // if all inputs are valid, setValid(true)
    setValid(true);
    setErrorMessage('');
    return;
  };

  const handleSubmit = (ev) => {
    ev.preventDefault();
    if (valid) {
      setForceUpdate(forceUpdate+1);
      // console.log(formData);
      loadingUser();
      fetch(`/api/login`, {
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
      <Title>Login to Le penseur</Title>
      <LoginForm>
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
        <LoginBtn
          type="submit"
          onClick={(ev) => handleSubmit(ev)}
          disabled={disabled}
        >
          {status === "loading-user" ? <Loading size="18" /> : "Login"}
        </LoginBtn>
      </LoginForm>
      <StyledInfo>
        <div>New to Le penseur?</div>
        <NavLink to="/signup">Create an account.</NavLink>
      </StyledInfo>
      { errorMessage && <ErrorMsg message={errorMessage} width="336px" /> }
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
const LoginForm = styled.form`
  display: flex;
  flex-direction: column;
  background-color: ${COLORS.light};
  border: 1px solid ${COLORS.grey};
  padding: 16px;
  border-radius: 4px;
  width: 336px;
`;
const StyledInfo = styled.div`
  font-size: 14px;
  margin-top: 16px;
  width: 336px;
  background-color: ${COLORS.light};
  border: 1px solid ${COLORS.grey};
  padding: 16px;
  border-radius: 4px;
  display: flex;
  justify-content: center;
  gap: 4px;
`;
const LoginBtn = styled.button`
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

export default Login;
