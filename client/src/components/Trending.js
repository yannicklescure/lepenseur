import { useEffect, useState } from "react";
import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../constants";
import { fullWrittenDate, shortWrittenDate } from "../helpers";
import { FaCircle, FaRegPaperPlane } from "react-icons/fa";
import Loading from "./Loading/Loading";

const Trending = () => {
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState([]);

  useEffect(() => {
    setLoading(true);
    fetch(`/api/trending`)
      .then((res) => res.json())
      .then((response) => {
        // console.log(response.data);
        setData(response.data);
        setLoading(false);
      });
    // eslint-disable-next-line
  }, []);
  
  const stopPropagation = (event) => {
    event.stopPropagation();
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
          data.map((item, index) => (
            <Container key={item._id}>
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
    </>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  margin: 16px 0 24px 0;
`;
const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
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
    background-color: ${COLORS.light};
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
  /* https://coolors.co/palette/f6bd60-f7ede2-f5cac3-84a59d-f28482 */
`;
const Indice = styled.div`
  font-size: 32px;
  font-weight: bold;
  color: ${COLORS.grey};
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
const StyledInfo = styled.div`
  display: flex;
  justify-content: flex-start;
  align-items: center;
  font-size: 14px;
  gap: 4px;
  color: ${COLORS.secondary};
  margin-top: 8px;
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

export default Trending;