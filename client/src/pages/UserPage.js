import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading/Loading";
import { COLORS } from "../constants";
import { capitalizeStr } from "../helpers";

const UserPage = () => {
  const params = useParams()
  const userName = params.username;
  const [user, setUser] = useState({
    imageSrc: "undefined",
    userName: "undefined"
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch(`/api/users/${userName}`)
      .then((res) => res.json())
      .then((response) => {
        console.log(response.data);
        setUser(response.data);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [userName]);

  if (loading) return <Loading size="32" />;

  return (
    <>
      <Container>
        <Title>{capitalizeStr(user.firstName)} {capitalizeStr(user.lastName)}</Title>
        {
          user.imageSrc !== "undefined" &&
          <UserImage src={user.imageSrc} alt={user.userName} />
        }
      </Container>
      <Spacer />
    </>
  )
}

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