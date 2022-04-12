import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../../contexts/UserContext";

const Settings = () => {
  const {
    state: { user },
  } = useContext(UserContext);
  
  return (
    <Wrapper>
      <div>Settings page</div>
      <div>
        <NavLink to={`/${user.userName}/edit`}>Edit profile</NavLink>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default Settings;
