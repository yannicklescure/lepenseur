import styled from "styled-components";
import { COLORS } from "../../constants";

const Spinner = ({size = 40}) => {
  return (
    <SpinnerBox size={size}>
      <SpinnerBlade size={size} />
      <SpinnerBlade size={size} />
      <SpinnerBlade size={size} />
      <SpinnerBlade size={size} />
      <SpinnerBlade size={size} />
      <SpinnerBlade size={size} />
      <SpinnerBlade size={size} />
      <SpinnerBlade size={size} />
    </SpinnerBox>
  )
};

const SpinnerBox = styled.div`
  position: relative;
  width: ${({size}) => size + 'px'};
  height: ${({size}) => size + 'px'};
`;

const SpinnerBlade = styled.div`
  position: absolute;
  top: ${({size}) => size/3 + 'px'};
  left: ${({size}) => size*(9/10)/2 + 'px'};
  width: ${({size}) => size/9 + 'px'};
  height: ${({size}) => size/3 + 'px'};
  border-radius: ${({size}) => size/20 + 'px'};
  background-color: ${COLORS.dark};
  animation: iSpinnerBlade 1s linear infinite;
  will-change: opacity;

  @keyframes iSpinnerBlade {
    0% {
      opacity: 0.85;
    }
    50% {
      opacity: 0.25;
    }
    100% {
      opacity: 0.25;
    }
  }

  &:nth-child(1) {
    transform: rotate(45deg) translateY(${({size}) => -size/3 + 'px'});
    animation-delay: -1.625s;
  }
  &:nth-child(2) {
    transform: rotate(90deg) translateY(${({size}) => -size/3 + 'px'});
    animation-delay: -1.5s;
  }
  &:nth-child(3) {
    transform: rotate(135deg) translateY(${({size}) => -size/3 + 'px'});
    animation-delay: -1.375s;
  }
  &:nth-child(4) {
    transform: rotate(180deg) translateY(${({size}) => -size/3 + 'px'});
    animation-delay: -1.25s;
  }
  &:nth-child(5) {
    transform: rotate(225deg) translateY(${({size}) => -size/3 + 'px'});
    animation-delay: -1.125s;
  }
  &:nth-child(6) {
    transform: rotate(270deg) translateY(${({size}) => -size/3 + 'px'});
    animation-delay: -1s;
  }
  &:nth-child(7) {
    transform: rotate(315deg) translateY(${({size}) => -size/3 + 'px'});
    animation-delay: -0.875s;
  }
  &:nth-child(8) {
    transform: rotate(360deg) translateY(${({size}) => -size/3 + 'px'});
    animation-delay: -0.75s;
  }
`;

export default Spinner;