'use client'
import Sidebar from "@/components/Sidebard/Sidebar"
import { Todo } from "@/interface/Todo"
import { usePathname } from "next/navigation"
import { MdOutlineHome, } from "react-icons/md"
import { useFetch } from "@/hooks/useFetch"
import TodoCard from "./TodoCard"
import CreateTodo from "./CreateTodo"

export default function Todos() {
    const token = localStorage.getItem('token') || ''
    const endpoint = usePathname()
    const todos:Todo[] = useFetch(endpoint,'GET',token)

    return (
        <main className="flex">
            
            <Sidebar />

            <section className="bg-slate-100 w-full p-5">

                <header className="flex gap-2 items-center ml-6 mt-10 mb-8 text-blue-500 font-bold text-2xl"><MdOutlineHome size={28} />Tarefas</header>

                <CreateTodo />

                <section className="w-full flex flex-col px-8">
                    {
                        todos.map((todo) => <TodoCard key={todo.id} todo={todo}/>)
                    }
                </section>

                <div className="p-8 text-xl font-bold text-gray-700">
                    <details>
                        <summary className="list-outside ml-7 pl-2 hover:cursor-pointer">Concluídas</summary>
                    </details>
                </div>

            </section>
        </main>
    )
}