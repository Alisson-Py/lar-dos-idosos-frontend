import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';

import '../global/pages/login.css';
import api from '../services/api';

export default function Login() {
  const {push} = useHistory();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  function handleLogin() {
    api.get('login', {
      auth: {
        username: email,
        password: password
      }
    }).then(res => {
      push('/list');
    }).catch(err => {
      if (err.message === "Network Error") {
        alert('connection Error');
        return;
      }
      if (err.response.status === 404){
        alert('email not found');
      };
      if (err.response.status === 401){
        alert('incorrect password');
      };
    })
  }

  return (
    <div className="login">
      <h1>LOGIN</h1>

      <div className="form">
      <input
        type="email"
        name="email"
        id="email"
        placeholder="Email"
        value={email}
        onChange={text => setEmail(text.target.value)}  
      />
      <input
        type="password"
        name="password"
        id="password"
        placeholder="Senha"
        value={password}
        onChange={text => setPassword(text.target.value)}  
      />
      <button onClick ={handleLogin}>ENTRAR</button>
      </div>
      <div className="temp-auto-login">
        <p>Email: all-peoples@lardosidosos.com</p>
        <p>Password: allpeoples</p>
      </div>
    </div>
  );
}