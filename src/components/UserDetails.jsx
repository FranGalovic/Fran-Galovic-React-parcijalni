import React, { useEffect, useState } from 'react';

function UserDetails({ username, onReset }) {
  const [userData, setUserData] = useState(null);
  const [repos, setRepos] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!username) return;

    setError(null);

    const fetchUserData = async () => {
      try {
        const userResponse = await fetch(`https://api.github.com/users/${username}`);
        if (!userResponse.ok) {
          throw new Error('User not found');
        }
        const userData = await userResponse.json();
        setUserData(userData);

        const reposResponse = await fetch(userData.repos_url);
        if (!reposResponse.ok) {
          throw new Error('Error fetching repositories');
        }
        const reposData = await reposResponse.json();
        setRepos(reposData);
      } catch (error) {
        setError(error.message);
      }
    };

    fetchUserData();
  }, [username]);

  const handleReset = () => {
    setUserData(null);
    setRepos([]);
    setError(null);
    if (typeof onReset === 'function') {
      onReset();
    }
  };

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="user-details">
      {userData && (
        <div>
          <div className="user-profile">
            <img src={userData.avatar_url} alt={`${userData.login}'s avatar`} width={200} />
            <h2>{userData.login}</h2>
          </div>
          <table className="user-info">
            <tbody>
              <tr>
                <td>BIO:</td>
                <td>{userData.bio}</td>
              </tr>
              <tr>
                <td>Location:</td>
                <td>{userData.location}</td>
              </tr>
            </tbody>
          </table>
          <h3>REPOSITORIES</h3>
          <table className="repo-table">
            <tbody>
              {repos.map((repo) => (
                <tr key={repo.id}>
                  <td>
                    <a href={repo.html_url} target="_blank" rel="noopener noreferrer">{repo.name}</a>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <button className="reset-button" onClick={handleReset}>Reset</button>
        </div>
      )}
    </div>
  );
}

export default UserDetails;
