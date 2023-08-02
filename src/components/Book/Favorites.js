import { Card } from "../Card/Card";
import { UserContext } from "../User/UserContext"
import { getBookById, returnBookFavoriteByUser } from "./BookFunctions"
import React from 'react';

export function FavoritesBooks() {
    const context = React.useContext(UserContext)
    const [ favorites , setFavorites ] = React.useState('')
    async function getFavorites(){
        const fav = await returnBookFavoriteByUser(context.user.idDocument)
        if (fav){
            const books = []
            fav.map( async (favorite) => { books.push( { idDocument:favorite.data.idBook, data: await getBookById(favorite.data.idBook)}) } )
            console.log(books)
            setFavorites(books)
        } else {
            setFavorites(null)
        }
    }

    React.useEffect(() => {
        getFavorites()
    }, [])



    return (
        <div>
            {
                favorites && 
                favorites.map((favorite) => {
                    return (
                        <Card key={favorite.idDocument} id={favorite.idDocument} book={favorite.data}/>
                    )
                })
            }
        </div>
    )
}