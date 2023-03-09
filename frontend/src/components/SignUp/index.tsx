import axios from 'axios';
import React, { FormEvent, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './index.css'

type Props = {
  setAuthenticated: Function;
}

const SignUp = ({ setAuthenticated }: Props) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignUp = async (event: FormEvent) => {
    event.preventDefault();

    const user = { username, password };
    try {
      await axios.post('http://localhost:3000/api/signup', user);

      alert('Sign up successful!');
      setAuthenticated(true);
      setUsername('');
      setPassword('');
      navigate('/');
    } catch (error) {
      alert('Username already exists. Please choose a different one.');
    }
  };

  return (
    <form className='signup-form' onSubmit={handleSignUp}>
      <label className='signup-label'>
        Username:
        <input
          className='signup-input'
          type="text"
          value={username}
          onChange={(event) => setUsername(event.target.value)}
        />
      </label>
      <br />
      <label className='signup-label'>
        Password:
        <input
          className='signup-input'
          type="password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
      </label>
      <br />
      <button className='signup-button' type="submit">Sign Up</button>
    </form>
  );
};

export default SignUp;