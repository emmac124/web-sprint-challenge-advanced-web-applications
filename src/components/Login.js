import React, { useState } from "react";
import axios from 'axios';

const initialFormValues = {
  username: '',
  password: '',
}

const initialError = {
  error: ''
}

const Login = (props) => {

  const [formValues, setFormValues] = useState(initialFormValues);
  const [error, setError] = useState(initialError);

  const handleChange = (e) => {
    setFormValues({
      ...formValues,
      [e.target.name]: e.target.value
    });
  };

  const login = (e) => {
    // make a post request to retrieve a token from the api
    // when you have handled the token, navigate to the BubblePage route
    e.preventDefault();
    axios
      .post('http://localhost:5000/api/login', formValues)
      .then(res => {
        console.log(res);
        localStorage.setItem('token', res.data.payload);
        props.history.push('/bubble-page');
      })
      .catch(err => {
        console.log(err.response);
        setError(err.response.data);
      })
  };
  
  
  // const error = '';
  //replace with error state

  return (
    <div>
      <h1>Welcome to the Bubble App!</h1>
      <form onSubmit={login}>
        <div data-testid="loginForm" className="login-form">
          <h2>Login</h2>
          <label htmlFor='username'>Username:</label>
            <input
            data-testid="username"
            name='username'
            type='text'
            onChange={handleChange}
            value={formValues.username}
             />
          <label htmlFor='password'>Password:</label>
            <input
            data-testid="password"
            name='password'
            type='password'
            onChange={handleChange}
            value={formValues.password}
            />
        </div>
        <p data-testid="errorMessage" className="error">{error.error}</p>
        <button>Login</button>
      </form>
    </div>
  );
};

export default Login;

//Task List:
//1. Build a form containing a username and password field.
//2. Add whatever state nessiary for form functioning.
//3. MAKE SURE YOUR USERNAME AND PASSWORD INPUTS INCLUDE data-testid="username" and data-testid="password"
//4. If either the username or password is not entered, display the following words with the p tag provided: Username or Password not valid.
//5. If the username / password is equal to Lambda School / i<3Lambd4, save that token to localStorage.