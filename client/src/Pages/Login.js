import React, { useState } from "react";
import { useMutation } from '@apollo/client';
import { Link } from "react-router-dom";
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';

export default function Login() {
  const [ formState, setFormState ] = useState({ email: '', password: '' });
  const [ login, { error }] = useMutation(LOGIN);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await login({
        variables: { email: formState.email, password: formState.password }
      });
      console.log('responseLogin', response);
      const token = response.data.loginUser.token;
      Auth.login(token);
      setFormState({ email: '', password: '' });
    } catch (e) {
      console.log('testone', e);
    }

  }

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormState({...formState, [name]: value});
    console.log(formState);
  }

  return (
    <div className="body-container d-flex flex-column justify-content-center">
      <h1>Login</h1>
      <div className="auth-container">
        <form onSubmit={handleSubmit} id="login-form">
          <div className="mb-3">
            <label htmlFor="email" className="form-label">Email address</label>
            <input onChange={handleChange} name="email" className="form-control" id="email" aria-describedby="emailHelp" value={formState.email} />
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
          </div>
          <div className="mb-3">
            <label htmlFor="password" className="form-label">Password</label>
            <input onChange={handleChange} name="password" className="form-control" id="password" value={formState.password} />
          </div>
          <div className="mb-3 form-check">
            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
            <label className="form-check-label" htmlFor="exampleCheck1">Remember me</label>
          </div>
          <button type="submit" className="btn btn-theme">Login</button>
          <div className="mt-2">
            <Link to="/signup">Sign up instead</Link>
          </div>
        </form>
      </div>
    </div>
  )
}
