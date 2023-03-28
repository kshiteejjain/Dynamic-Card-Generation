import React from 'react';
import { Routes, Route} from "react-router-dom";
import './App.scss';
import Form from './features/Form/Form';
import UserCard from './features/UserCard/UserCard';
import ProfilePic from './features/ProfilePic/ProfilePic';
import logo from './assets/logo.svg';

const App = () => {
  return (
    <>
        <header>
        <img data-testid='renderLogo' src={logo} alt="Logo" width='55' />
          <h1 data-testid='renderTitle'>Image Finder</h1>
        </header>

        <div className="container">
            <Routes>
              <Route path="/" element={<Form />} />
              <Route path="*" element={<Form />} />
              <Route path="UserCard" element={<UserCard />} />
              <Route path="ProfilePic" element={<ProfilePic />} />
            </Routes>
        </div>
    </>
  );
}

export default App;
