import React from 'react';
import uuid from 'react-uuid';
import { getBooks } from './Book/BookFunctions';
import { Card } from './Card/Card';
import './Home.css';
export function Home() {
    const [books, setBooks] = React.useState([])
    async function initBooks() {
       const storeBooks = await getBooks(10);
       setBooks(storeBooks); 
    }
    React.useEffect(()=> {
        initBooks()
        console.log('books: ', books)
    }, [])
    return (
        <div style={{ width: '100%', height: '100%'}}> 
            <h1 style={{ textAlign: 'center', color: 'white'}}>Últimas postagens</h1>
            <div className='container'>
                {
                    books &&
                    books.map(book => {
                        return (
                            <Card key={book.idDocument}  id={book.idDocument} book={book.data} />
                        )
                    })
                }
            </div>
       </div>
    );
}