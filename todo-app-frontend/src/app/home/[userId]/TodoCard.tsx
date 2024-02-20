import { Todo } from "@/interface/Todo"
import { MdStarBorder, MdBookmark, MdEditNote } from "react-icons/md"
import { FaRegTrashAlt } from "react-icons/fa";
import { useState } from "react";


interface TodoCardProps {
  todo: Todo,
}

function TodoCard({ todo}: TodoCardProps) {
  const { id, title, description, createdAt, updatedAt } = todo
  const [ openTodo, setOpenTodo] = useState(false)

  const handleTodo = () => {
    setOpenTodo(!openTodo)
  }


  return (
    <section className="flex flex-col bg-white p-2 rounded-md py-5 px-8 gap-4 mt-5 hover:bg-blue-100 transition-all cursor-pointer" key={id} id={id} onClick={handleTodo}>

      <section className="text-lg text-gray-700 flex w-full justify-between pl-1 ">
        <span className="flex items-center gap-4">
          <MdBookmark />
          <label className="cursor-pointer" htmlFor="selectedTask">{title}</label>
        </span>
        <section className="flex items-center gap-1">
          <button>
            <MdEditNote title="Editar Tarefa" className="cursor-pointer size-6 hover:scale-150 transition-all" color="rgb(59 130 246)" />
          </button>
          <button>
            <MdStarBorder title="Adicionar à lista de importantes" className="cursor-pointer size-6 hover:scale-150 transition-all" color="rgb(59 130 246)" />
          </button>
          <button>
            <FaRegTrashAlt title="Excluir Tarefa" className="cursor-pointer size-4 hover:scale-150 transition-all" color="rgb(59 130 246)" />
          </button>
        </section>
      </section>

    <section className={openTodo ? 'transition ease-out duration-300 transform' : 'hidden'}>
 
          <p>{description}</p>
      
  
    </section>

    </section>
  )
}

export default TodoCard