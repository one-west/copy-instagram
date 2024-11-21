// 불러온 게시글을 화면에 예쁘게 보여줍니다.
// - 불러온 게시글 정보(property)를 받아와야함

import styled from "styled-components";
import { TPost } from "../types/post.type";
import { auth } from "../firebaseConfig";
import moment from "moment";
import Item from "./Post-ItemMenu";
// import "moment/locale/ko";

const Container = styled.div`
  border: 1px solid #333333;
  padding: 10px 15px;
`;
const Wrapper = styled.div`
  display: flex;
  gap: 15px;
`;
const ProfileArea = styled.div``;
const ProfileImg = styled.img`
  width: 30px;
  height: 30px;
  background-color: tomato;
  border-radius: 50%;
  border: none;
`;
const Content = styled.div`
  display: flex;
  gap: 5px;
  flex-direction: column;
  width: 100%;
`;
const UserInfo = styled.div`
  display: flex;
  gap: 5px;
`;
const UserName = styled.div`
  font-size: 13px;
  font-weight: 700;
`;
const UserEmail = styled.div`
  font-size: 15px;
  color: #639aff;
`;
const PostText = styled.div`
  font-size: 17px;
`;
const CreateTime = styled.div`
  font-size: 11px;
  color: darkgray;
`;
const Footer = styled.footer`
  display: flex;
  gap: 8px;
  margin: 10px 0px;
`;
const Topbar = styled.div`
  display: flex;
  gap: 5px;
  justify-content: space-between;
`;
const DeleteBtn = styled.button`
  cursor: pointer;
  font-size: 10px;
`;

// 기본 프로필 이미지
const defaultProfileImg = "https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?rs=1&pid=ImgDetMain";

export default function Post({ post, userId, createdAt, nickname, photoUrl, likes, views, id }: TPost) {
  const onDelete = () => {
    const isOk = window.confirm("삭제하시겠습니까?");

    if (isOk) {
      // Firebase에서 해당 post 삭제
      // 1. 내가 작성한 게시글인가?
      // 2. 특정 게시글 ID를 통해 Firebase에서 doc 삭제
    }
  };

  return (
    <Container>
      <Wrapper>
        <ProfileArea>
          <ProfileImg src={photoUrl || defaultProfileImg} />
        </ProfileArea>
        <Content>
          <Topbar>
            <UserInfo>
              <UserName>{nickname}</UserName>
              {auth.currentUser && <UserEmail>{auth.currentUser.email}</UserEmail>}
            </UserInfo>
            <DeleteBtn onClick={(e) => onDelete()}>삭제</DeleteBtn>
          </Topbar>
          <PostText>{post}</PostText>
          <CreateTime>{moment(createdAt).fromNow()}</CreateTime>
        </Content>
      </Wrapper>
      <Footer>
        <Item type="view" num={views} id={id} />
        <Item type="like" num={views} id={id} />
        <Item type="comment" num={views} id={id} />
      </Footer>
    </Container>
  );
}
