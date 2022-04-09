import styled from "styled-components";
import { FaFeatherAlt } from "react-icons/fa";
import { COLORS } from "../constants";
import { NavLink, useNavigate } from "react-router-dom";
import SearchInput from "./SearchInput";
import { useContext, useState } from "react";
import { UserContext } from "../contexts/UserContext";
import { AiOutlineUser } from "react-icons/ai";

const Navbar = () => {
  const navigate = useNavigate();
  const [showUserMenu, setShowUserMenu] = useState(false);

  const {
    state: { user },
    actions: { logoutUser },
  } = useContext(UserContext);

  const handleLogout = () => {
    // console.log("Logout");
    logoutUser();
    navigate("/");
    setShowUserMenu(false);
  };

  const handleClickUser = () => {
    setShowUserMenu(!showUserMenu);
  }

  return (
    <Wrapper>
      {
        user._id
          ? (<NavbarDiv>
              <Container>
                <HomeLink to="/">
                  <Logo><FaFeatherAlt size="28" /></Logo>
                </HomeLink>
                <SearchInput />
              </Container>
              <Container>
                <StyledIconMenu>
                  <StyledIconBtn
                    onClick={() => handleClickUser()}
                    showUserMenu={showUserMenu}
                  >
                    <AiOutlineUser size="25" />
                  </StyledIconBtn>
                  <Triangle showUserMenu={showUserMenu} />
                  <StyledIconSubMenu showUserMenu={showUserMenu}>
                    <CurrentUser>
                      <div>Signed in as</div>
                      <div>{user.userName}</div>
                    </CurrentUser>
                    <StyledIconItem to="/order-history">
                      <div>Your orders</div>
                    </StyledIconItem>
                    <StyledIconItem to="/bookmarks">
                      <div>Your bookmarks</div>
                    </StyledIconItem>
                    <StyledIconItem to="/settings">
                      <div>Settings</div>
                    </StyledIconItem>
                    <Logout onClick={handleLogout}>
                      <div>Sign out</div>
                    </Logout>
                  </StyledIconSubMenu>
                </StyledIconMenu>
              </Container>
            </NavbarDiv>)
          : (<NavbarDiv>
              <HomeLink to="/">
                <Logo><FaFeatherAlt size="28" /></Logo>
                <BrandTitle>Le penseur</BrandTitle>
              </HomeLink>
              <Container>
                <SearchInput />
                <LoginLink to="/login">Sign in</LoginLink>
                <SignupLink to="/signup">Sign up</SignupLink>
              </Container>
            </NavbarDiv>)
      }
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
  padding: 16px;
  max-width: 950px;
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
const Triangle = styled.div`
  display: ${({showUserMenu}) => showUserMenu ? 'block' : 'none'};
  content: '';
  position: absolute;
  right: 5px;
  top: 36px;
  width: 0; 
  height: 0;
  border-left: 12px solid transparent;
  border-right: 12px solid transparent;
  border-bottom: 12px solid ${COLORS.grey};
`;
const Logout = styled.button`
  background: none;
  border: none;
  width: 100%;
  cursor: pointer;
  text-align: left;
  padding: 0;
  font-size: 16px;
  border-top: 1px solid ${COLORS.grey};
  border-radius: 0 0 4px 4px;
`;
const StyledIconItem = styled(NavLink)``;
const StyledIconSubMenu = styled.div`
  display: ${({showUserMenu}) => showUserMenu ? 'block' : 'none'};
  position: absolute;
  top: 44px;
  right: 0;
  background-color: ${COLORS.white};
  min-width: 154px;
  font-size: 16px;
  z-index: 1000;
  border: 1px solid ${COLORS.grey};
  border-radius: 4px;

  & ${StyledIconItem}, ${Logout} {
    color: ${COLORS.dark};
    padding: 0 16px;
    height: 32px;
    width: 100%;
    display: flex;
    align-items: center;
    text-decoration: none;
  }

  & ${StyledIconItem}:hover, ${Logout}:hover {
    color: ${COLORS.light};
    background-color: ${COLORS.primary};
  }
`;
const StyledIconBtn = styled.button`
  background: none;
  border: none;
  outline: none;
  color: ${({showUserMenu}) => showUserMenu ? COLORS.grey : COLORS.dark};
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: 1px solid ${({showUserMenu}) => showUserMenu ? COLORS.grey : COLORS.dark};
  border-radius: 50%;
  cursor: pointer;
`;
const StyledIconMenu = styled.div`
  position: relative;
  display: inline-block;

  /* &:hover ${StyledIconBtn} {
    color: ${COLORS.grey};
    border: 1px solid ${COLORS.grey};
  } */
`;
const CurrentUser = styled.div`
  display: flex;
  flex-direction: column;
  font-size: 14px;
  padding: 12px 16px;
  border-bottom: 1px solid ${COLORS.grey};

  & div:last-child {
    font-weight: bold;
    margin-top: 6px;
  }
`;

export default Navbar;