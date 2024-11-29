import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebaseConfig";
import { FirebaseError } from "firebase/app";

const Button = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  justify-content: center;
  background-color: #ffffff;
  color: black;
  padding: 5px 20px;
  border-radius: 15px;
  font-weight: 600;
  cursor: pointer;
`;
const Title = styled.div``;
const Icon = styled.img`
  width: 20px;
  height: 20px;
`;

export default () => {
  // navigate Hook
  const navi = useNavigate();

  // Google 로그인 함수(비동기형) ..with Server(Firebase)
  const onClick = async () => {
    try {
      // 1. proviver 생성
      const provider = new GoogleAuthProvider();
      // 2. Firebase 에게 provider & 로그인 정보를 전달
      await signInWithPopup(auth, provider);
      // 3. 로그인 성공, Home 페이지로 이동
      navi("/");
    } catch (error) {
      if (error instanceof FirebaseError) {
        alert(errorMsgGroups[error.code]);
      }
    }
  };

  return (
    <Button onClick={onClick}>
      <Icon src={`${process.env.PUBLIC_URL}/google-icon.png`} />
      <Title>구글 계정으로 가입하기</Title>
    </Button>
  );

  interface errorMsgGroupType {
    [key: string]: string;
  }

  const errorMsgGroups: errorMsgGroupType = {
    "auth/popup-closed-by-user": "팝업 창 종료로 인해 로그인에 실패했습니다.",
  };
};
