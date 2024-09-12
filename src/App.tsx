import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import styled, { createGlobalStyle } from "styled-components";
import Home from "./screens/home";
import Profiler from "./screens/profiler";
import Signin from "./screens/signin";
import Signup from "./screens/signup";
import reset from "styled-reset";

// React-Router-Dom 을 활용해 사이트의 Page를 관리
// - Page : home, profile, signin, signup
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        // home
        path: "",
        element: <Home />,
      },
      {
        // profile
        path: "profile",
        element: <Profiler />,
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
  return (
    <Container className="App">
      <GlobalStyle />
      <RouterProvider router={router} />
    </Container>
  );
}

export default App;
