import React from "react";
import "./App.css";
import Nav from "./components/Nav.js"
import Aside from "./components/Aside.js";
import {Route,Routes, BrowserRouter as Router} from "react-router-dom";
import RegisterForm from "./components/RegisterForm";
import LoginForm from "./components/LoginForm";


function App() {
    return (
    <Router>
        <div id="container" className="container">
            <header id="main_header" className="header">
                <nav id="main_nav" className="nav">
                    <Nav/>
                </nav>
            </header>
            <div className="main">
                <aside id="aside_left" className="aside">
                    <Aside/>
                </aside>
                <section id="content_wrapp" className="content_wrapp">
                    <Routes>
                        <Route path="/Register" element={<RegisterForm/>}/>
                        <Route path="/Login" element={<LoginForm/>}/>
                    </Routes>
                </section>
            </div>
            <footer id="main_footer" className="footer">

            </footer>
        </div>
    </Router>
    );
}

export default App;