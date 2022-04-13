import styled from "styled-components";
import Spinner from './Spinner';

const Loading = ({size = 32}) => {
  return (
    <Container>
      <Spinner size={size} />
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export default Loading;