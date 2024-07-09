import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function Dashboard() {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const username = localStorage.getItem("auth-username");
    const password = localStorage.getItem("auth-pass");

    if (username === null || password === null) {
      navigate("/");
    } else {
      fetch(
        `https://668b3e9e0b61b8d23b08d551.mockapi.io/api/users?username=${username}&password=${password}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
        .then((response) => response.json())
        .then((data) => {
          const user = data.find(
            (user) => user.username === username && user.password === password
          );
          if (user) {
            setUser(user);
          } else {
            localStorage.removeItem("auth-username");
            localStorage.removeItem("auth-pass");
            navigate("/");
          }
        })
        .catch((error) => {
          console.error("Error:", error);
          localStorage.removeItem("auth-username");
          localStorage.removeItem("auth-pass");
          navigate("/");
        });
    }
  }, [navigate]);

  const logout = () => {
    localStorage.removeItem("auth-username");
    localStorage.removeItem("auth-pass");
    navigate("/");
  };

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h1>Hi, {user.username} 👋</h1>
      <p>Password: {user.password}</p>
      <p>Age: {user.age}</p>
      <Link onClick={logout} to={"/"} style={{ color: "red" }}>
        Logout
      </Link>
    </div>
  );
}

export default Dashboard;
