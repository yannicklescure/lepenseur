import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS, MIN_CHAR } from "../../constants";
import { StoryContext } from "../../contexts/StoryContext";
import { capitalizeStr } from "../../helpers";
import Loading from "../Loading";

const Select = ({ from = undefined, article = undefined }) => {
  const navigate = useNavigate();
  const [showDeleteBtns, setShowDeleteBtns] = useState(false);
  const [loading, setLoading] = useState(false);

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

  const handleClick = () => {
    setShowDeleteBtns(!showDeleteBtns);
  }

  const handleDelete = () => {
    setLoading(true);
    fetch(`/api/stories/${article.user.username}/${article.slug}?_id=${article.user._id}&delete=true`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(article),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.status === 200) {
          initialStory();
          // receivedUserFromServer({ user: json.data });
          // Go to new story page
          navigate(`/${article.user.username}/articles`);
        }
        else {
          // setErrorMessage(json.message);
          // setValid(false);
          // setDisabled(true);
          // logoutUser();
        }
      })
      .catch((err) => {
        console.error(err);
        // errorFromServerUser({ message: "An unknown error has occurred" });
      });
  }

  if (loading) return <Loading size="32" />

  return (
    <Wrapper>
      <Question show={showDeleteBtns}>
        <ReqDiv>Are you sure ?</ReqDiv>
        <YesDiv onClick={handleDelete}>Yes</YesDiv>
        <NoDiv onClick={handleClick}>No</NoDiv>
      </Question>
      <Trash
        onClick={handleClick}
        show={showDeleteBtns}
      >Delete article</Trash>
      <Container>
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
      </Container>
    </Wrapper>
  )
}

const Question = styled.div`
  display: ${({show}) => show ? 'flex' : 'none'};
  align-items: center;
  gap: 12px;
`;
const ReqDiv = styled.div`
  font-size: 16px;
`;
const YesDiv = styled.button`
  background-color: ${COLORS.success};
  outline: none;
  padding: 4px;
  width: 48px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  color: ${COLORS.light};
  cursor: pointer;
`;
const NoDiv = styled.button`
  background-color: ${COLORS.danger};
  outline: none;
  padding: 4px;
  width: 48px;
  border: none;
  border-radius: 4px;
  font-size: 16px;
  color: ${COLORS.light};
  cursor: pointer;
`;
const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const Container = styled.div`
  display: flex;
  align-items: center;
  font-weight: bold;
  gap: 12px;
`;
const Trash = styled.button`
  display: ${({show}) => show ? 'none' : 'flex'};
  background: none;
  outline: none;
  padding: 0;
  border: none;
  font-size: 16px;
  color: ${COLORS.danger};
  cursor: pointer;
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