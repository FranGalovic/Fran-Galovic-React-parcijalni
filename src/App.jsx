import React, { useState } from 'react';
import UserForm from './components/UserForm';
import UserDetails from './components/UserDetails';
import './index.css';

function App() {
  const [username, setUsername] = useState('');

  const handleReset = () => {
    setUsername('');
  };

  return (
    <div className="App">
      <UserForm onSearch={setUsername} />
      <UserDetails username={username} onReset={handleReset} />
    </div>
  );
}

export default App;
