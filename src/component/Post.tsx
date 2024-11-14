// 불러온 게시글을 화면에 예쁘게 보여줍니다.
// - 불러온 게시글 정보(property)를 받아와야함

import styled from "styled-components";
import { TPost } from "../types/post.type";
import { auth } from "../firebaseConfig";
import moment from "moment";
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
const Footer = styled.footer``;
const ItemBox = styled.div``;
const ItemIcon = styled.span``;
const ItemText = styled.span``;

type TItem = { type: ItemIcon; num: number };
type ItemIcon = "like" | "view" | "comment";

const Item = ({ type, num }: TItem) => {
  return (
    <ItemBox>
      <ItemIcon>{type}</ItemIcon>
      <ItemText>{num}</ItemText>
    </ItemBox>
  );
};

// 기본 프로필 이미지
const defaultProfileImg = "https://th.bing.com/th/id/OIP.tvaMwK3QuFxhTYg4PSNNVAHaHa?rs=1&pid=ImgDetMain";

export default function Post({ post, userId, createdAt, nickname, photoUrl }: TPost) {
  return (
    <Container>
      <Wrapper>
        <ProfileArea>
          <ProfileImg src={photoUrl || defaultProfileImg} />
        </ProfileArea>
        <Content>
          <UserInfo>
            <UserName>{nickname}</UserName>
            {auth.currentUser && <UserEmail>{auth.currentUser.email}</UserEmail>}
          </UserInfo>
          <PostText>{post}</PostText>
          <CreateTime>{moment(createdAt).fromNow()}</CreateTime>
        </Content>
      </Wrapper>
      <Footer>
        <Item type="view" num={1} />
        <Item type="like" num={2} />
        <Item type="comment" num={3} />
      </Footer>
    </Container>
  );
}
