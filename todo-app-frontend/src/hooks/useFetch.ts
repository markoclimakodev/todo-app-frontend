import { Todo } from "@/interface/Todo";
import { useEffect, useState } from "react";

type Method = 'GET' | 'POST' | 'PATCH' | 'PUT' | 'DELETE'

export const useFetch =  (endpoint:string, method:Method, token:string) => {
    const [ data ,setData] = useState([])
    useEffect(() => {
        const fetchTodos = async () => {
            try {
                const response = await fetch(`http://localhost:3002${endpoint}`, {
                    method,
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                if (!response.ok) {
                    throw new Error("Erro");
                }

                const data = await response.json();
                setData(data)
            } catch (error) {
                console.error("Erro", error);
            }
        };

        fetchTodos();
        console.log('olha eu aqui')
    }, [token, endpoint,method]);

return data 
}