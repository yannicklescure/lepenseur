import { useContext, useRef, useState } from "react";
import styled from "styled-components";
import { COLORS, MIN_CHAR, TEXTAREA_HEIGHT } from "../../constants";
import { StoryContext } from "../../contexts/StoryContext";
import { UserContext } from "../../contexts/UserContext";
import { initialStates } from "../../settings";

const Form = () => {
  const textarea = useRef();
  const [scrollHeight, setScrollHeight] = useState(TEXTAREA_HEIGHT);
  const [formData, setFormData] = useState(initialStates.story);

  const {
    actions: { initialStory, readyToPublish },
  } = useContext(StoryContext);

  const {
    state: { user },
  } = useContext(UserContext);  

  const handleChange = (key, value) => {
    // Set textarea height
    // https://usefulangle.com/post/41/javascript-textarea-autogrow-adjust-height-based-on-content
    // console.log(textarea.current.scrollHeight);
    setScrollHeight(textarea.current.scrollHeight);

    const data = { ...formData, [key]: value };
    data.userId = user._id;
    console.log(data);
    setFormData(data);

    if (data.content.length > MIN_CHAR && data.title.length > MIN_CHAR) {
      readyToPublish(data);
    }
    else {
      initialStory();
    }
  };

  return (
    <>
      <Wrapper>
        <Title 
          id="title"
          name="title"
          placeholder="Title" 
          onChange={(ev) => handleChange('title', ev.target.value)} 
        />
        <Text
          ref={textarea}
          id="content"
          name="content"
          placeholder="Tell your story..."
          onChange={(ev) => handleChange('content', ev.target.value)}
          scrollHeight={scrollHeight}
        />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
`;
const Title = styled.input``;
const Text = styled.textarea`
  font-size: 16px;
  height: 34px;
  border-radius: 4px;
  padding: 8px 12px;
  border: 1px solid ${COLORS.secondary};
  outline: none;
  line-height: 1.6;
  min-height: ${TEXTAREA_HEIGHT}px;
  resize: none;
  height: ${({ scrollHeight }) => scrollHeight}px;
  overflow: hidden;
  box-sizing: border-box;
`;

export default Form;
