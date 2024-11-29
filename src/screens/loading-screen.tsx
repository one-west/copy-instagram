import styled, { keyframes } from "styled-components";

const Container = styled.div`
  height: 100vh;
  background-color: white;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
`;

// animation
const BouncdAnim = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`;
// dot
const Dot = styled.div`
  width: 20px;
  height: 20px;
  background-color: gray;
  border-radius: 50%;
  margin: 0px 10px;
  animation: ${BouncdAnim} 1s infinite ease-in-out;
  &:nth-child(1) {
    animation-delay: 0s;
  }
  &:nth-child(2) {
    animation-delay: 0.25s;
  }
  &:nth-child(3) {
    animation-delay: 0.5s;
  }
`;
export default function LoadingScreen() {
  return (
    <Container>
      <Dot />
      <Dot />
      <Dot />
    </Container>
  );
}
