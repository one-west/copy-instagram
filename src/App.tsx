import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Home from "./screens/home";
import Profiler from "./screens/profiler";
import Signin from "./screens/signin";
import Signup from "./screens/signup";
import reset from "styled-reset";
import { auth } from "./firebaseConfig";
import LoadingScreen from "./screens/loading-screen";
import ProtectedRouter from "./component/protected-router";

// React-Router-Dom 을 활용해 사이트의 Page를 관리
// - Page : home, profile, signin, signup
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        // home
        path: "",
        element: (
          <ProtectedRouter>
            <Home />
          </ProtectedRouter>
        ),
      },
      {
        // profile
        path: "profile",
        element: (
          <ProtectedRouter>
            <Profiler />
          </ProtectedRouter>
        ),
      },
    ],
  },
  {
    // signin
    path: "/signin",
    element: <Signin />,
  },
  {
    // signin
    path: "/signup",
    element: <Signup />,
  },
]);

const Container = styled.div`
  height: 100vh;
  display: flex;
  justify-content: center;
`;

// 공통적으로 전역에서 사용할 Global css style
// `안녕하세요 제 이름은 ${name}입니다.`;
const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    background-color: black;
    color: white;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

function App() {
  // 로그인 여부 파악을 위한 로딩
  const [loading, setLoading] = useState(true);
  // Server(Firebase)를 통해 현재 로그인한지 안 한지 확인
  // - Server API ... 속도의 차이 => 비동기형 함수

  const init = async () => {
    // 로딩 Start
    // Firebase 가 로그인 인증 여부 파악
    await auth.authStateReady();

    // 로딩 Finish
    setLoading(false);
  };

  // 실행 : 페이지가 렌더링될 때 (=접속했을 때) 실행되는 함수
  useEffect(() => {
    // 로그인 여부 파악(1번만)
    init();
  }, []);
  // Page Rendering Area
  // - A. 로그인을 한 경우 > Home화면으로 이동
  // - B. 로그인을 하지 않은 경우 > Login화면으로 이동
  // + C. 로딩하는 동안 보여줄 loading-screen 필요
  return loading ? (
    <LoadingScreen />
  ) : (
    <Container className="App">
      <GlobalStyle />
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;
