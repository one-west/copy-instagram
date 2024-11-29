import { useNavigate } from "react-router-dom";
import styled from "styled-components";

const Button = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  background-color: #1f92f7;
  padding: 10px 10px;
  border-radius: 10px;
  font-weight: 600;
  cursor: pointer;
`;
const Title = styled.p`
  font-size: 0.7rem;
`;
const Icon = styled.img`
  width: 15px;
  height: 15px;
`;

export default () => {
  // navigate Hook
  const navigation = useNavigate();

  // 회원가입 페이지로 이동하는 함수
  const onClick = () => {
    navigation("/signup");
  };

  return (
    <Button onClick={onClick}>
      <Icon src={`${process.env.PUBLIC_URL}/email-icon.png`} />
      <Title>이메일로 가입하기</Title>
    </Button>
  );
};
