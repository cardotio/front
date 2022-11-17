import Loading from 'components/Loading';
// import Intro from 'pages/Intro';
// import Invite from 'pages/Invite';
// import Login from 'pages/Login';
// import Main from 'pages/Main';
import React from 'react';
import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
const Intro = React.lazy(() => import('pages/Intro'));
const Login = React.lazy(() => import('pages/Login'));
const Main = React.lazy(() => import('pages/Main'));
const Invite = React.lazy(() => import('pages/Invite'));

function Router() {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/login" element={<Login />} />
          <Route path="/team/:teamid" element={<Main />} />
          <Route path="/invite/:teamid/:teamcode" element={<Invite />} />
        </Routes>
      </Suspense>
      {/* <DarkmodeBtn /> */}
    </BrowserRouter>
  );
}

export default Router;
