import React, {useContext, useReducer, useState} from "react";
import {useNavigate} from "react-router-dom";
//import UserContext from "./UserContext";
function RegisterForm() {
    /*!body.checked*/
    const [name, setName] = useState();
    const [lastName, setLastName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const initialError = {name:"", lastName:"" ,email: "", password: ""};
    const [error, updateError] = useReducer(
        (error, updates) => ({
            ...error,
            ...updates,
        }),
        initialError
    );
    const navigation=useNavigate();
    const regexs = {
        name: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // No puede contener numeros
        lastName: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, // No puede contener numeros
        email: /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/,
        password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/, //Debe contener 8 caracteres minimo, 1 mayuscula, 1 minuscula y numeros
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        [...e.target].map((element) => {
            if (element.type !== "submit") validation(element);
        })

        if(!error.name && !error.lastName && !error.email && !error.password){
            send(e.target);
        }
    }

    const send= async(form)=>{

        let data={
            name: name,
            lastName: lastName,
            email: email,
            password: password
        }
        console.log(data)
        let user= await fetch("http://192.168.25.4:8080/users/register", {
            method: "post",
            body: JSON.stringify(data),
            headers:{
                'Accept': 'application/json',
                'Content-Type':'application/json'
            }
        })
            .then((response)=>{
                return response.json();
            })
            if(user["_id"]){
                navigation("/",{replace: true});
            }
    }

    const onChange = (e) => {
        let data={
            name: e.nativeEvent.path[0].name,
            value: e.nativeEvent.path[0].value
        }
        validation(data)
    }

    const validation = (target) => {
        // Desestructuració de name, type i value de target
        let name = target.name;
        let value = target.value;
        let msg; // Variable on es desarà el missatge d'error
        //Comprova si té l'attribut required i té algun valor)
        if(!value){
            if(name==="name"){
                msg = "Name is required"
            }else if(name==="lastName"){
                msg = "Last Name is required"
            }else if(name==="email"){
                msg = "Email is required"
            }else if(name==="Password"){
                msg = "Password is required"
            }
        }else{
            if(name==="name" && !regexs.name.test(value)){
                msg = "Name can not have symbols or numbers"
            }else if(name==="lastName" && !regexs.lastName.test(value)){
                msg = "Last Name can not have symbols or numbers"
            }else if(name==="email" && !regexs.email.test(value)){
                msg = "Format error"
            }else if(name==="password" && !regexs.password.test(value)){
                msg = "Format error"
            }else if(name==="confPassword" && value!==password){
                msg = "Passwords don't match"
            }else{
                if(name==="name" && regexs.name.test(value)){
                    setName(value);
                }else if(name==="lastName" && regexs.lastName.test(value)){
                    setLastName(value);
                }else if(name==="email" && regexs.email.test(value)){
                    setEmail(value);
                }else if(name==="password" && regexs.password.test(value)){
                    setPassword(value);
                }
                msg=false

            }
        }
        if(name==="confPassword"){
            updateError({password: msg});
        }else{

            updateError({[name]: msg})
        }
    }

    return (

        <form className="form" onSubmit={handleSubmit} noValidate>
            <ul>
                <li><label>Name</label></li>
                <li><input name="name" type="text" onChange={onChange} required/></li>
                <p className="red">{error.name}</p>
                <li><label>Last Name</label></li>
                <li><input name="lastName" type="text" onChange={onChange} required/></li>
                <p className="red">{error.lastName}</p>
                <li><label>Email</label></li>
                <li><input name="email" type="text" onChange={onChange} required/></li>
                <p className="red">{error.email}</p>
                <li><label>Password</label></li>
                <li><input name="password" type="password" onChange={onChange} required/></li>
                <li><label>Confirm Password</label></li>
                <li><input name="confPassword" type="password" required/></li>
                <p className="red">{error.password}</p>
                <li><input name="sendLogin" type="submit" required/></li>
            </ul>
        </form>
    );
}
export default RegisterForm;