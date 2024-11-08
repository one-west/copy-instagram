import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { firestore } from "../firebaseConfig";
import { PostType } from "../type/post.type";

const Container = styled.div``;
const Title = styled.h1``;

export default function Timeline() {
  // Page Login Process
  const [posts, setPosts] = useState<PostType[]>([]);

  // 서버에서 게시글 받아오기
  const fetchPosts = async () => {
    // 1. Firebase에 필요한 게시글 받아오기 Query
    const path = collection(firestore, "posts");
    const condition = orderBy("create_at", "desc");
    const postsQuery = query(path, condition);
    // 2. 쿼리에 맞는 Doc들 가져오기
    const snapshot = await getDocs(postsQuery);
    // 3. 가져온 Doc들 Timeline에 쓸 수 있도록 가공
    const timelinePost = snapshot.docs.map((doc) => {
      // 3-1. doc 안에서 필요한 데이터를 뽑아온다.
      const { post, userId, nickname, createdAt } = doc.data() as PostType;
      // 3-2. 뽑아온 데이터를 반환한다.
      return { post, userId, nickname, createdAt, id: doc.id };
    });

    // 4. 가공된 데이터를 State로 저장
    setPosts(timelinePost);
  };

  // 접속할 때마다, Timeline이 보여질 때마다
  useEffect(() => {
    // 서버(Firebase)에서 최신 게시글 받아오기
    fetchPosts();
  }, []);

  return (
    <Container>
      {posts.map((post) => {
        return (
          <div>
            <p>{post.post}</p>
          </div>
        );
      })}
    </Container>
  );
}
