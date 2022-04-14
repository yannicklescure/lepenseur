import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { COLORS, MIN_CHAR, TEXTAREA_HEIGHT } from "../../constants";
import { StoryContext } from "../../contexts/StoryContext";
import { UserContext } from "../../contexts/UserContext";
import { slugify } from "../../helpers";
import { initialStates } from "../../settings";
import Loading from "../Loading";

const Form = ({ from = undefined, article = undefined }) => {
  const textarea = useRef();
  const [scrollHeight, setScrollHeight] = useState(TEXTAREA_HEIGHT);
  const [formData, setFormData] = useState(initialStates.story);
  const [loading, setLoading] = useState(true);

  const {
    state: { status, story },
    actions: { initialStory, readyToPublish, updateStory, readyToUpdate },
  } = useContext(StoryContext);
  
  const {
    state: { user },
  } = useContext(UserContext);

  useEffect(() => {
    let data = {};
    if (article) {
      data = article;
    }
    else {
      const { content, title } = story;
      const userId = user._id;
      const slug = slugify(title);
      const timestamp = new Date().getTime();
      data = { ...story, content, title, userId, slug, timestamp };
  
    }
    setFormData(data);
    setLoading(false);
    if (data.content.length > MIN_CHAR && data.title.length > MIN_CHAR && data.imageSrc !== "undefined") {
      from === 'editStory'
        ? readyToUpdate({ story: data })
        : readyToPublish({ story: data })
    }
    else if (data.content.length > MIN_CHAR || data.title.length > MIN_CHAR) {
      updateStory({ story: data });
    }
    else {
      initialStory();
    }
  }, []);

  const handleChange = (key, value) => {
    // Set textarea height
    // https://usefulangle.com/post/41/javascript-textarea-autogrow-adjust-height-based-on-content
    // console.log(textarea.current.scrollHeight);
    setScrollHeight(textarea.current.scrollHeight);

    const data = { ...story, [key]: value };
    data.userId = user._id;
    data.slug = slugify(data.title);
    data.username = user.username;
    data.visibility = 'public';
    setFormData(data);
    
    if (data.content.length > MIN_CHAR && data.title.length > MIN_CHAR && data.imageSrc !== "undefined") {
      from === 'editStory'
        ? readyToUpdate({ story: data })
        : readyToPublish({ story: data })
    }
    else if (data.content.length > MIN_CHAR || data.title.length > MIN_CHAR) {
      updateStory({ story: data });
    }
    else {
      initialStory();
    }
  };

  if (loading) return <Loading size="32" />

  return (
    <>
      <Wrapper>
        <Title 
          id="title"
          name="title"
          value={formData.title}
          placeholder="Title" 
          onChange={(ev) => handleChange('title', ev.target.value)}
          required
          disabled={status === "sending-story-to-server"}
        />
        <Text
          ref={textarea}
          id="content"
          name="content"
          value={formData.content}
          placeholder="Tell your story..."
          onChange={(ev) => handleChange('content', ev.target.value)}
          scrollHeight={scrollHeight}
          required
          disabled={status === "sending-story-to-server"}
        />
      </Wrapper>
    </>
  );
};

const Wrapper = styled.form`
  display: flex;
  flex-direction: column;
  gap: 16px;
  margin-bottom: 16px;
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
