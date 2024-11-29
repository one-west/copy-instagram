import { Link, Outlet, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { auth } from "../firebaseConfig";

const Container = styled.div`
  display: grid;
  grid-template-columns: 1fr 5fr;
  gap: 30px;
  width: 100%;
  padding: 20px;
`;
const Layout = styled.div`
  width: 220px;
  border-right: 1px solid #2b2b2b;
`;
const Navigator = styled.div`
  position: fixed;
  top: 2%;
  left: 2%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 95vh;
  gap: 15px;
  
  a {
    text-decoration: none;
    color: inherit;
  }
`;
const MenuItem = styled.div`
  border-radius: 5px;
  width: 150px;
  height: 50px;
  display: flex;
  align-items: center;
  justify-content: left;
  cursor: pointer;

  &:hover {
    background-color: #313131; /* Hover 시 색상 변경 */
  }

  &:active {
    background-color: #a8a8a8; /* 클릭 시 색상 변경 */
    transform: scale(0.95); /* 클릭 시 살짝 축소 효과 */
  }

  svg {
    width: 40px;
    height: 40px;
    margin-left: 12px;
  }
`;
const MenuText = styled.div`
  font-size: 20px;
  margin-left: 10px;
`;
const BottomMenu = styled.div`
  display: flex;
  flex-direction: column-reverse;
  align-items: center;
  flex: 1;
`;

export default () => {
  // Page Logic
  const navi = useNavigate();

  // 로그아웃 함수
  const signOut = async () => {
    // + 확인절차
    const isOK = window.confirm("정말로 로그아웃 하실 건가요?");
    if (isOK) {
      // 로그아웃
      await auth.signOut();
      // 로그아웃 뒤에 -> 로그인화면으로 이동
      navi("/signin");
    }
  };

  // Page Design Redering
  return (
    <Container>
      <Layout />
        <Navigator>
          {/* 홈화면 메뉴 */}
          <Link to={"/"}>
            <MenuItem>
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M11.293 3.293a1 1 0 0 1 1.414 0l6 6 2 2a1 1 0 0 1-1.414 1.414L19 12.414V19a2 2 0 0 1-2 2h-3a1 1 0 0 1-1-1v-3h-2v3a1 1 0 0 1-1 1H7a2 2 0 0 1-2-2v-6.586l-.293.293a1 1 0 0 1-1.414-1.414l2-2 6-6Z"
                  clip-rule="evenodd"
                />
              </svg>
              <MenuText>홈</MenuText>
            </MenuItem>
          </Link>
          {/* 프로필 메뉴 */}
          <Link to={"/profile"}>
            <MenuItem>
              <svg
                className="w-6 h-6 text-gray-800 dark:text-white"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  fill-rule="evenodd"
                  d="M12 4a4 4 0 1 0 0 8 4 4 0 0 0 0-8Zm-2 9a4 4 0 0 0-4 4v1a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2v-1a4 4 0 0 0-4-4h-4Z"
                  clip-rule="evenodd"
                />
              </svg>
              <MenuText>프로필</MenuText>
            </MenuItem>
          </Link>
          <BottomMenu>
            {/* 로그아웃 메뉴 */}
            <MenuItem onClick={signOut}>
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
                  d="M15.75 9V5.25A2.25 2.25 0 0 0 13.5 3h-6a2.25 2.25 0 0 0-2.25 2.25v13.5A2.25 2.25 0 0 0 7.5 21h6a2.25 2.25 0 0 0 2.25-2.25V15M12 9l-3 3m0 0 3 3m-3-3h12.75"
                />
              </svg>
              <MenuText>로그아웃</MenuText>
            </MenuItem>
          </BottomMenu>
        </Navigator>
      <Outlet />
    </Container>
  );
};
