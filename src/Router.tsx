import DarkmodeBtn from 'components/DarkmodeBtn';
import Navbar from 'components/Navbar';
import Intro from 'pages/Intro';
import Login from 'pages/Login';
import Main from 'pages/Main';
import Signup from 'pages/Signup';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

function Router() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Intro />} />
        <Route path="/login" element={<Login />} />
        <Route path="/team/:id" element={<Main />} />
      </Routes>
      <DarkmodeBtn />
    </BrowserRouter>
  );
}

export default Router;
