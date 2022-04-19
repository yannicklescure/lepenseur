import { useContext, useEffect, useState } from "react";
import { FaRegHeart, FaHeart } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../constants";
import { UserContext } from "../contexts/UserContext";

const Like = ({ article }) => {
  const navigate = useNavigate();
  const {
    state: { user },
    actions: {
      updateUser,
    }
  } = useContext(UserContext);

  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(0);

  useEffect(() => {
    if (user.likes && user.likes.includes(article._id)) setIsLiked(true);
    if (article.likes && article.likes > 0) setLikes(article.likes);
  }, []);

  const handleClick = () => {
    if (user._id) {
      const shadow = user;
      let likesDup = likes;
      if(shadow.likes) {
        // console.log(shadow.likes);
        if (shadow.likes.includes(article._id)) {
          const pos = shadow.likes.findIndex(_id => _id === article._id);
          shadow.likes.splice(pos, 1);
          setIsLiked(false);
          if (likes > 0) likesDup -= 1;
          else likesDup = 0;
        }
        else {
          shadow.likes.push(article._id);
          setIsLiked(true);
          likesDup += 1;
        }
      }
      else {
        shadow.likes = [article._id];
        setIsLiked(true);
        likesDup += 1;
      }
      // update user db
      updateUser({ user: shadow });
      setLikes(likesDup);
      fetch(`/api/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shadow),
      })
        .catch((error) => {
          console.log(error);
        });

      // update article db
      // console.log({ ...article, likes: likesDup });
      fetch(`/api/stories/${article.user.username}/${article.slug}?_id=${user._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...article, likes: likesDup }),
      })
        .catch((err) => {
          console.error(err);
          // errorFromServerUser({ message: "An unknown error has occurred" });
        });
    }
    else {
      navigate('/signup');
    }
  }

  return (
    <Wrapper 
      onClick={handleClick}
      isLiked={isLiked}
    >
      <div>
        {
          isLiked
          ? <FaHeart />
          : <FaRegHeart />
        }
      </div>
      <Count>
        {
          likes > 0
            ? (<>{
              likes
            } { likes === 1 ? 'like' : 'likes' }</>)
            : <></>
        }
      </Count>
    </Wrapper>
  )
}

const Wrapper = styled.button`
  background: none;
  outline: none;
  border: none;
  padding: 0;
  font-size: 16px;
  color: ${({isLiked}) => isLiked ? COLORS.danger : COLORS.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: -2px;
`;
const Count = styled.div`
  color: ${COLORS.dark};
  margin-top: -2px;
`;

export default Like;