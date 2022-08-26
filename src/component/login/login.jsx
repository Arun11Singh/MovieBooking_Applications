import React, { useState } from "react";
import Google from "../../img/google.png"
import Facebook from "../../img/facebook.png";
import Github from "../../img/github.png";
import "./login.css";

const Login = props => {
    const { onLoginSubmit, goToSignup, loginMessage, errorMessageLogin } =
        props;
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    
    const google = () => {
        window.open("http://localhost:5000/auth/google", "_self");
      };
    
      const github = () => {
        window.open("http://localhost:5000/auth/github", "_self");
      };
    
      const facebook = () => {
        window.open("http://localhost:5000/auth/facebook", "_self");
      };

    const handleSubmit = e => {
        // 1. create the data  object
        // 2. call the onLoginSubmit with data
        // 3. e. prevent default to prevent submit

        const data = { userId, password };
        onLoginSubmit(data);
        e.preventDefault();

    };

    return (
        <div className="login">
        <h1 className="loginTitle  ">Choose a Login Method</h1>
        <div className="wrapper">
        
          <div className="left">
            <div className="loginButton Google" onClick={google}>
              <img src={Google} alt="" className="icon" />
              Google
            </div>
            <div className="loginButton Facebook" onClick={facebook}>
              <img src={Facebook} alt="" className="icon" />
              Facebook
            </div>
            <div className="loginButton Github" onClick={github}>
              <img src={Github} alt="" className="icon" />
              Github
            </div>
          </div>
          <div className="center">
            <div className="line" />
            <div className="or">OR</div>
          </div>
          <form onSubmit={handleSubmit} className= "right">
                      <div className='input'>
                          <input
                              className=' m-1'
                              type='text'
                              placeholder='Enter User Id'
                              value={userId}
                              onChange={e => {
                                  setUserId(e.target.value);
                              }}
                          />
                      </div>
                      <div className='input'>
                          <input
                              type='password'
                              className=' m-1'
                              placeholder='Enter password'
                              value={password}
                              onChange={e => {
                                  setPassword(e.target.value);
                              }}
                          />
                      </div>
                      <div className='input'>
                          <input
                              type='submit'
                              value='Log in'
                              className=' m-1 btn btn-primary'
                          />
                      </div>
                      <div className='inputs'>
                          Don't have an account?
                          <a href='#' onClick={goToSignup}>
                              Sign up!
                          </a>
                      </div>
                  </form>
  
                  <div className='error-msg text-danger m-1'>
                      {errorMessageLogin}
                  </div>
                  <div className='text-success m-1'>{loginMessage}</div>
              </div>
        </div>
    
 
    );
};

export default Login;