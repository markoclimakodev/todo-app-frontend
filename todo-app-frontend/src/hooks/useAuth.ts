import { useEffect, useState } from "react"
import useNavigateTo from "./useNavigateTo";
import { UseAuthReturnType } from "@/interface/hooks/UseAuthReturnType";

export const useAuth = ():UseAuthReturnType => {
    const [token, setToken] = useState('')
    const [userId, setUserId] = useState('')
    const navigateTo = useNavigateTo();

    useEffect(() => {
        const storedToken = localStorage.getItem('token');
        const storedUserId = localStorage.getItem('userID');

        if (storedToken && storedUserId) {
            setToken(storedToken)
            setUserId(storedUserId)
        }
    }, [])

    const saveAuth = (newToken: string, newUserID: string) => {
        localStorage.setItem('token', newToken)
        localStorage.setItem('userID', newUserID)

        setToken(newToken)
        setUserId(newUserID)
        navigateTo('home/todo/get?tasktype=todas%20tarefas')
    }

    const clearAuth = () => {
        localStorage.removeItem('token')
        localStorage.removeItem('userID')

        setToken('')
        setUserId('')
        navigateTo('/login')
    }

    return { token, userId, saveAuth, clearAuth }
}