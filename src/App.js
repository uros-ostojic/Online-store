import './App.css';
import { ApplicationProvider } from "./context";
import { Redirect, Route, Switch } from "react-router-dom";

import Header from "./components/Header/Header"
import Footer from "./components/Footer/Footer"
import HomePage from './pages/HomePage/HomePage';
import LoginPage from './pages/LoginPage/LoginPage';
import { useEffect, useState } from 'react';

function App() {

const [token, setToken] = useState(
  localStorage.getItem("token") ? localStorage.getItem("token") : ""
); // ovo se desava samo kad refresh-ujemo



  return (
    <>
    
      <ApplicationProvider value={{token, setToken}}>
        
      <Header />

        <Switch>

          <Route exact path="/" component={HomePage} />
          
          
          <Route exact path="/login">
            <LoginPage />
          </Route>

        </Switch>

        <Footer />

      </ApplicationProvider>
      
  
    </>
  );
}

export default App;
