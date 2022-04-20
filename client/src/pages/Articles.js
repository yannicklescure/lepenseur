import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Article from "../components/cards/Article";
import Labels from "../components/Labels";
import Loading from "../components/Loading";
import { UserContext } from "../contexts/UserContext";

const ArticlesPage = () => {
  const params = useParams();
  // console.log(params);
  const { username } = params;

  const [data, setData] = useState([]);
  const [articles, setArticles] = useState([]);
  const [labels, setLabels] = useState(["all", "public", "private", "unlisted"]);
  const [loading, setLoading] = useState(true);
  
  const {
    state: { user },
  } = useContext(UserContext);
  // console.log(user);

  useEffect(() => {
    if (user._id) {
      setLoading(true);
      fetch(`/api/stories/${username}?_id=${user._id}`)
        .then((res) => res.json())
        .then((response) => {
          // console.log(response);
          try {
            const items = response.data.sort((a,b) => b.createdAt - a.createdAt);
            setData(items);
            setArticles(items);
            setLoading(false);
            const arr = ["all"];
            items.forEach(item => {
              if (!arr.includes(item.visibility)) arr.push(item.visibility);
            });
            const copy = labels;
            labels.forEach((label, index) => {
              if (!arr.includes(label)) copy.splice(index, 1, null);
            });
            // console.log(copy);
            setLabels(copy.filter(el => el !== null));
          } catch (err) {
            console.log("Error Getting Items", err);
          }
        });
    }
    // eslint-disable-next-line
  }, [user]);  

  if (loading) return <Loading size="32" />

  return (
    <>
      <Labels
        data={data}
        labels={labels}
        setArticles={setArticles}
      />      
      <Wrapper>
        {
          articles.map(article => (
            <Article key={article._id} article={article} />
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

export default ArticlesPage;