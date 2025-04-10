import React from 'react';
import UserForm from './UserForm';
import './App.css';
import logo from './image.png';

const App = () => {
  return (
    <div class="container-fluid">
      <div class="imgBlock">
        <img src={logo} />
      </div>

      <h1 class="text-center txtH1">CCIS Students Data</h1>
      <UserForm />
    </div>
  );
};

export default App;