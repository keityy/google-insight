import React from 'react';

function Login() {
  const handleLogin = () => {
    // Redirect the user to the Google sign-in page
    window.location.href = 'http://localhost:3001/auth/google';
  };

  return (
    <div>
      <h2>Login</h2>
      <button onClick={handleLogin}>Sign in with Google</button>
    </div>
  );
}

export default Login;
