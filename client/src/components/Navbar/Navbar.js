import styled from "styled-components";
import { FaFeatherAlt } from "react-icons/fa";
import { COLORS } from "../../constants";
import { NavLink, useLocation } from "react-router-dom";
import SearchInput from "../SearchInput";
import { useContext, useState } from "react";
import { UserContext } from "../../contexts/UserContext";
import { AiOutlineUser } from "react-icons/ai";
import Dropdown from "./Dropdown";
import { FaBookmark, FaRegBookmark, FaPenSquare } from "react-icons/fa";
import Cookies from 'universal-cookie';
import Publish from "../buttons/Publish";

const Navbar = () => {
  // const navigate = useNavigate();
  const location = useLocation();
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
    
  const handleClickUser = () => {
    if (!open) setOpen(true);
    return;
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
                {
                  location.pathname === '/new-story'
                    ? (
                      <Publish />
                      )
                    : (
                      <>
                        <NewStory to="/new-story">
                          <FaPenSquare />
                        </NewStory>
                        <NavItem to="/bookmarks">
                          { user.bookmarks.length === 0 ? <FaRegBookmark /> : <FaBookmark /> }
                        </NavItem>
                      </>
                    )
                }
                <StyledIconMenu>                  
                    {
                      user.imageSrc === "undefined"
                      ? (
                        <StyledIconBtn
                          onClick={handleClickUser}
                          open={open}
                        >
                          <AiOutlineUser size="25" />
                        </StyledIconBtn>
                      )
                      : (
                        <StyledImageBtn
                          onClick={handleClickUser}
                          open={open}
                        >
                          <UserImage
                            src={user.imageSrc}
                            alt={user.username}
                            open={open}
                          />
                        </StyledImageBtn>
                      )
                    }
                  
                  <Dropdown
                    open={open}
                    setOpen={setOpen}
                  />
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
  gap: 16px;
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
const StyledImageBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  background: none;
  border: none;
  outline: none;
  border-radius: 50%;
  padding: 0;
  cursor: pointer;
`;
const StyledIconBtn = styled.button`
  background: none;
  border: none;
  outline: none;
  color: ${({open}) => open ? COLORS.grey : COLORS.dark};
  font-size: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 4px;
  border: 1px solid ${({open}) => open ? COLORS.grey : COLORS.dark};
  border-radius: 50%;
  cursor: pointer;
`;
const StyledIconMenu = styled.div`
  position: relative;  
`;
const UserImage = styled.img`
  width: 35px;
  height: 35px;
  object-fit: cover;
  border-radius: 50%;
  ${({open}) => open ? `
    filter: gray; /* IE6-9 */
    -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
    filter: grayscale(1); /* Microsoft Edge and Firefox 35+ */
  ` : `
    -webkit-filter: grayscale(0);
    filter: none;
  `};
`;
const NavItem = styled(NavLink)`
  color: ${COLORS.dark};
  font-size: 18px;
  transition: all 400ms ease;
  
  &:hover {
    color: ${COLORS.primary};
  }
`;
const NewStory = styled(NavItem)`
  font-size: 20px;
`;

export default Navbar;