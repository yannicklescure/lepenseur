import styled from "styled-components";
import { COLORS } from "../constants";
import { fullWrittenDate } from "../helpers";

const Navigation = ({ title }) => {
  return (
    <Wrapper>
      <Title>{title}</Title>
      <StyledDate>{fullWrittenDate(new Date(), 'en-US')}</StyledDate>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 16px;
`;
const Title = styled.div`
  color: ${COLORS.dark};
`;
const StyledDate = styled.div`
  color: ${COLORS.secondary};
`;

export default Navigation;