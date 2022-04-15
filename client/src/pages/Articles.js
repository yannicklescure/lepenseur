import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import Article from "../components/cards/Article";
import Loading from "../components/Loading";
import { COLORS } from "../constants";
import { UserContext } from "../contexts/UserContext";
import { capitalizeStr } from "../helpers";

const ArticlesPage = () => {
  const params = useParams();
  // console.log(params);
  const { username } = params;

  const [data, setData] = useState([]);
  const [articles, setArticles] = useState([]);
  const [labels, setLabels] = useState(["All"]);
  const [selected, setSelected] = useState("All");
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
          // console.log(response.data);
          setData(response.data);
          setArticles(response.data);
          setLoading(false);
          const arr = labels;
          response.data.forEach(item => {
            // console.log(arr);
            // console.log(item.visibility);
            if (!arr.includes(item.visibility)) arr.push(item.visibility);
          });
          setLabels(arr.sort());
        });
    }
    // eslint-disable-next-line
  }, [user]);

  const handleClick = (label) => {
    if (label === "All") setArticles(data);
    else setArticles(data.filter(item => item.visibility === label));
    setSelected(label);
  }

  if (loading) return <Loading size="32" />

  return (
    <>
      <Labels>
        {
          labels.map(label => (
            <LabelBtn 
              key={label} 
              onClick={() => handleClick(label)}
              selected={selected === label}
            >{capitalizeStr(label)}</LabelBtn>
          ))
        }
      </Labels>
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
const Labels = styled.div`
  display: flex;
  gap: 12px;
  padding-bottom: 16px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${COLORS.dark};
`;
const LabelBtn = styled.button`
  font-size: 16px;
  cursor: pointer;
  background: none;
  outline: none;
  border: none;
  padding: 0;
  font-weight: ${({selected}) => selected ? 'bold' : 'normal'};

  &:hover {
    color: ${COLORS.primary};
  }
`;

export default ArticlesPage;