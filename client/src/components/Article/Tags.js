import { NavLink } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../../constants";

const Tags = ({ article }) => {

  if (!article.tags || article.tags?.length === 0) return <></>
  return (
    <Wrapper>
      {
        article.tags.map(tag => (
          <Tag key={tag} to={`/tag/${tag}`}>{tag}</Tag>
        ))
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
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

export default Tags;