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
          userPage.stories.map(story => (
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
const UserImage = styled.img`
  width: 32px;
  height: 32px;
  object-fit: cover;
  border-radius: 50%;
`;
const Spacer = styled.div`
  border-top: 1px solid ${COLORS.grey};
  margin-bottom: 16px;
`;

export default UserPage;