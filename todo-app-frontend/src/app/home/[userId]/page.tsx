'use client'
import { usePathname } from "next/navigation"
import { useCallback, useEffect, useState } from "react"
import { useFetch } from "@/hooks/useFetch"
import Sidebar from "@/components/Sidebard/Sidebar"
import TodoCard from "./TodoCard"
import CreateTodo from "./CreateTodo"
import { ITodo } from "@/interface/ITodo"
import { useAuth } from "@/hooks/useToken"
import Icon from "@/components/Icon"

export default function Todos() {
    const endpoint = usePathname()
    const { apiResponse, todoTask } = useFetch('http://localhost:3002')
    const [todos, setTodos] = useState<ITodo[]>([])
    const [completedTodos, setCompletedTodos] = useState<ITodo[]>([])
    const { token } = useAuth()

    const fetchTodos = useCallback(async () => {
        try {
            await todoTask({
                endpoint,
                method: 'GET',
                token,
            });

            if (apiResponse && apiResponse.data) {
                const allTodos = apiResponse.data as ITodo[];
                const pendingTodos = allTodos.filter((todo) => !todo.completed);
                const completedTodos = allTodos.filter((todo) => todo.completed);

                setTodos(pendingTodos);
                setCompletedTodos(completedTodos);
            }
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    }, [apiResponse, endpoint, todoTask, token])


    useEffect(() => {
        fetchTodos();
    }, [fetchTodos]);

    return (
        <main className="flex ">
            <Sidebar />
            <section className="flex flex-col bg-slate-100   w-full h-screen overflow-auto">
                <header className="flex gap-2 items-center p-10 text-blue-500 font-bold text-2xl ">
                    <Icon iconName="ListTodo" size={28} />Tarefas
                </header>

                <CreateTodo />

                <section className="w-full flex flex-col p-10">
                    {
                        todos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
                    }
                </section>

                {/* <section className="p-8 text-xl font-bold text-gray-700">
                    <details>
                        <summary className="list-outside ml-7 pl-2 hover:cursor-pointer">Concluídas</summary>
                        <ul>
                            {
                                completedTodos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
                            }
                        </ul>
                    </details>
                </section> */}

            </section>
        </main>
    )
}