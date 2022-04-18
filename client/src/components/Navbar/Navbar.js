import styled from "styled-components";
import { COLORS } from "../../constants";
import { NavLink, useLocation } from "react-router-dom";
import SearchInput from "../SearchInput";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import Dropdown from "./Dropdown";
import { FaBookmark, FaRegBookmark, FaFeatherAlt, FaRegFileAlt, FaRegBell, FaBell } from "react-icons/fa";
import Cookies from 'universal-cookie';
import PublishStory from "../buttons/PublishStory";
import { StoryContext } from "../../contexts/StoryContext";
import UpdateStory from "../buttons/UpdateStory";
import Avatar from "../Avatar";

const Navbar = () => {
  // const navigate = useNavigate();
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const cookies = new Cookies();
  cookies.set('path', location.pathname, { path: '/' });
  // console.log(cookies.get('path'));

  const [open, setOpen] = useState(false);

  // useEffect(() => {
  //   const pathname = cookies.get('path');
  //   console.log(pathname);
  //   if (pathname) navigate(pathname);
  // }, []);
  
  const {
    state: { user },
  } = useContext(UserContext);

  const {
    state: { status },
    actions: { initialStory }
  } = useContext(StoryContext);

  useEffect(() => {
    // console.log(location);
    if (location.pathname !== '/new-story') initialStory();
  }, [location]);
    
  const handleClickUser = () => {
    if (!open) setOpen(true);
    return;
  }  

  return (
    <Wrapper isHomepage={!user._id && isHomepage}>
      <NavbarDiv>
      {
        user._id
          ? (<>
              <Container>
                <HomeLink to="/">
                  <Logo><FaFeatherAlt size="28" /></Logo>
                </HomeLink>
                <SearchInput />
              </Container>
              <Container>
                {
                  location.pathname === '/new-story'
                    ? (
                      <PublishStory />
                      )
                    : status === "ready-to-update" || status === "sending-story-to-server"
                    ? <UpdateStory />
                    : (
                      <>
                        <NavItem to="/">
                          { user.bookmarks.length === 0 ? <FaBell /> : <FaRegBell /> }
                        </NavItem>
                        <NavItem to="/bookmarks">
                          { user.bookmarks.length === 0 ? <FaBookmark /> : <FaRegBookmark /> }
                        </NavItem>
                        <NavItem to="/new-story">
                          <FaRegFileAlt />
                        </NavItem>
                      </>
                    )
                }
                <StyledIconMenu>                  
                  <StyledIconBtn
                    onClick={handleClickUser}
                    open={open}
                  >
                    <Avatar user={user} open={open} />
                  </StyledIconBtn>
                  <Dropdown
                    open={open}
                    setOpen={setOpen}
                  />
                </StyledIconMenu>
              </Container>
            </>)
          : (<>
              <HomeLink to="/">
                <Logo><FaFeatherAlt size="28" /></Logo>
                <BrandTitle>Le penseur</BrandTitle>
              </HomeLink>
              <Container>
                <SearchInput />
                <LoginLink to="/login">Sign in</LoginLink>
                <SignupLink to="/signup">Sign up</SignupLink>
              </Container>
            </>)
      }
      </NavbarDiv>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  background-color: ${ ({isHomepage}) => isHomepage ? COLORS.turquoise : COLORS.white };
  border-bottom: 1px solid ${COLORS.dark};
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
  gap: 16px;
`;
const Logo = styled.div`
`;
const BrandTitle = styled.h1`
  /* font-family: 'Mochiy Pop P One', sans-serif; */
  font-family: 'Playfair Display', serif;
  font-weight: normal;
  font-size: 28px;
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
const StyledImageBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  outline: none;
  padding: 0;
  cursor: pointer;
`;
const StyledIconBtn = styled(StyledImageBtn)`  
`;
const StyledIconMenu = styled.div`
  position: relative;  
`;
const NavItem = styled(NavLink)`
  color: ${COLORS.dark};
  font-size: 18px;
  transition: all 400ms ease;
  
  &:hover {
    color: ${COLORS.primary};
  }
`;

export default Navbar;