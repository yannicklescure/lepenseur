import styled from "styled-components";
import { AiOutlineUser } from "react-icons/ai";
import { COLORS } from "../constants";

const Avatar = ({ user = undefined, open = false, size = 35 }) => {
  return (
    <>
      {
        user.imageSrc === "undefined"
        ? <Icon
            open={open}
            size={size}
          ><AiOutlineUser /></Icon>
        : <UserImage 
          open={open}
          src={user.imageSrc}
          alt={user.username}
          size={size}
        />
      }
    </>
  )
}

const UserImage = styled.img`
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  object-fit: cover;
  border-radius: 50%;
  ${({open}) => open ? `
    filter: gray; /* IE6-9 */
    -webkit-filter: grayscale(1); /* Google Chrome, Safari 6+ & Opera 15+ */
    filter: grayscale(1); /* Microsoft Edge and Firefox 35+ */
  ` : `
    -webkit-filter: grayscale(0);
    filter: none;
  `};
`;
const Icon = styled.div`
  color: ${({open}) => open ? COLORS.grey : COLORS.dark};
  font-size: ${({size}) => size * 2/3}px;
  width: ${({size}) => size}px;
  height: ${({size}) => size}px;
  padding: 4px;
  border: 1px solid ${({open}) => open ? COLORS.grey : COLORS.dark};
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
`;

export default Avatar;