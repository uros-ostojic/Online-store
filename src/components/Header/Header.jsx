import React, { useContext, useState } from "react";
import "./header.css";
import { Link, useHistory, useLocation } from "react-router-dom";
import { applicationContext } from "../../context";

function Header() {

  const { token, setToken } = useContext(applicationContext);
	const history = useHistory();
  
  const logout = () => {
		setToken("");
		localStorage.removeItem("token");
		history.push("/");
  }
  return (
    <header className="main-header">
      <div>
        <span>Random shop</span>
      </div>
      <div className='login-logout'>
        {token ? <button  className="logout-button" onClick={logout}>Logout</button> : <Link to="/login" className="login-button">Login</Link>}
      </div>

    </header>
  )
}

export default Header