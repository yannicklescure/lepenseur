import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { makeTextIntro, readingTime, shortWrittenDate } from "../../helpers";
import { FaLock, FaUserSlash } from "react-icons/fa";
import { useEffect, useRef, useState } from "react";

const Article = ({ article }) => {
  const navigate = useNavigate();
  const main = useRef();
  const [width, setWidth] = useState('100%');
  
  useEffect(() => {
    setWidth(main.current.clientWidth);
  }, []);

  useEffect(() => {
    const handleResize = () => {
      setWidth(main.current.clientWidth);   
    }

    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)    
    }
  });

  const stopPropagation = (event) => {
    event.stopPropagation();
  }

  const handleClick = (event) => {
    navigate(`/${article.username}/${article.slug}`);
  }

  // if (width === 0) return <></>

  return (
    <Main onClick={handleClick} ref={main}>
      <Wrapper>
        <Container>        
          <StyledDate>{shortWrittenDate(new Date(parseInt(article.createdAt)), 'en-US')}</StyledDate>
          { article.visibility === 'private' && <Visibility><FaLock size="12" /></Visibility> }
          { article.visibility === 'unlisted' && <Visibility><FaUserSlash size="16" /></Visibility> }
        </Container>
        <Title 
          to={`/${article.username}/${article.slug}`}
          onClick={stopPropagation}
          width={width}
        >{article.title}</Title>
        <SubWrapper>
          <ShortText width={width}>{makeTextIntro(article.content)}</ShortText>
          <InfoBar>
            { article.tags?.length > 0 && <Tag 
              to={"/tag/" + article.tags[0]}
              onClick={stopPropagation}
            >{article.tags[0]}</Tag> }
            <Reading>{readingTime(article.content)} min read</Reading>
          </InfoBar>
        </SubWrapper>
      </Wrapper>
      <StyledImage imageSrc={article.imageSrc} />
    </Main>
  )
}

const Main = styled.button`
  background: none;
  outline: none;
  border: none;
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 0 16px 0;
  margin: 0 0 16px 0;
  cursor: pointer;
  border-bottom: 1px solid ${COLORS.grey};
  width: 100%;

  &:last-child {
    border: none;
  }
`;
const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  font-size: 16px;
  min-height: 128px;
`;
const StyledDate = styled.div`
  color: ${COLORS.secondary};
  font-size: 16px;
`;
const Title = styled(NavLink)`
  text-align: left;
  text-decoration: none;
  font-size: 18px;
  color: ${COLORS.dark};
  font-weight: bold;
  margin: 8px 0;
  width: calc(${({width}) => width}px - 16px - 128px);
`;
const ShortText = styled.div`
  text-align: left;
  color: ${COLORS.secondary};
  width: calc(${({width}) => width}px - 16px - 128px);
  overflow-wrap: break-word;
`;
const Visibility = styled.div`
  font-size: 14px;
  color: ${COLORS.secondary};
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`;
const StyledImage = styled.div`
  display: block;
  width: 128px;
  height: 128px;
  /* object-fit: cover; */
  background-image: url(${({imageSrc}) => imageSrc});
  background-size: cover;
  margin-left: 16px;
`;
const SubWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: space-between;
  flex: 1;
  height: max-content;
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
const InfoBar = styled.div`
  margin-top: 16px;
  display: flex;
  align-items: center;
  gap: 12px;
`;
const Reading = styled.div`
  font-size: 14px;
  color: ${COLORS.secondary};
`;

export default Article;