import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Article from "../components/cards/Article";
import Loading from "../components/Loading/Loading";
import { COLORS } from "../constants";
import { UserContext } from "../contexts/UserContext";
import { capitalizeStr } from "../helpers";

const UserPage = () => {
  const params = useParams();
  
  const {
    state: { user },
  } = useContext(UserContext);

  const [userPage, setUserPage] = useState({
    imageSrc: "undefined",
    username: "undefined"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/users/${params.username}`)
      .then((res) => res.json())
      .then((response) => {
        // console.log(response.data);
        setUserPage(response.data);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [params]);

  if (loading) return <Loading size="32" />;
  
  return (
    <>
      <Container>
        <Title>{capitalizeStr(userPage.firstName)} {capitalizeStr(userPage.lastName)}</Title>
        { userPage.username !== user.username && <div>Follow</div> }
      </Container>
      <Spacer />
      <Wrapper>
        {
          userPage.stories.length === 0
          ? <EmptyText>
              <div>Empty</div>
              <div><em>Definition: </em>Containing nothing.</div>
              <div><em>Example: </em>This page is empty.</div>
            </EmptyText>
          : userPage.stories.map(story => (
            <Article key={story._id} article={story} />
          ))
        }
      </Wrapper>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 4px;
  margin-bottom: 16px;
`;
const Title = styled.h1`
  font-family: 'Mochiy Pop P One', sans-serif;
  font-size: 24px;
  padding-bottom: 4px;
`;
const Spacer = styled.div`
  border-top: 1px solid ${COLORS.grey};
  margin-bottom: 16px;
`;
const EmptyText = styled.div`
  display: flex;
  flex-direction: column;
  line-height: 1.6;
  font-size: 16px;

  & div:first-child {
    font-weight: bold;
  }

  & em {
    font-weight: bold;
    color: ${COLORS.secondary};
  }
`;

export default UserPage;