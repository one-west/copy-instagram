import { signInWithEmailAndPassword } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebaseConfig";
import { FirebaseError } from "firebase/app";
import { useNavigate } from "react-router-dom";
import EmailSignUpButton from "../component/EmailSignUpButton";
import GoogleSignUpButton from "../component/GoogleSignUpButton";

const Container = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 30px;

  /* 반응형 그리드 개수 변경 */

  @media (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: bold;
  margin-bottom: 20px;
`;

// 로고 이미지
const LogoImg = styled.img`
  width: 100%;
  max-width: 350px;
  height: auto;
`;

// Text 입력 필드 구역
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin-top: 30px;
  gap: 10px;
`;

const Input = styled.input`
  // Text 입력 칸
  border-radius: 10px;
  border: none;
  padding: 5px 20px;
  &::placeholder {
    font-size: 10px;
  }
  &[type="submit"] {
    cursor: pointer;
  }
`;

const SubTitle = styled.p`
  // Text 입력 칸
  font-size: 10px;
`;

const SignInBtn = styled.div`
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #ffffff;
  font-size: 10px;
  font-weight: 600;
  color: black;
  display: flex;
  justify-content: center;
  cursor: pointer;
  margin-top: 20px;
`;

const ErrorMsg = styled.div`
  display: flex;
  justify-content: center;
  margin: 5px 0px;
  color: tomato;
  font-size: 11px;
  font-weight: bold;
`;

// 로그인 페이지
const Guide = styled.span`
  font-size: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  gap: 7px;

  a {
    color: #4387c2;
    margin-left: 5px;
    text-decoration: underline;
    cursor: pointer;
  }
`;

const Divider = styled.p`
  color: #afafaf;
  align-items: center;
  display: flex;
  font-size: 10px;
  margin: 10px 0px;
  &::before,
  &::after {
    content: "";
    flex: 1;
    border-bottom: 1px solid white;
    margin: 0px 5px;
  }
`;

export default () => {
  // 로그인을 위한 Process 작성
  // Hook 생성 : 페이지 이동을 위한
  const navi = useNavigate();

  // A. 입력한 회원 정보를 저장(State)
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // B. 입력한 회원 정보를 가공 / 수정
  const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    // 2. 입력한 정보(입력값, 입력위치)
    // const name = event.target.name;
    // const value = event.target.value;
    const {
      target: { name, value },
    } = event;
    // 1. 입력한 정보를 분류(닉네임, 이메일, 비번)
    switch (name) {
      // Goal : 각각 정보를 State(닉네임, 이메일, 비번) 지정
      case "email":
        setEmail(value);
        break;
      case "password":
        setPassword(value);
        break;
      default:
        break;
    }
  };

  // C. 가입버튼을 누른 경우, 입력한 회원정보를 SERVER에 전달 > 로그인 처리
  const onSubmit = async () => {
    console.log("가입하기 버튼 눌림");
    // A. 방어코드 -- ex)입력을 안한 경우
    if (loading) return;
    if (email === "" || password === "") {
      alert("회원 정보를 모두 입력해주세요");
    }
    // B. 로그인 프로세스 진행
    try {
      // b-1. 로딩 start
      setLoading(true);
      // b-2. 회원정보(닉네임, 이메일, 암호)를 모아서 서버(Firebase)에 전달(API)
      // 로그인까지 기다리기(비동기)
      const credential = await signInWithEmailAndPassword(auth, email, password);
      navi("/");
      // b-3. 로그인 완료 > 1. 로그인화면 or 2. 자동 로그인
    } catch (error) {
      // C. 예외적인 경우(Error) 중복계정, 잘못된 계정
      // c-0. 만일 Firebase 관련 Error인 경우에만
      // c-1. 에러메세지 출력
      if (error instanceof FirebaseError) {
        setError(error.code);
      }
    } finally {
      // D. 로딩 종료
      // always 에러가 나든 안나든 실행
      setLoading(false);
    }
  };

  // Page Design Rndering
  return (
    <Container>
      <LogoImg src={`${process.env.PUBLIC_URL}/DaelimX_Title.png`} />
      <Form>
        <Title>자, 이제 시작이야</Title>
        <SubTitle>이메일*</SubTitle>
        <Input name="email" onChange={onChange} type="email" placeholder="예) Daelim@email.daelim.ac.kr" />
        <SubTitle>비밀번호*</SubTitle>
        <Input name="password" onChange={onChange} type="password" placeholder="예) 6자리 이상 입력하세요" />
        <SignInBtn onClick={onSubmit}>{loading ? "로딩중..." : "가입하기"}</SignInBtn>
        {error !== "" && <ErrorMsg>{errorMsgGroups[error]}</ErrorMsg>}
        <Divider>또는</Divider>
        <Guide>
          <EmailSignUpButton />
          <GoogleSignUpButton />
        </Guide>
      </Form>
    </Container>
  );
};

interface errorMsgGroupType {
  [key: string]: string;
}

const errorMsgGroups: errorMsgGroupType = {
  "auth/email-already-in-use": "이미 존재하는 회원입니다.",
  "auth/week-password": "비밀번호를 6자리 이상 입력하세요",
  "auth/invalid-email": "잘못된 이메일입니다.",
  "auth/invalid-credential": "로그인 정보가 올바르지 않습니다.",
};
