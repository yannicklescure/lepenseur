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
  // https://stackoverflow.com/questions/5410066/what-are-the-default-font-sizes-in-pixels-for-the-html-heading-tags-h1-h2/70720104#70720104
  & h1 { font-size: 2em; }
  & h2 { font-size: 1.5em; }
  & h3 { font-size: 1.3em; }
  & h4 { font-size: 1em; }
  & h5 { font-size: 0.8em; }
  & h6 { font-size: 0.7em; }
  & p {
    margin-bottom: 16px;
  }
  & pre {
    padding: 16px;
    background-color: ${COLORS.code};
    margin-bottom: 16px;
    border-radius: 4px;
  }
  & code {
    font-family: 'Courier New', Courier, monospace;
  }
`;

export default Content;
