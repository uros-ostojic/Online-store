
import "./loginPage.css";
import React, { useContext, useState } from "react";
import { useHistory } from "react-router-dom";
import { applicationContext } from "../../context";

const LoginPage = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);

    const { setToken } = useContext(applicationContext); // uhvatio sam ga iz app.js kao state

    const history = useHistory();

    const updateToken = async (token) => { // ceka da se setToken izvrsi, pravi ga u sinhronu, a inace je asinhrona f-ja?
        await setToken(token);
        localStorage.setItem("token", token);
        history.push("/");
      };

    const login = () => {
        setIsSubmitted(true);  // da ne mogu da klikcem na submit vise puta
    
        // validate data
        if (!username ) {
          setIsSubmitted(false);
          return setErrorMessage("Please enter username");
        }
    
        if (!password) {
          setIsSubmitted(false);
          return setErrorMessage("Please enter password");
        }
        
    
        fetch("https://fakestoreapi.com/auth/login", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            username,
            password, // ovde prosledjujemo email i password koji je ukucan
          }),
        })
          .then((response) => {
            if (response.ok) return response.json(); // preko json-a komuniciraju back i front
            return Promise.reject("Wrong username or password!");
          })
    
          // if response is good do this
          .then((data) => updateToken(data.token))
    
          // if response is not good do this
          .catch((error) => setErrorMessage(error))
    
          .finally((data) => // finally ce se uvek izvrsiti
            setTimeout(() => {
              setIsSubmitted(false); // vraca submit dugme za klik opet i ceka .then ili .catch
            }, 500)
          );
      };
    
  return (
    <>

      <div className="loginPage">
        <div className="login-wrapper">
            <p>Welcome Back!</p>
            <div className="login">
                <input type="username" value={username} placeholder="Username" onChange={(event) => setUsername(event.target.value)}/>
                <input type="password" value={password} placeholder="Password" onChange={(event) => setPassword(event.target.value)}/>
                <div className="errorMessage" onClick={() => setErrorMessage("")}>{errorMessage}</div>
                <button disabled={isSubmitted} onClick={login}>Login</button>
            </div>
        </div>
      </div>
    </>
  );
};

export default LoginPage;
