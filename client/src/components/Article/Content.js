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
  & h1, h2, h3, h4, h5, h6 {
    margin: 16px 0;
  }
  & p {
    margin-bottom: 16px;
  }
  & pre {
    padding: 16px;
    background-color: ${COLORS.code};
    margin-bottom: 16px;
    border-radius: 4px;
    /*
      https://stackoverflow.com/questions/248011/how-do-i-wrap-text-in-a-pre-tag
      https://css-tricks.com/snippets/css/make-pre-text-wrap/
    */
    white-space: pre-wrap;       /* css-3 */
    white-space: -moz-pre-wrap;  /* Mozilla, since 1999 */
    white-space: -pre-wrap;      /* Opera 4-6 */
    white-space: -o-pre-wrap;    /* Opera 7 */
    word-wrap: break-word;       /* Internet Explorer 5.5+ */
  }
  & code {
    font-family: 'Courier New', Courier, monospace;
    overflow-wrap: break-word;
  }
`;

export default Content;
