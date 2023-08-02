import React from 'react'
export const UserContext = React.createContext()

export default function UserStorage ({ children }) {
    const userLogged = localStorage.getItem('user')
    const [user, setUser] = React.useState(userLogged ? JSON.parse(userLogged) : '');
    return (
        <UserContext.Provider value={{ user, setUser}}>
            {children}
        </UserContext.Provider>
    )
}