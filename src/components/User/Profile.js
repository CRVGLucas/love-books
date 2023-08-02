import React from "react"
import { UserContext } from "./UserContext"
import { useNavigate } from "react-router-dom";
import { editUser } from "./userFunctions";
import { ToastContainer, toast } from "react-toastify";
import Loading from "../Loading";

export default function ProfileUser() {
    const context = React.useContext(UserContext)
    const navigate = useNavigate();
    if(!context.user){
        navigate('/login')
    }
    const [ showUserInfo, setShowUserInfo ] = React.useState(true)
    const [ showUserEdit, setShowUserEdit ] = React.useState(false)
    const [ name, setName ] = React.useState(context.user.data.name)
    const [ email, setEmail ] = React.useState(context.user.data.email)
    const [password, setPassword] = React.useState(context.user.data.password)
    const [loading, setLoading] = React.useState(false);
    function activateEdit(){
        setShowUserEdit(true)
        setShowUserInfo(false)
    }
    function activateInfo(){
        setShowUserEdit(false)
        setShowUserInfo(true)
    }
    function edit(e) {
        e.preventDefault();
        setLoading(true)
        console.log("user: ", context.user)
        const form = { ...context.user.data }
        form.name = name
        form.email = email
        form.password = password
        editUser(form, context.user.idDocument).then(() => {
            toast.success('Usuário alterado com sucesso', {
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
            context.setUser({idDocument: context.user.idDocument, data: form})
            localStorage.setItem('user', JSON.stringify({idDocument: context.user.idDocument, data: form}))
            setShowUserInfo(true)
            setShowUserEdit(false)
            navigate('/')
        }).catch((error) => {
            toast.error('Erro ao editar o usuário', {
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
        })
    }
    return (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100%'}}>
            {
                showUserInfo &&
                <div>
                    <h1 style={{ color: 'white'}}>Informações da conta:</h1>
                    <p style={{ color: 'white'}}><b>Nome:</b> {context.user.data.name}</p>
                    <p style={{ color: 'white'}}><b>E-mail:</b> {context.user.data.email}</p>
                    <button onClick={() => activateEdit()}>Editar dados</button>
                </div>
            }
            {
                showUserEdit &&
                    <form style={{ display: 'flex', flexDirection: 'column' }} onSubmit={(event) => edit(event)}>
                        <input style={{ width: '300px', padding: '10px', margin: '10px', background: '#202024', borderRadius: '6px', color: 'white'}} type="text" name="name" value={name} onChange={({ target }) => setName(target.value)}/>
                        <input style={{ width: '300px', padding: '10px', margin: '10px', background: '#202024', borderRadius: '6px', color: 'white'}} type="email" name="email" value={email} onChange={({ target }) => setEmail(target.value)}/>
                        <input style={{ width: '300px', padding: '10px', margin: '10px', background: '#202024', borderRadius: '6px', color: 'white'}} type="password" name="email" value={password} onChange={({ target }) => setPassword(target.value)}/>
                        <div style={{ margin: '10px'}}>
                            <button>Editar</button> <button onClick={() => activateInfo()}>Voltar</button>
                        </div>
                    </form>

            }
            <ToastContainer />
            { loading &&  <Loading /> }
        </div>
    )
}