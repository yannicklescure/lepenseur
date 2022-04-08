import styled from "styled-components";
import Spinner from './Spinner';

const Loading = ({size = 40}) => {
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