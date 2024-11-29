import React, { useEffect, useState } from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import ProtectedRouter from "./component/protected-router";
import Home from "./screens/home";
import Profiler from "./screens/profiler";
import Signin from "./screens/signin";
import Signup from "./screens/signup";
import styled, { createGlobalStyle } from "styled-components";
import reset from "styled-reset";
import { auth } from "./firebaseConfig";
import LoadingScreen from "./screens/loading-screen";

// react-router-dom으로 라우팅
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
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
const GlobalStyle = createGlobalStyle`
  ${reset}
  body {
    background-color: white;
    color: black;
    font-family: system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
  }
`;

function App() {
  // 로그인 여부 파악을 위한 로딩
  const [loading, setLoading] = useState<boolean>(true);

  // Server(Firebase)를 통해 현재 로그인한지 안 한지 확인
  const init = async () => {
    // 로딩 시작
    await auth.authStateReady();

    // 로딩 끝
    setLoading(false);
    console.log("Server");
  };

  // 페이지가 렌더링될 때 (=접속했을 때) 실행
  useEffect(() => {
    init();
  }, []);

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
