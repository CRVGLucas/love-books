import { addDoc, collection, getDoc, getDocs, query, where } from "firebase/firestore/lite";
import { fs } from "../../firebase/config";

export function createUser(user) {
    user.createdAt = new Date()
    const userCol = collection(fs, 'users');
    let querySnapshot = query(userCol, where('email', '==', user.email))
    var userStorage = null;
    querySnapshot.forEach((doc) => {
        userStorage =  { idDocument: doc.id, data: doc.data() };
    });
    if (userStorage){
        throw new Error("Já foi cadastrado um usuário com este email")
    } else {
        return addDoc(userCol, user);
    }
}

export async function login(form){
    const userCol = collection(fs, 'users');
    let queryBooks = query(userCol, where('email', '==', form.email) && where('password', '==', form.password));
    let bookSnapshot =  await getDocs(queryBooks);
    var user;
    bookSnapshot.forEach((doc) => {
        user =  { idDocument: doc.id, data: doc.data() };
    });
    return user;
}