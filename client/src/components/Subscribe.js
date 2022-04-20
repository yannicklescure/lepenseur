import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../constants";
import { UserContext } from "../contexts/UserContext";
import Loading from "./Loading";

const Subscribe = ({ writer }) => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [isFollowing, setIsFollowing] = useState(false);

  const {
    state: { user },
    actions: { updateUser }
  } = useContext(UserContext);

  const handleFollow = (following) => {
    console.log(following);
    if (following.length > 0) {
      const pos = following.findIndex(el => el.username === writer.username);
      if (pos !== -1) setIsFollowing(true);
      else setIsFollowing(false);
    }
  }

  useEffect(() => {
    handleFollow(user.following);
  }, []);

  const handleClick = () => {
    if (user._id) {
      // console.log('click');
      setLoading(true);
  
      const { firstName, lastName, username } = writer;
  
      const formData = {
        userId: user._id,
        writer: {
          firstName,
          lastName,
          username,
        }
      }
  
      fetch(`/api/subscribe`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((res) => res.json())
        .then((json) => {
          // console.log(json);
          const shadow = user;
          shadow.following = json.data.following;
          updateUser(shadow);
          handleFollow(shadow.following);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          // errorFromServerUser({ message: "An unknown error has occurred" });
        });
    }
    else {
      // console.log('click');
      navigate('/signup');
    }
  }

  return (
    <Wrapper
      onClick={handleClick}
      disabled={loading}
      isFollowing={isFollowing}
    >
      {
        loading
          ? <Loading size="16" />
          : isFollowing
          ? <>Subscribed</>
          : <>Subscribe</>
      }
    </Wrapper>
  )
}

const Wrapper = styled.button`
  background-color: ${({isFollowing}) => isFollowing ? COLORS.primary : COLORS.danger};
  outline: none;
  padding: 8px 20px;
  border-radius: 18px;
  width: 120px;
  height: 36px;
  border: none;
  cursor: pointer;
  font-size: 16px;
  color: ${COLORS.light};
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${COLORS.white};
  }
`;

export default Subscribe;