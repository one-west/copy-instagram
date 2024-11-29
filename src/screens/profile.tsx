// Profile page를 구성
import styled from "styled-components";
import { auth, firestore } from "../firebaseConfig";
import { collection, getDocs, orderBy, query, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { uploadFile } from "../components/uploadFile";
import LoadingScreen from "./loading-screen";

const Container = styled.div`
  display: flex;
  padding: 30px;
`;

const Profile = styled.div`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  max-width: 100%;
  padding: 50px;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const ProfileEmail = styled.h1`
  font-size: 1rem;
  font-weight: bold;
`;
const ProfileName = styled.h1`
  font-size: 1rem;
`;

const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  svg {
    width: 50px;
    height: 50px;
  }
`;
const ProfileImg = styled.img`
  background-color: #fff;
  width: 200px;
  height: 200px;
  border-radius: 50%;
  object-fit: cover; // 이미지 잘라내는 속성
  background-size: cover;
  gap: 10;
`;
const ProfileImgButton = styled.label`
  cursor: pointer;
`;
const ProfileImgInput = styled.input`
  display: none;
`;
const FollowInfo = styled.div`
  display: flex;
  gap: 50px;
  margin-top: 30px;
`;
const Posts = styled.div`
  font-size: 1rem;
`;
const Follows = styled.p`
  font-size: 1rem;
`;
const Followers = styled.p`
  font-size: 1rem;
`;

// 기본 프로필 이미지
const defaultProfileImg = "https://cdn-icons-png.flaticon.com/128/4472/4472500.png";

export default () => {
  // 1. Firebase에서 현재 로그인 유저 가져오기
  const user = auth.currentUser;
  const [postCount, setPostConunt] = useState(0);
  const [profileImg, setProfileImg] = useState(defaultProfileImg);
  const [loading, setLoading] = useState<boolean>(false);

  // 2. Firestore에서 사용자의 게시물 수 가져오기
  const fetchUserData = async () => {
    if (!user) return;
    const path = collection(firestore, "posts");
    const postsQuery = query(path, where("userId", "==", user.uid), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(postsQuery);
    setPostConunt(snapshot.size);
  };

  // 3. 업로드한 이미지를 State에 저장
  const onChangeFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    // 0. 로딩 시작
    setLoading(true);

    // 1. event에서 첨부한 이미지파일을 가져온다.
    const files = e.target.files;
    // + 방어코드 : 첨부파일이 존재하는지+첨부파일이 1개인 경우
    if (files && files.length === 1) {
      // 2. 가져온 이미지를 state(file)에 저장한다.
      const imageFile = files[0];
      const currentProfileImg = await uploadFile("profiles", imageFile);
      if (currentProfileImg) {
        setProfileImg(currentProfileImg); // 문자열 값만 전달
      }
    }

    // 3. 로딩 끝
    setLoading(false);
  };

  fetchUserData();

  const photoIcon = useCallback(() => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
      </svg>
    );
  }, []);

  return loading ? (
    <LoadingScreen />
  ) : (
    <Container>
      <Profile>
        <ImgBox>
          <ProfileImg src={profileImg} alt="Profile Image" />
          <ProfileImgButton htmlFor="photo">{photoIcon()}</ProfileImgButton>
          <ProfileImgInput type="file" onChange={(e) => onChangeFile(e)} id="photo" accept="image/*"></ProfileImgInput>
        </ImgBox>
        <UserInfo>
          <ProfileEmail>{user?.email}</ProfileEmail>
          <ProfileName>{user?.displayName}</ProfileName>
          <FollowInfo>
            <Posts>게시물: {postCount}</Posts>
            <Follows>팔로우: 3</Follows>
            <Followers>팔로워: 2</Followers>
          </FollowInfo>
        </UserInfo>
        <div>
        <h2>기능 설명 및 자기 소개</h2>
      </div>
      </Profile>
    </Container>
  );
};
