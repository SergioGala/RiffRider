import React from 'react';
import styled, { keyframes } from 'styled-components';

const glitch = keyframes`
  0% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  14% {
    text-shadow: 0.05em 0 0 rgba(255, 0, 0, 0.75),
                -0.05em -0.025em 0 rgba(0, 255, 0, 0.75),
                -0.025em 0.05em 0 rgba(0, 0, 255, 0.75);
  }
  15% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                 0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                 -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  49% {
    text-shadow: -0.05em -0.025em 0 rgba(255, 0, 0, 0.75),
                 0.025em 0.025em 0 rgba(0, 255, 0, 0.75),
                 -0.05em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  50% {
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                 0.05em 0 0 rgba(0, 255, 0, 0.75),
                 0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  99% {
    text-shadow: 0.025em 0.05em 0 rgba(255, 0, 0, 0.75),
                 0.05em 0 0 rgba(0, 255, 0, 0.75),
                 0 -0.05em 0 rgba(0, 0, 255, 0.75);
  }
  100% {
    text-shadow: -0.025em 0 0 rgba(255, 0, 0, 0.75),
                -0.025em -0.025em 0 rgba(0, 255, 0, 0.75),
                -0.025em -0.05em 0 rgba(0, 0, 255, 0.75);
  }
`;

const skew = keyframes`
  0% {
    transform: skew(0deg);
  }
  5% {
    transform: skew(5deg);
  }
  10% {
    transform: skew(-5deg);
  }
  15% {
    transform: skew(0deg);
  }
  100% {
    transform: skew(0deg);
  }
`;

const GlitchWrapper = styled.div`
  position: relative;
  font-size: 4em;
  font-weight: bold;
  text-transform: uppercase;
  color: ${props => props.theme.primary};
  letter-spacing: 0.1em;
  animation: ${skew} 2s infinite;
  transform: skew(0deg);
  
  &::before,
  &::after {
    content: attr(data-text);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    animation: ${glitch} 2s infinite;
  }

  &::before {
    left: 2px;
    text-shadow: -2px 0 ${props => props.theme.secondary};
    clip: rect(24px, 550px, 90px, 0);
  }

  &::after {
    left: -2px;
    text-shadow: -2px 0 ${props => props.theme.primary};
    clip: rect(85px, 550px, 140px, 0);
    animation-delay: 1s;
  }
`;

const GlitchText = ({ text }) => {
  return (
    <GlitchWrapper data-text={text}>
      {text}
    </GlitchWrapper>
  );
};

export default GlitchText;