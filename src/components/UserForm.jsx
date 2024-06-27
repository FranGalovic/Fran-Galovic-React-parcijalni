import React, { useState } from 'react';

function UserForm({ onSearch }) {
  const [username, setUsername] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(username);
  };

  return (
    <form onSubmit={handleSubmit} className="user-form">
      <label htmlFor="username">GitHub username:</label>
      <input 
        type="text" 
        id="username"
        value={username} 
        onChange={(e) => setUsername(e.target.value)} 
        placeholder="Enter GitHub username" 
        required 
      />
      <button type="submit">GO!</button>
    </form>
  );
}

export default UserForm;