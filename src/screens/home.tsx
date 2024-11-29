import styled from "styled-components";
import { auth } from "../firebaseConfig";

const Container = styled.div``;
const Title = styled.h1``;

export default () => {
  // Firebase Authentication API를 이용한 로그아웃
  const signOut = async () => {
    await auth.signOut();
    window.location.reload();
  };

  return (
    <Container>
      <Title>Home Page.</Title>
      <button onClick={signOut}>로그아웃</button>
    </Container>
  );
};
