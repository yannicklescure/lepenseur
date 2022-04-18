import { useEffect, useState } from "react";
import styled from "styled-components";
import Loading from "./Loading";
import Article from "../components/cards/Article";

const PublicArticles = () => {

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/articles`)
      .then((res) => res.json())
      .then((response) => {
        // console.log(response.data);
        setArticles(response.data);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);

  if (loading) return <Loading size="32" />;

  return (
    <Wrapper>
      {
        articles.map(article => (
          <Article key={article._id} article={article} />
        ))
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  margin: 48px 0;
`;

export default PublicArticles;