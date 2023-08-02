import './App.css';
import { Home } from './components/Home';
import { Header } from './components/Header';
import { CreateBook } from './components/Book/Create';
import { Route, RouterProvider, Routes, createBrowserRouter } from 'react-router-dom';
import { ListBooks } from './components/Book/List';
import { BrowserRouter } from "react-router-dom";
import { Book } from './components/Book/Book';
import { EditBook } from './components/Book/Edit';
import { Login } from './components/User/Login';
import { Register } from './components/User/Register';
import UserStorage from './components/User/UserContext';

function App() {
  return (
    <BrowserRouter>
      <UserStorage>
        <div style={{ display: 'flex', flexDirection: 'row', backgroundColor: '#121214'}}>
          <Header/>
          <Routes>
            <Route path='/' element={ <Home/> }/>
            
            <Route path='/livros' element={ <ListBooks/>} />
            <Route path='/livro/:id' element={ <Book/> }/>
            <Route path='/editar/livro/:id' element={ <EditBook/> }/>
            <Route path='/login' element={ <Login/> }/>

            <Route path='/criar/livro' element={ <CreateBook/> }/>
            <Route path='/criar/usuario' element={ <Register/> }/>
          </Routes>
        </div>
      </UserStorage>
    </BrowserRouter>
  );
}

export default App;
