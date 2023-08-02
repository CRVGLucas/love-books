import React from "react";
import { useParams } from "react-router-dom";
import { editBook, getBookById, getBookCategories } from "./BookFunctions";
import Loading from "../Loading";

export function EditBook() {
    const { id } = useParams()
    const [book, setBook] = React.useState('')
    const [ categories, setCategories] = React.useState('')
    const [bookRelations, setBookRelations] = React.useState('')
    const [loading, setLoading] = React.useState(false);
    async function getBook(){
        setBook(await getBookById(id))
    }
    async function getCategories() {
        setCategories(await getBookCategories())
    }
    function editBookInfo(event){
        event.preventDefault()
        setLoading(true)
        editBook(book,id).then(() => {
            console.log("tuuuuuudo certo")
        }).catch((error) => {
            console.log("erro ao editar: ", error)
        }).finally(() => {
            setLoading(false)
        })
    }
    React.useEffect(() => {
        getBook();
        getCategories();
    }, [])
    return (
        <div style={{ width: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center'}}>
            <h1 style={{ color: 'white'}}>Editar Livro</h1>
            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-around', alignItems: 'center'}}>
                {
                    book.image &&
                    <img src={book.image} style={{ width: '220px', height: '320px'}} alt="capa do livro" />
                }
                {
                    book &&
                    <form style={{ display: 'flex', flexDirection: 'column', width: '90%', color: 'white'}} onSubmit={(event) => editBookInfo(event)}>
                        
                        <input style={{ padding: '10px', width: '100%', borderRadius: '7px' , background: '#202024', border: '1px solid gray', margin: '10px', color: 'white'}} type="text" value={book.title} onChange={({ target }) => setBook({...book, title: target.value})} />
                        <input style={{ padding: '10px', width: '100%', borderRadius: '7px' , background: '#202024', border: '1px solid gray', margin: '10px', color: 'white'}} type="text" value={book.author ? book.author : ''} placeholder="Autor do livro" onChange={({ target }) => setBook({...book, author: target.value})} />
                        <textarea style={{ padding: '10px', width: '100%', borderRadius: '7px' , border: '1px solid gray', background: '#202024', margin: '10px', color: 'white'}} rows="4" cols="50" type="text" value={book.description} onChange={({ target }) => setBook({...book, description: target.value})}></textarea>
                        <select style={{ padding: '10px', width: '100%', borderRadius: '7px' , border: '1px solid gray', background: '#202024', margin: '10px', color: 'white'}} value={book.category} onChange={({ target }) => setBook({...book, category: target.value})}>
                            {
                                categories &&
                                categories.map(category => {
                                    return (
                                        <option key={category.data.id}>{ category.data.title }</option>
                                    );
                                })
                            }
                        </select>
                        <input style={{ padding: '10px', width: '100%', border: '1px solid gray', borderRadius: '7px' ,background: '#202024', margin: '10px', color: 'white'}} type="text" value={book.image} onChange={({ target }) => setBook({...book, image: target.value})} />
                        <button style={{ width: '80px',  margin: '10px', padding: '10px', borderRadius: '7px'}}>Editar</button>
                    </form>
                }
            </div>
            { loading &&  <Loading /> }
        </div>
    );
}