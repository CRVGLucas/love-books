import React from "react";
import { createUser } from "./userFunctions";
import { useNavigate } from "react-router-dom";

export function Register() {
    const [name, setName] = React.useState('')
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const navigate = useNavigate();
    function saveUser(event){
        event.preventDefault();
        console.log("form:  ", { name, email, password})
        createUser({ name, email, password}).then(() => {
            console.log("foi!")
            navigate('/login')
        }).catch((error) => {
            console.log("error: ", error)
        })
    }
    return (
        <div>
            <form onSubmit={(e) => saveUser(e)}>
                <input type="text" name="name" onChange={ ({ target }) => setName(target.value) } />
                <input type="email" name="email" onChange={ ({ target }) => setEmail(target.value) } />
                <input type="password" name="password" onChange={ ({ target }) => setPassword(target.value) } />
                <button disabled={!name && !email && !password}>Cadastrar</button>
            </form>
        </div>
    );
}