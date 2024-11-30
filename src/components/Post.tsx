// 불러온 게시글을 화면에 예쁘게 보여줍니다.
// - 불러온 게시글 정보(property)를 받아와야합니다.
// - 불러온 게시글 정보(property)가 어떤 타입인지 알아야합니다.
import styled from "styled-components";
import { IPost } from "../types/post-type";
import { auth, firestore } from "../firebaseConfig";
import Item from "./Post-ItemMenu";
import { deleteDoc, doc } from "firebase/firestore";
import moment from "moment";
import { fetchProfileImage } from "./uploadFile";
import { useEffect, useState } from "react";

const Container = styled.div`
  border: 1px solid #353535;
  padding: 10px 15px;
  margin: 15px 0px;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 5px;
`;
const ProfileArea = styled.div``;
const ProfileImg = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  background-color: white;
  margin-right: 5px;
`;
const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
  width: 100%;
`;
const UserInfo = styled.div`
  display: flex;
  gap: 5px;
  align-items: flex-end;
`;
const UserEmail = styled.div`
  font-size: 11px;
  color: #52adf8;
`;
const UserName = styled.div`
  font-weight: 700;
  font-size: 13px;
`;
const PostText = styled.div`
  font-size: 15px;
`;
const PostImage = styled.img`
  max-width: 400px;
  height: auto;
`;
const CreateTime = styled.div`
  font-size: 10px;
  color: #575757;
`;

const Footer = styled.div`
  display: flex;
  gap: 8px;
  margin: 10px 0px;
`;

const Topbar = styled.div`
  display: flex;
  justify-content: space-between;
`;
const DeleteBtn = styled.span`
  cursor: pointer;

  svg {
    width: 18px;
  }
`;

// 기본 프로필 이미지
const defaultProfileImg = "https://cdn-icons-png.flaticon.com/128/4472/4472500.png";

export default ({ id, userId, createdAt, nickname, post, photoUrl, views, likes, comments }: IPost) => {
  // Logic
  const user = auth.currentUser;
  const [profileImg, setProfileImg] = useState<string | null>(null);

  // Firebase로부터 해당 유저의 정보 가져오기
  useEffect(() => {
    fetchProfileImage(userId).then((url) => {
      if (user) {
        setProfileImg(url);
      }
    });
  }, []);

  const onDelete = async () => {
    const isOK = window.confirm("삭제하시겠습니까?");

    if (isOK) {
      // Firebase로부터 해당 게시글 삭제
      // 1. 내가 작성한 게시글인가? (로그인유저ID, 게시글작성자ID)
      // ㄴ1-a. s내가 작성 X => 삭제하면 안됨
      if (!user) return;
      if (user.uid !== userId) {
        return;
      }
      // 2. 특정 게시글 ID를 통해 Firebase에서 doc 삭제
      // 2-1. 특정 ID값을
      const removeDoc = await doc(firestore, "posts", id);
      await deleteDoc(removeDoc);
    }
  };

  const icon = () => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="size-6"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
        />
      </svg>
    );
  };

  // Page Design
  return (
    <Container>
      <Wrapper>
        <ProfileArea>
          <ProfileImg src={profileImg || defaultProfileImg} />
        </ProfileArea>
        <Content>
          <Topbar>
            <UserInfo>
              <UserName>{nickname}</UserName>
              {auth.currentUser && <UserEmail>{auth.currentUser.email}</UserEmail>}
            </UserInfo>
            {/* 내가 작성한 게시글에서만 삭제버튼 나타내기 */}
            {user?.uid === userId ? <DeleteBtn onClick={onDelete}>{icon()}</DeleteBtn> : null}
          </Topbar>
          <PostText>{post}</PostText>
          {photoUrl && <PostImage src={photoUrl} alt="uploadImage" />}
          <CreateTime>{moment(createdAt).fromNow()}</CreateTime>
        </Content>
      </Wrapper>
      <Footer>
        <Item type="view" num={views} id={id} />
        <Item type="like" num={likes} id={id} />
        <Item type="comment" num={comments} id={id} />
      </Footer>
    </Container>
  );
};
