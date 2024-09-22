import React from 'react';
import './login.css';

function Login() {
  const loginwithgoogle =()=>{
    window.open("http://localhost:8080/auth/google/callback","_self")
  }
  const loginwithgithub =()=>{
    window.open("http://localhost:8080/auth/github/callback","_self")
  }
  return (
    <>
    <div className='login-page'>
      <h1 style={{textAlign:"center"}}>Login</h1>
        <div className='form'>
          <form className='login-form'>
            <input type='text' name='' id='' placeholder='Username'/>
            <input type='password' name='' id='' placeholder='password'/>
            <button>Login</button>
            <p className='message'>Not Registered? <a href='#_'>Create an account </a></p>
          </form>
          <button className='login-with-google-btn' onClick={loginwithgoogle}>
            Sign with Google
          </button>
          <button className='login-with-google-btn' onClick={loginwithgithub}>
            Sign with Github
          </button>
        </div>

    </div>
    </>
  )
}

export default Login