import styled, { keyframes } from "styled-components";

// 회전 애니메이션
const spin = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
  }
`;

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  border-radius: 50%;
`;

// 스피너 스타일
const Spinner = styled.div`
  width: 50px;
  height: 50px;
  border: 5px solid rgba(0, 0, 0, 0.1);
  border-top: 5px solid #ffffff;
  border-radius: 50%;
  animation: ${spin} 1s infinite ease-in-out;
`;

// 컴포넌트
export const CircularSpinner = () => {
  return (
    <Container>
      <Spinner />
    </Container>
  );
};
