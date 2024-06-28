import React, { useState, ChangeEvent, FormEvent } from 'react';
import axios from 'axios';
import './SignUp.css';
import { toast, ToastContainer } from 'react-toastify';
import { useHistory } from 'react-router-dom';

const api = axios.create({
  baseURL: 'http://localhost:3000',
});

const SignUp: React.FC = () => {
  const [formData, setFormData] = useState({
    email: '',
    name: '',
    password: '',
    confirmPassword: '',
  });

  const history = useHistory();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validatePassword = (password: string) => {
    const minLength = 8;
    const hasLetter = /[a-zA-Z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSpecialChar = /[!@#$%^&*(),.?":{}|<>]/.test(password);

    if (password.length < minLength) {
      return 'Password must be at least 8 characters long.';
    }
    if (!hasLetter) {
      return 'Password must contain at least 1 letter.';
    }
    if (!hasNumber) {
      return 'Password must contain at least 1 number.';
    }
    if (!hasSpecialChar) {
      return 'Password must contain at least 1 special character.';
    }
    return '';
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const passwordError = validatePassword(formData.password);

    if (passwordError) {
      toast.error(passwordError);
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.error('Passwords do not match.');
      return;
    }

    try {
      const response = await api.post('/api/auth/signup', formData);
      console.log('Sign up successful:', response.data);
      toast.success('Sign up successful!');
      setTimeout(() => {
        history.push('/signin');
      }, 2000);
    } catch (error) {
      console.error('Sign up error:', error);
      toast.error('Sign up failed. Please try again.');
    }
  };

  return (
    <div className="signup main-container signup-page">
    <img src="/assets/logo.png" alt="Logo" className="logo" />

      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="name"
          placeholder="Name"
          value={formData.name}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="confirmPassword"
          placeholder="Confirm Password"
          value={formData.confirmPassword}
          onChange={handleChange}
          required
        />
        <button type="submit">Sign Up</button>
      </form>
      <ToastContainer />
    </div>
  );
};

export default SignUp;
