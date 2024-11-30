// Profile page를 구성
import styled from "styled-components";
import { auth, firestore } from "../firebaseConfig";
import { collection, doc, getDoc, getDocs, orderBy, query, setDoc, where } from "firebase/firestore";
import { useCallback, useEffect, useState } from "react";
import { fetchProfileImage, uploadFile } from "../components/uploadFile";
import { CircularSpinner } from "./loding-spiner";

const Container = styled.div`
  display: flex;
  padding: 30px;
`;

const Profile = styled.div`
  display: grid;
  grid-template-columns: 1fr 2fr;
  gap: 20px;
  width: 100%;
  max-width: 1000px;
  border: 1px solid #747474;
  border-radius: 10px;
  padding: 20px;
`;
const UserInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  justify-content: center;
`;
const ProfileEmail = styled.h1`
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 10px;
`;
const ProfileName = styled.h1`
    font-size: 1.2rem;
    color: #c5c5c5;
`;

const ImgBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  svg {
    width: 50px;
    height: 50px;
  }
`;
const ProfileImg = styled.img`
  background-color: #fff;
  width: 250px;
  height: 250px;
  border-radius: 50%;
  object-fit: cover;
  margin-bottom: 10px;
  border: 3px solid #ddd;
`;
const ProfileImgButton = styled.label`
  cursor: pointer;
  color: #007bff;
  margin-top: 10px;
`;
const ProfileImgInput = styled.input`
  display: none;
`;
const FollowInfo = styled.div`
  display: flex;
  gap: 50px;
  margin-top: 30px;

  a {
    color: inherit;
  }
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
const Description = styled.div`
  border: 1px solid #404040;
  max-width: 32vw;
  padding: 20px;
  border-radius: 5px;
  margin-top: 10px;

  p {
    margin-bottom: 20px;
    line-height: 30px;
  }
`;
const DescTitle = styled.h2`
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 30px;
`;

// 기본 프로필 이미지
const defaultProfileImg = "https://cdn-icons-png.flaticon.com/128/4472/4472500.png";

export default () => {
  // 1. Firebase에서 현재 로그인 유저 가져오기
  const user = auth.currentUser;
  const [postCount, setPostConunt] = useState(0);
  const [profileImg, setProfileImg] = useState<string>(defaultProfileImg);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (user) {
      fetchProfileImage(user.uid).then((url) => {
        if (url) {
          setProfileImg(url);
          setLoading(false);
        }
      });
    }
  }, [user]);

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
      // 2. 가져온 이미지를 firebase Storage에 저장
      const imageFile = files[0];
      const currentProfileImg = await uploadFile("profiles", imageFile);
      if (currentProfileImg && user) {
        setProfileImg(currentProfileImg); // 문자열 값만 전달
        saveProfileImage(user.uid, currentProfileImg);
      }
    }

    // 3. 로딩 끝
    setLoading(false);
  };

  // 4. Firestore에 사용자의 프로필 사진 정보 저장하기
  const saveProfileImage = async (userId: string, imageUrl: string) => {
    try {
      const userDoc = doc(firestore, "users", userId); // "users" 컬렉션에 저장
      await setDoc(userDoc, { profileImage: imageUrl }, { merge: true });
      console.log("Profile image saved!");
    } catch (error) {
      console.error("Error saving profile image:", error);
    }
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

  return (
    <Container>
      <Profile>
        <ImgBox>
          {loading ? <CircularSpinner /> : <ProfileImg src={profileImg} alt="Profile Image" />}
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
          <FollowInfo>
            <p>★ Phone. 010-9928-2667 </p>
            <p>
              ★ GitHub. <a href="https://github.com/one-west">https://github.com/one-west</a>
            </p>
          </FollowInfo>
        </UserInfo>
        <Description>
          <DescTitle>기능 설명</DescTitle>
          <p>- 게시물 작성 (텍스트, 파일)</p>
          <p>- 회원 가입 및 로그인/로그아웃</p>
          <p>- 프로필 이미지 변경 및 저장</p>
        </Description>
        <Description>
          <DescTitle>자기 소개</DescTitle>
          <p>- 신입 개발자 정한서입니다. 주로 웹 개발을 공부했습니다.</p>
          <p>- 꾸준함이 가장 큰 힘이라 생각하기에 학습한 것을 Github에 남기고 있습니다.</p>
          <p>- 프로젝트 시 주어진 상황에 맞게 다양한 역할을 소화할 수 있습니다.</p>
        </Description>
      </Profile>
    </Container>
  );
};
