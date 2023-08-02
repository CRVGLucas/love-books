import React from "react";
import '../../App.css';
import './Create.css';
import { createBook, getBookCategories } from "./BookFunctions";
import { ToastContainer, toast } from 'react-toastify';
import { redirect, useNavigate } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import Loading from "../Loading";

export function CreateBook() {
    const [title, setTitle] = React.useState('');
    const [description, setDescription] = React.useState('');
    const [image, setImage] = React.useState('');
    const [author, setAuthor] = React.useState('');
    const [category, setCategory] = React.useState('');
    const [ categories, setCategories] = React.useState([]);
    const [loading, setLoading] = React.useState(false);
    const navigate = useNavigate();
    function saveBook(e){
        e.preventDefault();
        setLoading(true)
        createBook({ title, description, author, category, image }).then(() => {
            toast.success('Livro cadastrado com sucesso!', {
                position: "top-center",
                autoClose: 3000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
                });
                navigate('/livros')
        }).catch((error) => {
            console.log("deu erro: ", error)
        }).finally(() => setLoading(false))
    }

    async function getCategories(){
        setCategories(await getBookCategories())

        console.log('categoriesList: ', category);
    }

    React.useEffect(() => {
        getCategories();
    }, [])

    return (
        <div className="create-form-container" style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1 style={{ color: 'white'}}>Criar novo Livro</h1>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
                {
                    image &&
                    <img src={image} alt="capa do livro" />
                }
                <form className="create-form-wrapper" style={{ display: 'flex', flexDirection: 'column', color: 'white'}} onSubmit={(event) => saveBook(event)}>
                    <input className="input"  style={{ padding: '10px', borderRadius: '7px' , background: '#202024', border: '1px solid gray', margin: '10px', color: 'white'}} placeholder="Título" onChange={({ target }) => setTitle( target.value )} />
                    <input className="input"  style={{ padding: '10px', borderRadius: '7px' , background: '#202024', border: '1px solid gray', margin: '10px', color: 'white'}} placeholder="Autor do livro" onChange={({ target }) => setAuthor( target.value )} />

                    {
                        categories && 
                        <select className="input"  style={{ padding: '10px', borderRadius: '7px' , background: '#202024', border: '1px solid gray', margin: '10px', color: 'white'}} onChange={({ target }) => setCategory(target.value)}>
                            <option>Selecione uma categoria</option>
                            {
                                categories.map((cat) => {
                                    return (
                                        <option key={cat.idDocument}>{ cat.data.title} </option>
                                    )
                                })
                            }
                        </select>
                    }

                    <textarea className="input"  style={{ padding: '10px', borderRadius: '7px' , background: '#202024', border: '1px solid gray', margin: '10px', color: 'white'}} placeholder="Decrição" onChange={({ target }) => setDescription( target.value )}></textarea>
                    <input className="input" style={{ padding: '10px', borderRadius: '7px' , background: '#202024', border: '1px solid gray', margin: '10px', color: 'white'}} placeholder="URL da imagem" onChange={({ target}) => setImage( target.value )} />
                    {
                        title && description && category && image &&
                        <button style={{ width: '120px', margin: '10px', padding: '10px', borderRadius: '7px'}}>CADASTRAR</button>

                    }
                </form>
            </div>
            { loading &&  <Loading /> }
            
            <ToastContainer />
        </div>
    );
}