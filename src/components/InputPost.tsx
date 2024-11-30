// 나의 게시글을 작성하고, 게시글을 업로드

import { useRef, useState } from "react";
import styled from "styled-components";
import { auth, firestore } from "../firebaseConfig";
import { addDoc, collection } from "firebase/firestore";
import { uploadFile } from "./uploadFile";
import LoadingScreen from "../screens/loading-screen";

const Form = styled.form`
  display: flex;
  gap: 20px;
  border: 1px solid #444;
  border-radius: 10px;
  padding: 30px 20px;
  background-color: #1a1a1a;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.5);
`;
const ProfileArea = styled.div`
  background-color: #f5f5f5;
  border-radius: 50%;
  overflow: hidden;
  width: 60px;
  height: 60px;
`;
const PostArea = styled.div`
  flex: 1;
`;
const TextArea = styled.textarea`
  resize: none;
  background-color: #2b2b2b;
  color: #e0e0e0;
  width: 98.3%;
  border: 1px solid #555;
  border-radius: 5px;
  padding: 10px;
  font-weight: normal;
  font-size: 14px;
  font-family: "Roboto", sans-serif;

  transition: border-color 0.3s ease;
  &:focus {
    outline: none;
    border-color: #1379ff;
    background-color: #222;
  }
`;
const BottomMenu = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
`;
const AttachPhotoButton = styled.label`
  padding: 8px 25px;
  background-color: #0056b3;
  color: white;
  border-radius: 8px;
  font-size: 14px;
  font-weight: bold;

  transition: background-color 0.3s ease;
  cursor: pointer;
  &:hover {
    background-color: #003d80;
  }
`;
const AttachPhotoInput = styled.input`
  display: none;
`;
const SubmitButton = styled.input`
  padding: 8px 25px;
  border-radius: 8px;
  border: none;
  background-color: #009255;
  color: white;
  font-weight: bold;
  font-size: 14px;

  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #006b3f;
  }
`;

export default () => {
  // Page Logic Process
  // TextArea Reference 참조 Hook
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  // 내가 쓴 게시글 내용 Text
  const [post, setPost] = useState<string>("");
  // 내가 업로드한 이미지 File
  const [file, setFile] = useState<File>();
  const [imageUrl, setImageUrl] = useState("");
  // 업로드 로딩
  const [loading, setLoading] = useState<boolean>(false);

  // 1. 작성한 게시글 텍스트 State에 저장
  const onChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    // 1. 작성 event에서 value(텍스트)값을 알아온다.
    const value = e.target.value;
    // 2. value 값을 state(post)에 저장한다.
    setPost(value);
    // 3. state(post)에 저장된 값을 화면에 출력한다.
    // ㄴ <TextArea/>에서 value={}과 연결

    // 4. ref 를 통해서, 자동 높이 조절
    // 4-a. ref 안에 값이 잘 들어갔는지 확인
    if (textAreaRef && textAreaRef.current) {
      // 4-b. 높이 초기화
      textAreaRef.current.style.height = "auto";
      // 4-c. 스크롤 높이만큼 Textarea 높이를 조절
      textAreaRef.current.style.height = `${textAreaRef.current.scrollHeight}px`;
    }
  };
  // 2. 업로드한 이미지를 State에 저장
  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 0. 로딩 시작
    setLoading(true);

    // 1. event에서 첨부한 이미지파일을 가져온다.
    const files = e.target.files;
    // + 방어코드 : 첨부파일이 존재하는지+첨부파일이 1개인 경우
    if (files && files.length === 1) {
      // 2. 가져온 이미지를 state(file)에 저장한다.
      const imageFile = files[0];
      const currentCommentsImg = await uploadFile("comments", imageFile);
      if (currentCommentsImg) {
        setImageUrl(currentCommentsImg); // 문자열 값만 전달
      }
    }

    // 3. 로딩 끝
    setLoading(false);
  };
  // 3. Server(Firebase)에 최종 제출
  const onSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    // 제출 시, 화면 새로 고침 방지
    e.preventDefault();
    // !!로딩 시작!!
    setLoading(true);

    try {
      // 0. Firebase의 Setting
      // 1. 제출 정보(text,photo,user)
      const user = auth.currentUser;
      // 1-b. [방어코드] : 제출정보를 기반으로 조건에 맞지 않으면 종료
      if (user === null || post === "" || loading) {
        alert("게시글 내용을 입력하고 제출을 눌러주세요");
        return;
      }
      // ---- Loading 시작 ----
      // 2. Firebase에 특정 위치에 제출
      const myPost = {
        nickname: user.displayName,
        userId: user.uid,
        email: user.email,
        createdAt: Date.now(),
        post: post,
        likes: 0,
        views: 0,
        comments: 0,
        photoUrl: imageUrl,
      };
      // 2-1.firestore DB 에 myPost 업로드
      const path = collection(firestore, "posts");
      await addDoc(path, myPost);
      // 2-2.storage 에 photo 업로드
      // -- 잠시 생략 --
    } catch (e) {
      // ---- Error 예외처리 ----
      console.warn(e);
    } finally {
      // ---- Loading 종료 ----
      setLoading(false);
    }
  };

  // Page Design Redering
  return (
    <Form onSubmit={(e) => onSubmit(e)}>
      {loading ? <LoadingScreen /> : <ProfileArea style={{ backgroundImage: `url(${imageUrl})` }} />}
      <PostArea>
        <TextArea
          ref={textAreaRef}
          rows={4}
          value={post}
          onChange={(e) => onChange(e)}
          placeholder="무슨 일이 일어났나요?"
        ></TextArea>
        <BottomMenu>
          <AttachPhotoButton htmlFor="photo">{imageUrl ? "사진 추가됨" : "사진 업로드"}</AttachPhotoButton>
          <AttachPhotoInput onChange={(e) => onChangeFile(e)} id="photo" type="file" accept="image/*" />
          <SubmitButton type="submit" value={loading ? "제출 중" : "제출하기"} />
        </BottomMenu>
      </PostArea>
    </Form>
  );
};
