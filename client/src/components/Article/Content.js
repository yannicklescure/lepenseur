import ReactMarkdown from "react-markdown";
import styled from "styled-components";
import { COLORS } from "../../constants";

const Content = ({ article }) => {
  return (
    <Wrapper>
      <Markdown>{article.content}</Markdown>
    </Wrapper>
  );
};

const Wrapper = styled.div`
  line-height: 1.6;
`;
const Markdown = styled(ReactMarkdown)`
  & p {
    margin-bottom: 16px;
  }
  & pre {
    padding: 16px;
    background-color: ${COLORS.code};
    margin-bottom: 16px;
    border-radius: 4px;

    & code {
      font-family: 'Courier New', Courier, monospace;
    }
  }
`;

export default Content;
