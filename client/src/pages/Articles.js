import { useContext, useEffect, useState } from "react";
import { NavLink, useParams } from "react-router-dom";
import styled from "styled-components";
import Loading from "../components/Loading/Loading";
import { UserContext } from "../contexts/UserContext";

const Articles = () => {
  const params = useParams();
  // console.log(params);
  const { username } = params;

  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(true);
  
  const {
    state: { user },
  } = useContext(UserContext);
  console.log(user);

  useEffect(() => {
    if (user._id) {
      setLoading(true);
      fetch(`/api/stories/${username}?_id=${user._id}`)
        .then((res) => res.json())
        .then((response) => {
          console.log(response.data);
          setArticles(response.data);
          setLoading(false);
        });
    }
    // eslint-disable-next-line
  }, [user]);

  return (
    <>
      {
        loading
          ? (<Loading size="32" />)
          : (
            <Wrapper>
              {
                articles.map(article => (
                  <NavLink key={article._id} to={`/${article.username}/${article.slug}`}>{article.title}</NavLink>
                ))
              }
            </Wrapper>
          )
      }
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Articles;