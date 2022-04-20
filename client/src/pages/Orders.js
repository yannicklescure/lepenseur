import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { UserContext } from "../contexts/UserContext";

const Orders = () => {
  const {
    state: { user },
  } = useContext(UserContext);

  return (
    <Wrapper>
      {
        user.following.map(user => (
          <Item key={user._id}>
            <NavLink to={`/${user.username}`}>{`${user.firstName} ${user.lastName}`}</NavLink>
          </Item>
        ))
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Item = styled.div`
  margin-bottom: 16px;
`;

export default Orders;