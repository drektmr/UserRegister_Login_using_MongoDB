import React, {useState, useContext} from "react";
import "../App.css";
import {useReducer} from "react";
import {useNavigate} from "react-router-dom";
import UserContext from "./UserContext.js";

function LoginForm() {
    const navigation = useNavigate();
    const {userLogged,setUserLogged} = useContext(UserContext);
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const initialError = {email: "", password: ""};
    const [error, updateError] = useReducer(
        (error, updates) => ({
            ...error,
            ...updates,
        }),
        initialError
    );

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(e);
        [...e.target].map((element) => {
            if (element.type !== "submit") validation(element);
        })
        if (!error.email && !error.password) {

            send(e.target);
        }
    }
    const validation = (target) => {
        // Desestructuració de name, type i value de target
        let name = target.name;
        let value = target.value;
        let msg; // Variable on es desarà el missatge d'error
        //Comprova si té l'attribut required i té algun valor)
        if (name === "email" && !value) {
            msg = "Email is required"
        } else if (name === "password" && !value) {
            msg = "Password is required"
        } else {
            console.log(name);
            debugger
            if (name === "email") {
                setEmail(value);
            } else if (name === "password") {
                console.log(value);
            }
            msg = false;
        }
        updateError({[name]: msg});
    }

    const send = async (form) => {
        let data = {
            email: email,
            password: password
        }
        let user = await fetch("http://192.168.25.4:8080/users/login", {
            method: "post",
            body: JSON.stringify(data),
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })
            .then((response) => {
                return response.json();
            })
        if (user["_id"]) {
            setUserLogged(user);
            navigation("/Profile", {replace: true});
        }
    }

    return (
        <form className="form" onSubmit={handleSubmit} noValidate>
            <ul>
                <li><label>Email</label></li>
                <li><input name="email" type="text" required/></li>
                <p className="red">{error.email}</p>
                <li><label>Password</label></li>
                <li><input name="password" type="password" required/></li>
                <p className="red">{error.password}</p>
                <li><input name="sendLogin" type="submit"/></li>
            </ul>
        </form>
    )
}

export default LoginForm;