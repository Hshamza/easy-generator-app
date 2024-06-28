import React from 'react';
import { useHistory } from 'react-router-dom';

const Home: React.FC = () => {
  const history = useHistory();

  const handleLogout = () => {
    history.push('/signin');
  };


  return (
    <div className="home main-container login-page">
      <h2>Welcome, Easy Generator</h2>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
};

export default Home;
