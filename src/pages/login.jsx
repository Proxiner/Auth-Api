import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./form.scss";

import { Flip, ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const loginUser = (event) => {
    event.preventDefault();

    if (username !== "" && password !== "") {
      fetch(`https://668b3e9e0b61b8d23b08d551.mockapi.io/api/users`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => {
          const user = data.find(
            (user) => user.username === username && user.password === password
          );
          if (user) {

            localStorage.setItem('auth-username' , username);
            localStorage.setItem('auth-pass' , password);

            toast.success(`☺️ Welcome Back ${username}`, {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: 0,
              theme: "dark",
              transition: Flip,
            });

            setTimeout(() => {
                navigate('/dashboard');
              }, 4200);

          } else {
            toast.error("Sorry, credentials are wrong", {
              position: "top-right",
              autoClose: 4000,
              hideProgressBar: false,
              closeOnClick: true,
              pauseOnHover: false,
              draggable: true,
              progress: 0,
              theme: "dark",
              transition: Flip,
            });
          }
        })
        .catch((error) => {
          toast.error("Error occurred during login", {
            position: "top-right",
            autoClose: 4000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: false,
            draggable: true,
            progress: 0,
            theme: "dark",
            transition: Flip,
          });
          console.error("Error:", error);
        });
    } else {
      toast.error("Please fill in the form", {
        position: "top-right",
        autoClose: 4000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: 0,
        theme: "dark",
        transition: Flip,
      });
    }
  };

  return (
    <section className="form-container">
      <ToastContainer
        position="top-right"
        autoClose={4000}
        limit={1}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover={false}
        theme="dark"
        transition={Flip}
      />
      <form>
        <label htmlFor="username"> Username </label>
        <input
          type="text"
          name="username"
          placeholder="john_loti"
          value={username}
          onInput={(input) => setUsername(input.target.value)}
        />

        <label htmlFor="password"> Password </label>
        <input
          type="text"
          name="password"
          placeholder="183#@Losu_&"
          value={password}
          onInput={(input) => setPassword(input.target.value)}
        />

        <button type="submit" onClick={loginUser}>
          Login
        </button>
      </form>
    </section>
  );
}

export default Login;
