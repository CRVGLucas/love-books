import { Link } from 'react-router-dom'
import './Card.scss'
export function Card ({ book , id }) {
    return (
        <div className='card'>
            
                <Link to={'/livro/'+ id}>
                <div className='card-front'>
                    <img className='card-img' src={book.image} alt="capa do livro" />
                </div>
                <div className='card-back'>
                    <p style={{ color: 'white'}}>fooooi</p>
                </div>
                    <div className='card-info'>
                        <h4 style={{ color: 'white'}}>{ book.title }</h4>
                        <i style={{ color: 'white'}}>{ book.category }</i>
                    </div>
                </Link>
        </div>
    )
}