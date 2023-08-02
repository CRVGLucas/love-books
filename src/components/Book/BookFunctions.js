import { addDoc, collection, deleteDoc, doc, getDoc, getDocs, limit, orderBy, query, updateDoc, where } from 'firebase/firestore/lite';
import { fs } from '../../firebase/config';

export async function getBooks(limitBooks = null){
    const bookCollection = collection(fs, 'books');
    let bookquery
    if(limitBooks){
        bookquery = query(bookCollection, limit(limitBooks), orderBy('createdAt'));
    } else {
        bookquery = query(bookCollection)
    }
    const bookSnapshot = await getDocs(bookquery);
    var booksList = [];
    bookSnapshot.forEach(doc => booksList.push( { idDocument: doc.id, data: doc.data() }));
    return booksList;
}
export async function searchBooks(search){
    const bookCollection = collection(fs, 'books');
    const bookSnapshot = await getDocs(bookCollection);
    var booksList = [];
    bookSnapshot.forEach(doc => booksList.push( { idDocument: doc.id, data: doc.data() }));
    var bookFilter = booksList.filter(book => book.data.title.toLowerCase().includes(search.toLowerCase()) || book.data.description.toLowerCase().includes(search.toLowerCase()))
    return bookFilter
}
export async function getBooksByCategory(category, limitBooks = null){
    const tasksCol = collection(fs, 'books');
    var queryTasks;
    if (category === 'Todos'){
        if(limitBooks){
            queryTasks = query(tasksCol, limit(limitBooks));
        }else {
            queryTasks = query(tasksCol);
        }
    } else {
        if(limitBooks){
            queryTasks = query(tasksCol, where('category', '==', category), limit(limitBooks));
        }else{
            queryTasks = query(tasksCol, where('category', '==', category));
        }
    } 
    const querySnapshot = await getDocs(queryTasks);
    var tasksList = [];
    querySnapshot.forEach((doc) => {
        tasksList.push( { idDocument: doc.id, data: doc.data() });
    });
    return tasksList;
}
export async function getBookById(id){
    const bookRef = doc(fs, 'books', id);
    var bookSnap = await getDoc(bookRef);
    return bookSnap.data()
}
export async function getBookCategories(){
    const categoryCol = collection(fs, 'categories');
    const queryCol = query(categoryCol);
    const querySnapshot = await getDocs(queryCol);
    var tasksList = [];
    querySnapshot.forEach(doc => tasksList.push( { idDocument: doc.id, data: doc.data() }));
    return tasksList;
}
export function createBook(book) {
    book.createdAt = new Date()
    const categoryCol = collection(fs, 'books');
    return addDoc(categoryCol, book);
}
export function editBook(book, id) {
    const docRef = doc(fs, 'books', id);
    return updateDoc(docRef, book);
}
export async function deleteBook(id) {
    const docRef = doc(fs, 'books', id);
    //var docSnap = await getDoc(docRef);
    return deleteDoc(docRef);
    
}