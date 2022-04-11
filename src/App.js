import React, {useState} from "react";
import "./App.css";
import Nav from "./components/Nav.js"
import MainContent from "./components/MainContent"
import {Route, Routes, Navigate, BrowserRouter as Router} from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";
import Error404 from "./components/Error404";
import Profile from "./components/Profile";
import UserContext from "./components/UserContext";

//import UserContext from "./components/UserContext";


function App() {
    const [userLogged, setUserLogged] = useState();
    return (
        <UserContext.Provider value={{userLogged, setUserLogged}}>
            <Router>
                <div id="container" className="container">
                    <header id="main_header" className="header">
                        <nav id="main_nav" className="nav">
                            <Nav/>
                        </nav>
                    </header>
                    <div className="main">
                        <section id="content_wrapp" className="content_wrapp">
                            <Routes>
                                <Route path="/" element={<MainContent/>}/>
                                <Route path="/Register" element={<RegisterForm/>}/>
                                <Route path="/Login" element={!userLogged ? (<LoginForm/>):(<Navigate replace to="/Profile"/>)}/>
                                <Route path="/Profile" element={userLogged ? (<Profile/>):(<Navigate replace to="/Login"/>)}/>
                                <Route path="*" element={<Error404/>}/>
                            </Routes>
                        </section>
                    </div>
                    <footer id="main_footer" className="footer">
                    </footer>
                </div>
            </Router>
        </UserContext.Provider>
    );
}

export default App;