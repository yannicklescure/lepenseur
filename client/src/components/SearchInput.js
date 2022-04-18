import { useEffect, useRef, useState } from "react";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { COLORS } from "../constants";
// import { FaSearch } from "react-icons/fa";

const SearchInput = () => {
  const location = useLocation();
  const isHomepage = location.pathname === '/';
  const thisInput = useRef();
  const [clicked, setClicked] = useState();
  const [placeholder, setPlaceholder] = useState('Search');

  useEffect(() => {
    setPlaceholder(clicked ? 'Search something beautiful today' : 'Search');
  }, [clicked])

  const handleOnMouseLeave = () => {
    if (thisInput.current.value.length === 0) setClicked(false);
  };

  const handleClick = () => {
    // console.log('handleClick');
    setClicked(true);
  };

  const handleChange = () => {
    console.log(thisInput.current.value);
  };

  return (
    <Wrapper>
      <SearchBox
        onClick={handleClick}
        onChange={handleChange}
        onMouseLeave={handleOnMouseLeave}
        clicked={clicked}
        ref={thisInput}
        placeholder={placeholder}
        isHomepage={isHomepage}
      />
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;  
`;
const SearchBox = styled.input`
  width: ${({clicked}) => clicked ? '400px' : '200px'};
  border: 1px solid ${({clicked}) => clicked ? COLORS.secondary : COLORS.grey};
  color: ${({clicked}) => clicked ? COLORS.secondary : COLORS.grey};
  transition: all 400ms ease;
  background-color: ${({isHomepage}) => isHomepage ? COLORS.light : COLORS.white};

  &:hover {
    border: 1px solid ${COLORS.secondary};
  }
`;

export default SearchInput;