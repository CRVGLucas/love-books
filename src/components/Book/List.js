import React from "react"
import { getBookCategories, getBooks, getBooksByCategory, searchBooks } from "./BookFunctions";
import { Link } from "react-router-dom";
import { Card } from "../Card/Card";
import { UserContext } from "../User/UserContext";

export function ListBooks() {
    const [books, setBooks] = React.useState([]);
    const [categories, setCategories] = React.useState([]);
    const [search, setSearch] = React.useState([]);
    const context = React.useContext(UserContext);
    async function filterBookByCategory(category){
        console.log("categoria: ", category);
        setBooks(await getBooksByCategory(category))
    }

    async function initCategories(){
        setCategories(await getBookCategories());
    }

    async function initBooks(){
        const storeBooks = await getBooks()
        setBooks(storeBooks)
        console.log('livros: ', books);
    }
    async function searchBooksByText(event){
        event.preventDefault();
        setBooks(await searchBooks(search))
    }

    React.useEffect(() => {
        initBooks();
        initCategories();
    }, [])

    return (
        <div style={{ width: '100%', height: '100%'}}>
            <div style={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', padding: '10px', marginBottom: '20px'}}>
                
                {
                    context.user &&
                    <Link style={{ textDecoration: 'none', color: 'green', border: '1px solid green', borderRadius: '7px', padding: '10px'}} to="/criar/livro">Criar novo Livro</Link>
                }

                <select style={{ minWidth: '300px', padding: '10px', borderRadius: '10px', color: 'white', background: '#202024'}} onChange={({ target }) => filterBookByCategory(target.value)}>
                    <option>Todos</option>
                    {
                        categories &&
                        categories.map(category => {
                            return (
                                <option>{ category.data.title }</option>
                            );
                        })
                    }
                </select>
                <form onSubmit={(event) => searchBooksByText(event)}>
                    <input style={{ padding: '10px', borderRadius: '10px', border: '2px solid gray', color: 'white', background: '#202024', minWidth: '300px'}} type="text" onChange={({ target }) => setSearch(target.value)}/>
                    <button style={{ padding: '10px', margin: '10px', borderRadius: '7px', background: 'gray', cursor: 'pointer'}}>Buscar</button>
                </form>
            </div>

            <div style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly', flexWrap: 'wrap'}}>
                {
                    books &&
                    books.map(book => {
                        return (
                            <Card key={book.idDoument} id={book.idDocument} book={book.data}/>
                        );
                    })
                }
            </div>

        </div>
    )
}