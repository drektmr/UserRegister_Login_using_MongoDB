import React, {useContext} from "react";
import "../App.css";
import UserContext from "./UserContext";
import {useNavigate} from "react-router-dom";

function Profile() {
    const {userLogged,setUserLogged} = useContext(UserContext);
    const keys=Object.values(userLogged);
    return (
        <div className="form">
            <ul>
                <li>Name: {userLogged.name}</li>
                <li>Last Name: {userLogged.lastName}</li>
                <li>Email: {userLogged.email}</li>
                <li><button onClick={function(){
                    setUserLogged(false);
                }}>Logout</button></li>
            </ul>

        </div>
    );
}
export default Profile;