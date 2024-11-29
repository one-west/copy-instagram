// home page를 구성
import styled from "styled-components";
import { auth } from "../firebaseConfig";
import InputPost from "../components/InputPost";
import Timeline from "../components/Timeline";

const Container = styled.div`
  width: 1400px;
`;
const Title = styled.h1``;

export default () => {
  return (
    <Container>
      {/* 게시글 작성 Server Upload */}
      <InputPost />
      {/* 작성된 게시글을 Server Download */}
      <Timeline />
    </Container>
  );
};
