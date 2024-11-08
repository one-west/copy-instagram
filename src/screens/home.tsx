import styled from "styled-components";
import InputPost from "../component/InputPost";
import Timeline from "../component/Timeline";

const Container = styled.div``;
const Title = styled.h1``;

export default () => {
  return (
    <Container>
      <InputPost />
      <Timeline />
    </Container>
  );
};
