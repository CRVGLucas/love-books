import { Card } from "../Card/Card";
import { UserContext } from "../User/UserContext"
import { getBookById, returnBookFavoriteByUser } from "./BookFunctions"
import React from 'react';

export function FavoritesBooks() {
    const context = React.useContext(UserContext)
    const [ favorites , setFavorites ] = React.useState('')
    const [books, setBooks ] = React.useState('')
    async function getFavorites(){
        const fav = await returnBookFavoriteByUser(context.user.idDocument)
        setFavorites(fav)
        fav.map( async f => {
            console.log("id: ", f.data.idBook)
            const book = await  getBookById(f.data.idBook)
            book.id = f.data.idBook
            setBooks([...books, book ])
       })
       console.log('lviros: ', books)

    }


    React.useEffect(() => {
        getFavorites()
    }, [])


    return (
        <div style={{ display: 'flex', flexDirection: 'row'}}>
            {
                books.length > 0 &&
                books.map( book => {
                    return (
                        <Card key={ book.id } id={ book.id } book={ book }/>
                    )
                })
            }
            {
                !favorites && <p style={{ color: 'white'}}>Lista de favoritos vazia</p>
            }
        </div>
    )
}