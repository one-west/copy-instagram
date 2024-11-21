/** 게시글 타입 */
export type TPost = {
  post: string;
  nickname: string;
  userId: string;
  createdAt: number;
  photoUrl?: string;
  views: number;
  likes: number;
  id: string;
};
