import React from 'react';
import './Header.css';
import { Link, redirect, useNavigate } from 'react-router-dom';
import { AiOutlineMenu } from 'react-icons/ai';
import UserStorage, { UserContext } from './User/UserContext';
export function Header() {
    const [toggleHeader, setToggleHeader] = React.useState(true);
    const context = React.useContext(UserContext);
    const navigate = useNavigate();
    function openCloseHeader(){
        setToggleHeader(!toggleHeader);
    }
    function logout(){
        context.setUser(null)
        return navigate('/login')
    }
    return (
        <header >
            {
                toggleHeader &&
                <div className='header'>
                    <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', width: '100%', padding: '10px'}}>
                        <Link to="/">
                            <img src="../assets/book-logo.png" alt="logo" style={{ marginBottom: '1.3rem'}}/>
                        </Link>

                        <i style={{  fontSize: '1.8rem'}} onClick={() => openCloseHeader()}>
                            <AiOutlineMenu/>
                        </i>
                    </div>

                    <nav style={{ display: 'flex', flexDirection: 'column'}}>
                        <Link className='header-option' to={'/livros'}>Livros</Link>
                       {
                         !context.user &&
                            <Link className='header-option' to={'/login'}>Login</Link>
                       }
                       {
                         !context.user &&
                             <Link className='header-option' to={'/criar/usuario'}>Cadastro</Link>
                       }
                       {
                        context.user &&
                         <Link className='header-option'>Minha conta</Link>
                       }
                       {
                        context.user &&
                         <Link className='header-option'>Meus Favoritos</Link>
                       }
                       {
                         context.user &&
                         <a className='header-option' onClick={() => logout()}>Logout</a>
                       }

                    </nav>

                        <div>
                        {
                            context.user &&
                            <p>Bem vindo, {context.user.data.name} !</p>
                        }
                        </div>
                    
                </div>
            }
            {
                !toggleHeader &&
                <div style={{ minHeight: '100vh'}}>
                     <i style={{ position: 'relative', top: '20px', padding: '10px', marginBottom: '10px', color: 'white', fontSize: '1.8rem'}} onClick={() => openCloseHeader()}>
                        <AiOutlineMenu/>
                     </i>
                </div>
            }
    


        </header>
    );
}