import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading";
import { COLORS } from "../constants";
import { UserContext } from "../contexts/UserContext";
import NotFound from "./NotFound";

const Article = () => {
  const params = useParams();
  // console.log(params);
  const { username, slug } = params;

  const [visibility, setVisibility] = useState(undefined);
  const [article, setArticle] = useState({});
  const [loading, setLoading] = useState(true);
  
  const {
    state: { user },
  } = useContext(UserContext);
  // console.log(user);

  useEffect(() => {
    let unmounted = false;
    let fetchUrl = `/api/stories/${username}/${slug}`;
    if (user._id) fetchUrl += `?_id=${user._id}`;
    console.log(fetchUrl);
    fetch(fetchUrl)
      .then((res) => {
        if (!unmounted) return res.json();
      })
      .then((response) => {
        if (!unmounted) {
          console.log(response);
          const status = {
            404: () => {
              setVisibility('not-found');
            },
            200: () => {
              setArticle(response.data);
            }
          };
          status[response.status]();
          // setUser(response.data);
          setLoading(false);
        }
      });
      
      return () => {
        unmounted = true;
      };
  // eslint-disable-next-line
  }, [user, username, slug]);

  if (loading) return <Loading />;
  if (visibility === 'not-found') return <NotFound />;

  return (
    <Wrapper>
      <Container>
        <UserImage src={user.imageSrc} alt={user.username} />
        <Wrapper>
          <StyledName>
            <div>{user.firstName}</div>
            <div>{user.lastName}</div>
          </StyledName>
          <StyledDate>date du jour</StyledDate>
        </Wrapper>
      </Container>
      <Title>{article.title}</Title>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
`;
const StyledName = styled(Container)`
  gap: 4px;
`;
const UserImage = styled.img`
  width: 48px;
  height: 48px;
  object-fit: cover;
  border-radius: 50%;
`;
const Title = styled.h1`
  font-family: 'Mochiy Pop P One', sans-serif;
  font-size: 24px;
  padding-bottom: 4px;
  margin: 24px 0;
`;
const StyledDate = styled.div`
  color: ${COLORS.secondary};
`;

export default Article;