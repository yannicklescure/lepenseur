import { useContext, useEffect, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { UserContext } from "../../contexts/UserContext";

const Dropdown = ({ open, setOpen }) => {
  const navigate = useNavigate();

  const {
    state: { user },
    actions: { logoutUser },
  } = useContext(UserContext);

  const node = useRef();

  useEffect(() => {
    if (open) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [open]);

  // When the user click outside the dropdown, it closes, otherwise it stays open.
  // https://blog.pawsible.in.th/little-neat-trick-to-capture-click-outside-with-react-hook-ba77c37c7e82
  // https://codesandbox.io/s/9o3lw5792w?file=/src/Dropdown.js
  const handleClickOutside = e => {
    if (node.current.contains(e.target)) {
      // inside click
      return;
    }
    // outside click
    // setOpen(false);
    // Creating a delay to set open to false 
    // so cliking on it is handled by click outide function 
    // rather than handleClickUser
    // NB: 150 ms seems to be obtimal as 50 and 100 ms failed
    setTimeout(() => setOpen(false), 150);
  };
  
  const handleLogout = () => {
    // console.log("Logout");
    logoutUser();
    navigate("/");
    setOpen(false);
  };

  return (
    <div
      ref={node}
    >
      <Triangle open={open} />
      <StyledIconSubMenu open={open}>
        <CurrentUser>
          <div>Signed in as</div>
          <div>{user.userName}</div>
        </CurrentUser>
        <StyledIconItem to={`/${user.userName}`}>
          <div>Your profile</div>
        </StyledIconItem>
        <StyledIconItem to="/orders-history">
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
    </div>
  )
}

const Triangle = styled.div`
  display: ${({open}) => open ? 'block' : 'none'};
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
  display: ${({open}) => open ? 'block' : 'none'};
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

export default Dropdown;