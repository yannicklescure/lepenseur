import styled from "styled-components";
import { COLORS } from "../../constants";
import { useContext, useEffect, useState } from "react";
import { StoryContext } from "../../contexts/StoryContext";
import { UserContext } from "../../contexts/UserContext";
import { useNavigate } from "react-router-dom";
import Loading from "../Loading";

const UpdateStory = () => {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const {
    state: { status, story },
    actions: { initialStory, sendingStoryToServer }
  } = useContext(StoryContext);

  const {
    state: { user },
  } = useContext(UserContext);

  useEffect(() => {
    if (status === "ready-to-update") setReady(true);
    else setReady(false);
  }, [status]);

  const handleUpdateStory = () => {
    console.log(story);
    setReady(false);
    sendingStoryToServer();
    setLoading(true);
    fetch(`/api/stories/${user.username}/${story.slug}?_id=${user._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(story),
    })
      .then((res) => res.json())
      .then((json) => {
        console.log(json);
        if (json.status === 200) {
          initialStory();
          // receivedUserFromServer({ user: json.data });
          // Go to new story page
          navigate(`/${user.username}/${story.slug}`);
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

  return (
    <UpdateBtn 
      ready={ready}
      disabled={!ready}
      onClick={handleUpdateStory}
    >
      {
        loading 
        ? <Loading size="16" />
        : <>Update</>
      }
    </UpdateBtn>
  )
}

const UpdateBtn = styled.button`
  border: none;
  outline: none;
  background-color: ${({ready}) => ready ? 'RGB(18, 111, 252)' : 'RGBA(18, 111, 252, 80%)'};
  padding: 8px 20px;
  color: ${({ready}) => ready ? COLORS.light : COLORS.grey};
  font-size: 16px;
  border-radius: 18px;
  cursor: ${({ready}) => ready ? 'pointer' : 'not-allowed'};
  width: 90px;
  height: 36px;
`;

export default UpdateStory;