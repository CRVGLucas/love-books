import React from 'react';
import './Login.css'
import { login } from './userFunctions';
import { ToastContainer, toast } from 'react-toastify';
import UserStorage, { UserContext } from './UserContext';
import { redirect, useNavigate } from 'react-router-dom';
import Loading from '../Loading';




export function Login(){
    const [email, setEmail] = React.useState('')
    const [password, setPassword] = React.useState('')
    const [loading, setLoading] = React.useState(false);
    const context = React.useContext(UserContext)
    const navigate = useNavigate();
    console.log("contexto: ", context)

    async function loginUser(event){
        event.preventDefault();
        setLoading(true)
        const user = await login({email, password})
        if(user){
            toast.success('Login realizado com sucesso!', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
                });
            
            context.setUser(user)
            setLoading(false)
            navigate('/livros')
        } else {
            toast.error('Usuário ou senha incorretos, tente novamente.', {
                position: "top-right",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "colored",
            });
            setLoading(false)
        }
    }
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center',alignItems: 'center'}}>
            <form style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '60%'}} onSubmit={(e) => loginUser(e)}>
                <h1 style={{ color: 'white', margin: '15px', textAlign: 'center'}}>Login</h1>
                <input className='input-form' placeholder="Seu email" type="email" name="email" onChange={({ target }) => setEmail(target.value)}/>
                <input className='input-form' placeholder="Sua senha" type="password" name="password" onChange={({ target }) => setPassword(target.value)}/>
                <button disabled={!email && !password} style={{ width: '10rem', margin: '15px', height: '30px', borderRadius: '6px', cursor: 'pointer'}}>login</button>
            </form>
            <ToastContainer />
            { loading &&  <Loading /> }
        </div>
    );
}