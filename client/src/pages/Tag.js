import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Article from "../components/cards/Article";
import Loading from "../components/Loading";
import { COLORS } from "../constants";
// import { capitalizeStr } from "../helpers";
import NotFound from "./NotFound";
import { FaHashtag } from "react-icons/fa";

const Tag = () => {
  const params = useParams();
  const tagName = params.tagName;

  const [loading, setLoading] = useState(true);
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/tag/${tagName}`)
      .then((res) => res.json())
      .then((response) => {
        // console.log(response.data);
        setPosts(response.data);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, [params]);

  if (loading) return <Loading size="32" />;

  if (posts.length === 0) return <NotFound />

  return (
    <>
      <Container>
        <HashTag><FaHashtag /></HashTag>
        <Title>{tagName}</Title>
      </Container>
      <Spacer />
      <Wrapper>
        {          
          posts.map(post => (
            <Article key={post._id} article={post} />
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
  /* justify-content: space-between; */
  padding: 0 4px;
  margin-bottom: 16px;
  gap: 4px;
`;
const HashTag = styled.div`
  font-size: 24px;
`;
const Title = styled.h1`
  /* font-family: 'Mochiy Pop P One', sans-serif; */
  font-size: 24px;
  padding-bottom: 4px;
`;
const Spacer = styled.div`
  border-top: 1px solid ${COLORS.grey};
  margin-bottom: 16px;
`;

export default Tag;