import { useContext } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { UserContext } from "../../contexts/UserContext";
import { BsShieldLock, BsBox, BsGear } from "react-icons/bs";

const Settings = () => {
  const {
    state: { user },
  } = useContext(UserContext);
  
  return (
    <Wrapper>
      <Title>Your account</Title>
      <Container>
        <StyledLink to={`/${user.username}/edit`}>
          <SectionIcon>
            <BsShieldLock />
          </SectionIcon>
          <SectionText>
            <div>Login & Security</div>
            <SubText>Edit login, profile picture, personal data</SubText>
          </SectionText>
        </StyledLink>
        <StyledLink to={`/${user.username}/edit`}>
          <SectionIcon>
            <BsBox />
          </SectionIcon>
          <SectionText>
            <div>Your orders</div>
            <SubText>Your payments, bills, etc.</SubText>
          </SectionText>
        </StyledLink>
        <StyledLink to={`/${user.username}/edit`}>
          <SectionIcon>
            <BsGear />
          </SectionIcon>
          <SectionText>
            <div>Your settings</div>
            <SubText>Set your notifications and more</SubText>
          </SectionText>
        </StyledLink>
      </Container>
    </Wrapper>
  );
};

const Wrapper = styled.div`
`;
const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  gap: 16px;
`;
const Title = styled.h1`
  font-size: 32px;
  margin-bottom: 24px;
  `;
const StyledLink = styled(NavLink)`
  display: flex;
  align-items: flex-start;
  /* align-items: center; */
  text-decoration: none;
  color: ${COLORS.dark};
  padding: 16px;
  border: 1px solid ${COLORS.grey};
  border-radius: 4px;
  gap: 12px;

  &:hover {
    background-color: ${COLORS.light};
  }
`;
const SectionIcon = styled.div`
  font-size: 24px;
  border: 1px solid ${COLORS.dark};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 48px;
  height: 48px;
`;
const SectionText = styled.div`
  flex: 1;
  font-size: 16px;
  display: flex;
  flex-direction: column;
`;
const SubText = styled.div`
  color: ${COLORS.secondary};
  font-size: 14px;
  margin-top: 4px;
`;

export default Settings;
