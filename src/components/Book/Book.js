import React from "react"
import { Link, useNavigate, useParams } from "react-router-dom"
import { deleteBook, getBookById, getBooksByCategory } from "./BookFunctions"
import { Card } from "../Card/Card"
import './Book.css'
import { UserContext } from "../User/UserContext"
import { ToastContainer, toast } from "react-toastify"
import { AiFillStar, AiOutlineDelete, AiOutlineEdit, AiOutlineStar } from "react-icons/ai"


export function Book({ request}) {
    const { id } = useParams()
    const [book, setBook] = React.useState('')
    const [relatedBooks, setRelatedBooks] = React.useState('')
    const context = React.useContext(UserContext)
    const navigate = useNavigate();
    async function getBook(){
        setBook(await getBookById(id))
    }
    async function getRelatedBooks(){
        setRelatedBooks(await getBooksByCategory(book.category ? book.category : 'Todos', 5 ))
    }
    async function deleting(){
        deleteBook(id).then(() => {
            toast.success('Livro deletado com sucess', 
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }
            )
           
        }).then(() => {
            navigate('/livros')
        })
        .catch((error) => {
            toast.error('Ocorreu um erro ao deletar o livro, tente novamente', 
                {
                    position: "top-right",
                    autoClose: 3000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "colored",
                }
            );
        })
    }
    React.useEffect(() => {
        getBook();
        getRelatedBooks()
    }, [id])
    return (
        <div  style={{ display: 'flex', flexDirection: 'column', padding: '5rem', flexWrap: 'wrap'}}>
            <div>
                {
                    context.user &&
                    <div>
                        <Link to={'/editar/livro/'+id }>
                            <AiOutlineEdit style={{ margin: '15px'}} color="yellow" size={35} cursor="pointer" />
                        </Link>

                        <AiOutlineDelete style={{ margin: '15px'}} cursor="pointer" size={35} color="red" onClick={() => deleting()}/>

                        <AiOutlineStar style={{ margin: '15px'}} color="yellow" cursor="pointer" size={35}/>

                        <AiFillStar style={{ margin: '15px'}} color="yellow" cursor="pointer" size={35}/>
                    </div>
                    
                }
            </div>
            {
                book &&
                <div style={{ display: 'flex', flexDirection: 'column',  justifyContent: 'center', alignItems: 'center'}}>
                    <h1  style={{ color: 'white'}}>{ book.title }</h1>
                    <div style={{ display: 'flex', flexDirection: 'row',  justifyContent: 'space-evenly'}}>
                        <div style={{ display: 'flex', flexDirection: 'column',  justifyContent: 'center', alignItems: 'center'}}>
                            <img className="book-image" src={book.image}/>
                            <i  style={{ color: 'white'}}>{ book.category }</i>
                        </div>

                        <p style={{ padding: '3rem',  color: 'white'}}>{ book.description }</p>
                    </div>
                </div>
            }

            <div style={{ marginTop: '2rem'}}>
                <h1 style={{ color: 'white', marginLeft: '2rem'}}>VEJA TAMBÉM:</h1>
                <div style={{ display: 'flex', flexDirection: 'row'}}>
                    {
                        relatedBooks &&
                        relatedBooks.map(book => {
                            return (
                                <Card id={book.idDocument} book={book.data}/>
                            )
                        })
                    }
                </div>
            </div>
            <ToastContainer />
        </div>
    )
}