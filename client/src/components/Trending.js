import { useContext, useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../constants";
import { fullWrittenDate, shortWrittenDate } from "../helpers";
import { FaCircle, FaRegPaperPlane, FaHashtag } from "react-icons/fa";
import Loading from "./Loading/Loading";
import { TrendingContext } from "../contexts/TrendingContext";

const Trending = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [tags, setTags] = useState([]);

  const {
    state: { status, trending },
    actions: {
      loadingTrending,
      receivedTrendingFromServer,
      errorTrendingFromServer,
    },
  } = useContext(TrendingContext);

  useEffect(() => {
    if (status === 'init-trending') setLoading(true);
    loadingTrending();
    try {
      fetch(`/api/trending`)
        .then((res) => res.json())
        .then((response) => {
          // console.log(response.data);
          receivedTrendingFromServer({ trending: response.data });
          setLoading(false);
          const cleanTags = [];
          response.data.forEach(item => {
            // console.log(item);
            if (item.tags) {
              item.tags.forEach(tag => {
                if (!cleanTags.includes(tag)) cleanTags.push(tag);
              });
            }
          });
          setTags(cleanTags);
        });
    }
    catch (err) {
      errorTrendingFromServer({ message: err });
    }
    // eslint-disable-next-line
  }, []);
  
  const stopPropagation = (event) => {
    event.stopPropagation();
  }

  const handleClick = (item) => {
    navigate(`/${item.username}/${item.slug}`);
  }


  if (loading) return <Loading size="32" />;

  return (
    <>
      <Title>
        <div><FaRegPaperPlane /></div>
        <div>Trending on {fullWrittenDate(new Date().getTime(), 'en-US')}</div>
      </Title>
      <Wrapper>
        {
          trending.map((item, index) => (
            <Container 
              key={item._id}
              onClick={() => handleClick(item)}
            >
              <Indice>0{index + 1}.</Indice>
              <SubWrapper>
                <StyledLink 
                  to={`/${item.username}/${item.slug}`}
                  onClick={stopPropagation}
                >{ item.title }</StyledLink>
                <StyledInfo>
                  <div>{shortWrittenDate(item.createdAt)}</div>
                  <Circle><FaCircle /></Circle>
                  <div>{item.readingTime} min read</div>
                </StyledInfo>
              </SubWrapper>
            </Container>
          ))
        }
      </Wrapper>
      <Tags>
        <FaHashtag />
        {
          tags.map(tag => (
            <Tag 
              key={tag}
              to={"/tag/" + tag}
              // onClick={stopPropagation}
            >{tag}</Tag>
          ))
        }
      </Tags>
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 16px 0 24px 0;
`;
const Tags = styled.div`
  display: flex;
  /* justify-content: center; */
  align-items: center;
  flex-wrap: wrap;
  gap: 12px;
`;
const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
const Indice = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: ${COLORS.grey};
`;
const StyledInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  gap: 4px;
  color: ${COLORS.secondary};
  margin-top: 8px;
`;
const StyledLink = styled(NavLink)`
  font-size: 16px;
  color: ${COLORS.dark};
  text-decoration: none;
  margin-top: 3px;

  &:hover {
    color: ${COLORS.black};
  }
`;
const Container = styled.button`
  display: flex;
  width: 50%;
  gap: 16px;
  padding: 16px;
  align-items: flex-start;
  background: none;
  outline: none;
  border: none;
  border-radius: 4px;
  text-align: left;
  cursor: pointer;

  &:first-child:hover {
    background-color: #90e0ef;
  }
  &:nth-child(2):hover {
    background-color: #F6BD60;
  }
  &:nth-child(3):hover {
    background-color: #F7EDE2;
  }
  &:nth-child(4):hover {
    background-color: #F5CAC3;
  }
  &:nth-child(5):hover {
    background-color: #84A59D;
  }
  &:nth-child(6):hover {
    background-color: #F28482;
  }

  &:hover ${StyledLink} { color: ${COLORS.black}; }
  &:hover ${Indice} { color: ${COLORS.secondary}; }
  &:hover ${StyledInfo} { color: ${COLORS.dark}; }

  /* https://coolors.co/palette/f6bd60-f7ede2-f5cac3-84a59d-f28482 */
`;
const Circle = styled.div`
  font-size: 3px;
`;
const Title = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
  font-size: 16px;
  font-weight: bold;
  margin-top: 32px;
`;
const Tag = styled(NavLink)`
  text-decoration: none;
  font-size: 14px;
  color: ${COLORS.secondary};
  padding: 4px 10px;
  border-radius: 12px;
  background-color: ${COLORS.tag};

  &:hover {
    color: ${COLORS.dark};
    background-color: ${COLORS.grey};
  }
`;

export default Trending;