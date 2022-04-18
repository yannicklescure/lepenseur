import { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled, { keyframes } from "styled-components";
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
  const [labels, setLabels] = useState(["all", "public", "private", "unlisted"]);
  const [selected, setSelected] = useState("all");
  const [loading, setLoading] = useState(true);
  const [labelHover, setLabelHover] = useState(false);
  
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

  const handleClick = (label) => {
    if (label === "all") setArticles(data);
    else setArticles(data.filter(item => item.visibility === label));
    setSelected(label);
  }

  if (loading) return <Loading size="32" />

  return (
    <>
      <Labels>
        {
          labels.map(label => (
            <LabelDiv 
              key={label}
              onMouseEnter={() => selected === label ? setLabelHover(true) : null}
              onMouseLeave={() => selected === label ? setLabelHover(false) : null}
              // onMouseOver={() => selected === label ? setLabelHover(!labelHover) : null}
              labelHover={labelHover}
            >
              <LabelBtn 
                onClick={() => handleClick(label)}
                selected={selected === label}
              >{capitalizeStr(label)}</LabelBtn>
              <BorderBottom 
                selected={selected === label}
                labelHover={labelHover}
              />
            </LabelDiv>
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
  margin-bottom: 16px;
  border-bottom: 1px solid ${COLORS.secondary};
`;
const LabelDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${COLORS.dark};

  &:hover {
    color: ${COLORS.primary};
  }
`;
const LabelBtn = styled.button`
  font-size: 16px;
  cursor: pointer;
  background: none;
  outline: none;
  border: none;
  padding: 0;
  padding-bottom: ${({selected}) => selected ? '16px' : '16px'};
  color: inherit;
`;
const slideIn = keyframes`
  from {
    width: 0%;
    background-color: ${COLORS.primary};
  }

  to {
    width: 100%;
    background-color: ${COLORS.dark};
  }
`;
const slideOut = keyframes`
  from {
    width: 100%;
  }

  to {
    width: 0%;
  }
`;
const BorderBottom = styled.div`
  width: ${({selected}) => selected ? '100%' : '0%'};
  height: 3px;
  background-color: ${({labelHover}) => labelHover ? COLORS.primary : COLORS.dark};
  margin-bottom: -2px;
  animation: ${({selected}) => selected ? slideIn : slideOut} 300ms ease;
  transform: translateX(0%);
`;

export default ArticlesPage;