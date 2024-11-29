/** 작성 게시글 타입 */
export type IPost = {
  id: string;
  email: string;
  post: string;
  nickname: string;
  userId: string;
  createdAt: number;
  photoUrl?: string;
  views: number;
  likes: number;
  comments: number;
};
