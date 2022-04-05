import React from "react";
import "../App.css";
import {useReducer} from "react";

function LoginForm() {
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
        [...e.target].map((element) => {
            if (element.type !== "submit") validation(element);
        })
        if(!error.email && !error.password) console.log(error.password);
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
            msg = false;
        }
        updateError({[name]: msg});
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