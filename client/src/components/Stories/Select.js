import { useContext } from "react";
import styled from "styled-components";
import { COLORS, MIN_CHAR } from "../../constants";
import { StoryContext } from "../../contexts/StoryContext";
import { capitalizeStr } from "../../helpers";

const Select = ({ from = undefined, article = undefined }) => {
  const {
    state: { story },
    actions: { initialStory, readyToPublish, updateStory, readyToUpdate },
  } = useContext(StoryContext);

  const handleChange = (event) => {
    // console.log(event.target.value);
    const data = { ...story, visibility: event.target.value.toLowerCase() };
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
  }

  const options = [
    {
      label: 'Public',
      value: 'public'
    },
    {
      label: 'Private',
      value: 'private'
    },
    {
      label: 'Unlisted',
      value: 'unlisted'
    },
  ];

  return (
    <Wrapper>
      <div>Visibility</div>
      <StyledSelect 
        onChange={handleChange}
        value={capitalizeStr(story.visibility)}
      >
        {options.map((option) => (
          <StyledOption 
          key={option.value}
          option={option.value}
          >{option.label}</StyledOption>
        ))}
      </StyledSelect>
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: center;
  font-weight: bold;
  gap: 12px;
`;
const StyledSelect = styled.select`
  padding: 2px 4px;
  font-size: 16px;
  border: 1px solid ${COLORS.grey};
  border-radius: 4px;
  background-color: ${COLORS.light};
  outline: none;
`;
const StyledOption = styled.option`
`;

export default Select;