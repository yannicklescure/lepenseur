import { useContext, useEffect, useState } from "react";
import { FaBookmark, FaRegBookmark } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../constants";
import { UserContext } from "../contexts/UserContext";

const Bookmark = ({ article }) => {
  const navigate = useNavigate();
  const {
    state: { user },
    actions: {
      updateUser,
    }
  } = useContext(UserContext);

  const [isBookmarked, setIsBookmarked] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  useEffect(() => {
    if (user.bookmarks && user.bookmarks.includes(article._id)) setIsBookmarked(true);
  }, []);

  const handleClick = () => {
    if (user._id) {
      const shadow = user;
      if(shadow.bookmarks) {
        // console.log(shadow.bookmarks);
        if (shadow.bookmarks.includes(article._id)) {
          const pos = shadow.bookmarks.findIndex(_id => _id === article._id);
          shadow.bookmarks.splice(pos, 1);
          setIsBookmarked(false);
        }
        else {
          shadow.bookmarks.push(article._id);
          setIsBookmarked(true);
        }
      }
      else {
        shadow.bookmarks = [article._id];
        setIsBookmarked(true);
      }
      // update user db
      updateUser({ user: shadow });
      fetch(`/api/users`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(shadow),
      })
        .catch((error) => {
          console.log(error);
        });
    }
    else {
      navigate('/signup');
    }
  }

  return (
    <Wrapper 
      onClick={handleClick}
      isBookmarked={isBookmarked}
    >
      <div>
        {
          isBookmarked
          ? <FaBookmark />
          : <FaRegBookmark />
        }
      </div>
    </Wrapper>
  )
}

const Wrapper = styled.button`
  background: none;
  outline: none;
  border: none;
  padding: 0;
  font-size: 16px;
  color: ${({isBookmarked}) => isBookmarked ? COLORS.dark : COLORS.secondary};
  cursor: pointer;
  display: flex;
  align-items: center;
  gap: 8px;
  margin-bottom: -2px;
`;

export default Bookmark;