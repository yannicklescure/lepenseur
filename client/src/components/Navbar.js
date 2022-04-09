import styled from "styled-components";
import { FaFeatherAlt } from "react-icons/fa";
import { COLORS } from "../constants";
import { NavLink } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

const Navbar = () => {

  const {
    state: { user },
    actions: { logoutUser },
  } = useContext(UserContext);

  return (
    <Wrapper>
      <NavbarDiv>
        <HomeLink to="/">
          <Logo><FaFeatherAlt size="28" /></Logo>
          <BrandTitle>Le penseur</BrandTitle>
        </HomeLink>
        <Container>
          <SearchInput />
          <LoginLink to="/login">Sign in</LoginLink>
          <SignupLink to="/signup">Sign up</SignupLink>
        </Container>
      </NavbarDiv>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: ${COLORS.white};
  border-bottom: 1px solid ${COLORS.black};
  position: fixed;
  width: 100%;
`;
const NavbarDiv = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px 0;
  width: 950px;
  margin: 0 auto;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const Logo = styled.div`
`;
const BrandTitle = styled.h1`
  font-family: 'Mochiy Pop P One', sans-serif;
  font-size: 24px;
  padding-bottom: 4px;
`;
const HomeLink = styled(NavLink)`
  text-decoration: none;
  display: flex;
  align-items: center;
  gap: 12px;
  color: ${COLORS.black};
  transition: all 400ms ease;

  &:hover {
    color: ${COLORS.primary};
  }
`;
const StyledLink = styled(NavLink)`
  font-size: 16px;
  text-decoration: none;
  color: ${COLORS.black};
  transition: all 400ms ease;

  &:hover {
    color: ${COLORS.primary};
  }
`;
const LoginLink = styled(StyledLink)``;
const SignupLink = styled(StyledLink)`
  border: 1px solid ${COLORS.black};
  padding: 8px;
  border-radius: 4px;

  &:hover {
    border: 1px solid ${COLORS.primary};
  }
`;

export default Navbar;