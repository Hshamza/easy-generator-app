import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';
import './SignIn.css';
import { useHistory } from 'react-router-dom';


const api = axios.create({
  baseURL: 'http://localhost:3000', 
});

const SignIn: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const history = useHistory();

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await api.post('/api/auth/signin', formData);
      toast.success('Login successful!');
      setTimeout(() => {
        history.push('/home');
      }, 2000);

    } catch (error) {
      toast.error('Invalid Credentials');
    }
  };

  return (
    <div className="signin main-container login-page">
      <img src="/assets/logo.png" alt="Logo" className="logo" />
      <h2>Sign In</h2>
      <form onSubmit={handleSubmit}>
        <input
          className='input-values'
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          className='input-values'
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign In</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignIn;
