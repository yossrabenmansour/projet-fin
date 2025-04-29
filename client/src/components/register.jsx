import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const register = () => {
    axios
      .post("http://localhost:5500/register", { name, email, password })
      .then((res) => {

        if (res.data.newuser[0]) {
          navigate("/login");
        }
      })
      .catch((err) => {
        setError("Email already used !!!");
      });
  };

  return (
    <div>
      <div className="signinform">
        <h1 className="fw-bold">Service Register</h1>

        <div className="container">
          <div className="w3l-form-info">
            <div className="w3_info">
              <h2>Register</h2>
              {error ? <div className="alert alert-danger">{error}</div> : <p></p>}
              <div>
                <div className="input-group">
                  <span>
                    <i className="fas fa-user" aria-hidden="true"></i>
                  </span>
                  <input
                    onChange={(e) => {
                      setName(e.target.value);
                    }}
                    value={name}
                    type="text"
                    placeholder="name"
                  />
                </div>
                <div className="input-group">
                  <span>
                    <i className="fas fa-key" aria-hidden="true"></i>
                  </span>
                  <input
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    type="email"
                    placeholder="email"
                  />
                </div>
                <div className="input-group">
                  <span>
                    <i className="fas fa-key" aria-hidden="true"></i>
                  </span>
                  <input
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    type="Password"
                    placeholder="Password"
                  />
                </div>

                <button onClick={() => { register() }} className="btn btn-primary btn-block">Register</button>
              </div>
              <p className="continue">
                <span>or Register with</span>
              </p>
              <div className="social-login">
                <a href="#facebook">
                  <div className="facebook">
                    <span className="fab fa-facebook-f" aria-hidden="true"></span>
                  </div>
                </a>
                <a href="#twitter">
                  <div className="twitter">
                    <span className="fab fa-twitter" aria-hidden="true"></span>
                  </div>
                </a>
                <a href="#google">
                  <div className="google">
                    <span className="fab fa-google" aria-hidden="true"></span>
                  </div>
                </a>
              </div>
              <p className="account">
                Already have an account <a href="/login">Login</a>
              </p>
            </div>
          </div>
        </div>

        <div className="footer">
          <p> All Rights Reserved | Design by Achref</p>
        </div>
      </div>
    </div>
  );
};

export default Register;
