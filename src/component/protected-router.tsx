import { Navigate } from "react-router-dom";
import { auth } from "../firebaseConfig";

type Props = {
  children: React.ReactNode;
};

// 유저가 로그인하지 않은 경우, 특정 페이지 접근 막음
export default ({ children }: Props) => {
  // 1. User가 로그인을 했는지 안 했는지 확인
  const user = auth.currentUser;
  // 1-A. O - User가 로그인을 한 경우
  if (user) {
    return <>{children}</>;
  }
  // 1-B. X - User가 로그인을 안 한 경우
  else {
    // ㄴ 로그인 페이지로 돌려보냄
    return <Navigate to={"/signin"} />;
  }
};
