import { useContext, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { COLORS, MIN_CHAR } from "../../constants";
import { StoryContext } from "../../contexts/StoryContext";
import { UserContext } from "../../contexts/UserContext";
import { initialStates } from "../../settings";

const Tags = ({ from = undefined, article = undefined }) => {
  const [tags, setTags] = useState(initialStates.story.tags);

  const {
    state: { status, story },
    actions: { initialStory, readyToPublish, updateStory, readyToUpdate },
  } = useContext(StoryContext);
  
  const {
    state: { user },
  } = useContext(UserContext);

  useEffect(() => {
    // console.log(Array.isArray(story.tags));
    // console.log(story.tags);
    if (Array.isArray(story.tags) && story.tags?.length > 0) {
      setTags(story.tags.join(', '));
      // console.log(story.tags.join(', '));
    }
  }, [story]);

  const handleChange = (key, value) => {
    const data = { ...story, [key]: value };
    setTags(value);
    // console.log(data);
    
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

  return (
    <>
      <Input
        name="tags"
        value={tags}
        placeholder="Add tags name separeted by coma" 
        onChange={(ev) => handleChange('tags', ev.target.value)}
        disabled={status === "sending-story-to-server"}
      />
    </>
  )
}

const Input = styled.input`
  border: 1px solid ${COLORS.grey};
  background-color: ${COLORS.light};
`;

export default Tags;