import { useEffect, useState } from "react"


export const useAuth = () => {
    const [token,setToken] = useState('')
    const [userId,setUserId] = useState('')

    useEffect(()=>{
        const storedToken = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userId');

        if(storedToken && storedUserId) {
            setToken(storedToken)
            setUserId(storedUserId)
        }
    },[])  

    const saveAuth = (newToken:string, newUserID:string) => {
        localStorage.setItem('token', newToken)
        localStorage.setItem('userID', newUserID)

        setToken(newToken)
        setUserId(newUserID)
    }

    const clearAuth = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userID')

        setToken('')
        setUserId('')
    }

    return {token, userId,saveAuth,clearAuth}
}