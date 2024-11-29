/* eslint-disable import/no-anonymous-default-export */
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useState } from "react";
import styled from "styled-components";
import { auth } from "../firebaseConfig";
import { FirebaseError } from "firebase/app";
import { Link, useNavigate } from "react-router-dom";

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 80%;
  max-width: 400px;
  padding: 30px;
`;

const Title = styled.h1`
  font-size: 25px;
  font-weight: bold;
  margin-top: 10px;
`;

// 로고 이미지
const LogoImg = styled.img`
  width: 300px;
  height: 150px;
`;

// Text 입력 필드 구역
const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 10px;
  border: 1px solid #0000007a;
  padding: 30px;
  margin-top: 30px;
`;

const Input = styled.input`
  // Text 입력 칸
  border-radius: 10px;
  border: none;
  padding: 5px 20px;
  &::placeholder {
    font-size: 0.7rem;
  }
  &[type="submit"] {
    cursor: pointer;
  }
`;

const SubTitle = styled.p`
  // Text 입력 칸
  font-size: 1rem;
`;

const SignupBtn = styled.div`
  padding: 10px 20px;
  border-radius: 20px;
  background-color: #4387c2;
  font-size: 1rem;
  font-weight: 600;
  color: white;
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
  font-size: 0.7rem;
  font-weight: bold;
`;

// 로그인 페이지
const Guide = styled.span`
  font-size: 0.9rem;
  text-align: center;

  a {
    color: #4387c2;
    margin-left: 5px;
    text-decoration: underline;
    cursor: pointer;
  }
`;

export default () => {
  // 회원가입을 위한 Process 작성
  // Hook 생성 : 페이지 이동을 위한
  const navi = useNavigate();

  // A. 입력한 회원 정보를 저장(State)
  const [nickName, setNickName] = useState("");
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
      case "nickname":
        setNickName(value);
        break;
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

  // C. 가입버튼을 누른 경우, 입력한 회원정보를 SERVER에 전달 > 회원가입 처리
  const onSubmit = async () => {
    console.log("가입하기 버튼 눌림");
    // A. 방어코드 -- ex)입력을 안한 경우
    if (loading) return;
    if (nickName === "" || email === "" || password === "") {
      alert("회원 정보를 모두 입력해주세요");
    }
    // B. 회원가입 프로세스 진행
    try {
      // b-1. 로딩 start
      setLoading(true);
      // b-2. 회원정보(닉네임, 이메일, 암호)를 모아서 서버(Firebase)에 전달(API)
      // 가입완료까지 기다리기(비동기)
      const credential = await createUserWithEmailAndPassword(auth, email, password);
      await updateProfile(credential.user, {
        displayName: nickName, // displayName: firebase user profile에 저장할 name
      });
      navi("/");
      // b-3. 서버에서 가입 진행
      // b-4. 가입완료 > 1. 로그인화면 or 2. 자동 로그인
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
      <LogoImg src={`${process.env.PUBLIC_URL}/instagram.png`} />
      <Title>Copy-Instagram</Title>
      <Form>
        <SubTitle>이름*</SubTitle>
        <Input name="nickname" onChange={onChange} type="text" placeholder="예) Daelim" />
        <SubTitle>이메일*</SubTitle>
        <Input name="email" onChange={onChange} type="email" placeholder="예) Daelim@email.daelim.ac.kr" />
        <SubTitle>비밀번호*</SubTitle>
        <Input name="password" onChange={onChange} type="password" placeholder="예) 6자리 이상 입력하세요" />
        <SignupBtn onClick={onSubmit}>{loading ? "로딩중..." : "가입하기"}</SignupBtn>
        <ErrorMsg>{errorMsgGroups[error]}</ErrorMsg>
        <Guide>
          계정이 이미 있으신가요?
          <Link to={"/signin"}>로그인</Link>
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
};
