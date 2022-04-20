import { useState } from "react";
import styled, { keyframes } from "styled-components";
import { capitalizeStr } from "../helpers";
import { COLORS } from "../constants";

const Labels = ({ data, labels, setArticles }) => {
  const [selected, setSelected] = useState("all");
  const [labelHover, setLabelHover] = useState(false);

  const handleClick = (label) => {
    if (label === "all") setArticles(data);
    else setArticles(data.filter(item => item.visibility === label));
    setSelected(label);
  }

  return (
    <Wrapper>
      {
        labels.map(label => (
          <LabelDiv 
            key={label}
            onMouseEnter={() => selected === label ? setLabelHover(true) : null}
            onMouseLeave={() => selected === label ? setLabelHover(false) : null}
            // onMouseOver={() => selected === label ? setLabelHover(!labelHover) : null}
            labelHover={labelHover}
          >
            <LabelBtn 
              onClick={() => handleClick(label)}
              selected={selected === label}
            >{capitalizeStr(label)}</LabelBtn>
            <BorderBottom 
              selected={selected === label}
              labelHover={labelHover}
            />
          </LabelDiv>
        ))
      }
    </Wrapper>
  )
}

const Wrapper = styled.div`
  display: flex;
  gap: 12px;
  margin-bottom: 16px;
  border-bottom: 1px solid ${COLORS.secondary};
`;
const LabelDiv = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  color: ${COLORS.dark};

  &:hover {
    color: ${COLORS.primary};
  }
`;
const LabelBtn = styled.button`
  font-size: 16px;
  cursor: pointer;
  background: none;
  outline: none;
  border: none;
  padding: 0;
  padding-bottom: ${({selected}) => selected ? '16px' : '16px'};
  color: inherit;
`;
const slideIn = keyframes`
  from {
    width: 0%;
    background-color: ${COLORS.primary};
  }

  to {
    width: 100%;
    background-color: ${COLORS.dark};
  }
`;
const slideOut = keyframes`
  from {
    width: 100%;
  }

  to {
    width: 0%;
  }
`;
const BorderBottom = styled.div`
  width: ${({selected}) => selected ? '100%' : '0%'};
  height: 3px;
  background-color: ${({labelHover}) => labelHover ? COLORS.primary : COLORS.dark};
  margin-bottom: -2px;
  animation: ${({selected}) => selected ? slideIn : slideOut} 300ms ease;
  transform: translateX(0%);
`;

export default Labels;