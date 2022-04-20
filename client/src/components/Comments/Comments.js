import styled, { keyframes } from "styled-components";
import { COLORS } from "../../constants";
import { useContext, useEffect, useState } from "react";
import Head from "./Head";
import Form from "./Form";
import Content from "./Content";
import { CommentContext } from "../../contexts/CommentContext";

const Comments = ({ show, handleShowComments, articleId }) => {
  const [display, setDisplay] = useState(false);
  const [loading, setLoading] = useState(true);
  // const [comments, setComments] = useState([]);

  const {
    state: {
      comments
    },
    actions: {
      loadingComments,
      receivedCommentsFromServer,
      // errorCommentFromServer,
      // deleteComment,
      // updateComment,
      // initialComments,
      // sendingCommentToServer,
    },
  } = useContext(CommentContext);

  useEffect(() => {
    loadingComments();
    fetch(`/api/comments?article=${articleId}`)
      .then((res) => res.json())
      .then((response) => {
        console.log(response.data.comments);
        receivedCommentsFromServer(response.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // errorFromServerUser({ message: "An unknown error has occurred" });
      });
  }, []);

  useEffect(() => {
    if (show) {
      setDisplay(true);
    }
    else {
      setTimeout(() => setDisplay(false), 400);
    }
  }, [show]);

  return (
    <Wrapper
      show={show}
      open={display}
    >
      <Head
        show={show}
        handleShowComments={handleShowComments}
        count={comments.length}
      />
      <Form articleId={articleId} />
      <Content
        loading={loading}
        articleId={articleId}
        comments={comments}
      />
    </Wrapper>
  )
}

const slideIn = keyframes`
  from {
    right: -33vw;
  }

  to {
    right: 0;
  }
`;
const slideOut = keyframes`
  from {
    right: 0;
  }

  to {
    right: -33vw;
  }
`;
const Wrapper = styled.div`
  position: fixed;
  top: 0;
  right: ${({show}) => show ? '0' : '-33vw'};
  display: ${({open}) => open ? 'block' : 'none'};
  width: 33vw;
  height: 100vh;
  background-color: ${COLORS.white};
  padding: 16px;
  animation: ${({show}) => show ? slideIn : slideOut} 300ms ease;
  border-left: 1px solid ${COLORS.secondary};
`;

export default Comments;