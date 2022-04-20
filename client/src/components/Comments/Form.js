import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { COLORS } from "../../constants";
import { CommentContext } from "../../contexts/CommentContext";
import { UserContext } from "../../contexts/UserContext";
import { initialStates } from "../../settings";
import Loading from "../Loading";


const Form = ({ articleId }) => {
  const textarea = useRef();
  const [scrollHeight, setScrollHeight] = useState('150px');
  const [formData, setFormData] = useState(initialStates.comment);
  const [loading, setLoading] = useState(false);

  const {
    state: { user },
  } = useContext(UserContext);

  const {
    actions: {
      updateComment,
    },
  } = useContext(CommentContext);

  const handleChange = (event) => {
    // Set textarea height
    // https://usefulangle.com/post/41/javascript-textarea-autogrow-adjust-height-based-on-content
    // console.log(textarea.current.scrollHeight);
    setScrollHeight(textarea.current.scrollHeight);
    const { _id, username, firstName, lastName } = user;
    const data = {
      articleId,
      comment: {
        userId: _id,
        username,
        firstName,
        lastName,
        content: event.target.value,
        createdAt: new Date().getTime(),
      },
    };
    ;
    // console.log(data);
    setFormData(data);
  };

  const handleClick = () => {
    console.log(formData);
    setLoading(true);

    fetch(`/api/comments`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(formData),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        setFormData(initialStates.comment);
        updateComment(json.data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        // errorFromServerUser({ message: "An unknown error has occurred" });
      });
  }

  return (
    <Wrapper>
      <Textarea 
        ref={textarea}
        value={formData.comment.content}
        onChange={handleChange}
        scrollHeight={scrollHeight}
        disabled={loading}
      />
      <CommentBtn
        onClick={handleClick}
        disabled={loading}
      >
        {
          loading
            ? <Loading size="16" />
            : <>Comment</>
        }
      </CommentBtn>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  padding: 16px 0;
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  flex-direction: column;
  border-bottom: 1px solid ${COLORS.secondary};
`;
const Textarea = styled.textarea`
  font-size: 16px;
  height: 34px;
  border-radius: 4px;
  padding: 8px 12px;
  border: 1px solid ${COLORS.grey};
  outline: none;
  line-height: 1.6;
  min-height: 150px;
  width: 100%;
  resize: none;
  height: ${({ scrollHeight }) => scrollHeight}px;
  overflow: hidden;
  box-sizing: border-box;
  background-color: ${COLORS.light};
`;
const CommentBtn = styled.button`
  width: fit-content;
  background-color: ${({disabled}) => disabled ? 'rgba(18, 111, 252, 80%)' : COLORS.primary};
  outline: none;
  padding: 12px 24px;
  border: none;
  font-size: 16px;
  border-radius: 4px;
  margin-top: 16px;
  color: ${COLORS.light};
  cursor: ${({disabled}) => disabled ? 'not-allowed' : 'pointer'};
  width: 118px;
  height: 45px;
`;

export default Form;