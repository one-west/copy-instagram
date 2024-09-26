import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  background-color: #36b5ff;
  padding: 5px 20px;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
`;
const Title = styled.p``;
const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

export default () => {
  // 회원가입 페이지로 이동 함수
  const navi = useNavigate();
  const onClick = () => {
    navi("/signup");
  };
  return (
    <Button onClick={onClick}>
      <Icon src={`${process.env.PUBLIC_URL}/email-icon.png`} />
      <Title>이메일로 가입하기</Title>
    </Button>
  );
};
