import { fullWrittenDate } from "../helpers";
import styled from "styled-components";
import { FaFeatherAlt } from "react-icons/fa";

const Navbar = () => {
  return (
    <Wrapper>
      <Container>
        <Logo><FaFeatherAlt /></Logo>
        <BrandTitle>Le penseur</BrandTitle>
      </Container>
      <div>{fullWrittenDate(new Date())}</div>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 16px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
`;
const Logo = styled.div`
  height: 32px;
  font-size: 32px;
`;
const BrandTitle = styled.h1`
  font-family: 'Mochiy Pop P One', sans-serif;
  font-size: 28px;
`;

export default Navbar;