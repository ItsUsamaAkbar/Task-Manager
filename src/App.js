import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Home from './Screens/Home';
import Main from './Screens/Main';
import Registration from './Screens/Registration';
import Document from './Screens/Document';
import Signup from './Screens/Singup';
import Login from './Screens/Login';

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Signup" element={<Signup />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Main" element={<Main />} />
        <Route path="/Registration" element={<Registration />} />
        <Route path="/Document" element={<Document />} />
      </Routes>
    </div>
  );
}

export default App;
