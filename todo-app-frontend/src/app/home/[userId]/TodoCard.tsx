import { ITodo } from "@/interface/ITodo"
import { MdBookmark, MdEditNote, MdStarBorder } from "react-icons/md"
import { useState } from "react";
import { formatDateTime } from "@/helpers/formatDateTime";
import { extractStringsWithPosition } from "@/helpers/extractStringsWithPosition";
import TodoDescription from "./TodoDescription";
import UpdateTodoModal from "./UpdateTodoModal";
import { FaRegTrashAlt } from "react-icons/fa";
import { useFetch } from "@/hooks/useFetch";
import { useAuth } from "@/hooks/useToken";


interface TodoCardProps {
  todo: ITodo,
}

function TodoCard({ todo }: TodoCardProps) {
  const { id, title, description, createdAt, updatedAt } = todo
  const [openTodo, setOpenTodo] = useState(false)
  const [openUpdateTodoModal, setOpenUpdateModal] = useState(false)

  const { token, userId } = useAuth()

  const { todoTask } = useFetch('http://localhost:3002/')

  const handleDeleteTodo = async () => {
    await todoTask({
      endpoint: `home/${userId}/${todo.id}`, 
      method: 'DELETE',
      token,
    })
  }

  const handleOpenTodo = () => {
    setOpenTodo(!openTodo)
  }

  const handleOpenUpdateModal = () => {
    setOpenUpdateModal(!openUpdateTodoModal)
  }

  const descriptionParts = extractStringsWithPosition(description)

  return (
    <section className="flex flex-col bg-white p-2 rounded-md py-5 px-8 gap-4 mt-5 hover:bg-blue-100 transition-all cursor-pointer" key={id} id={id} >

      < UpdateTodoModal openUpdateTodoModal={openUpdateTodoModal} todoId={id} closeUpdateTodoModal={handleOpenUpdateModal}/>

      <section className="text-lg text-gray-700 flex w-full justify-between pl-1 ">

        <section className="flex items-center w-full" onClick={handleOpenTodo}>
          <MdBookmark />
          <span className="cursor-pointer">{title}</span>
        </section>

        <section className="flex items-center gap-1">

          <button onClick={handleOpenUpdateModal}>
            <MdEditNote  title="Editar Tarefa" className="cursor-pointer size-6 hover:scale-150 transition-all" color="rgb(59 130 246)" />
          </button>
          <button>
            <MdStarBorder title="Adicionar à lista de importantes" color="rgb(59 130 246)" className="cursor-pointer size-6 hover:scale-150 transition-all" />
          </button>
          <button onClick={handleDeleteTodo}>
            <FaRegTrashAlt title="Excluir Tarefa"  className="cursor-pointer size-4 hover:scale-150 transition-all" color="rgb(59 130 246)" />
          </button>

        </section>

      </section>

      <section className={openTodo ? 'transition ease-out duration-300 transform flex flex-col gap-4' : 'hidden'} onClick={handleOpenTodo}>

    <TodoDescription descriptionParts={descriptionParts} description={description} />
        <footer className="px-3  pt-3 flex w-fit flex-col text-[10px] text-gray-600 text-start">
            <span >Criado em: {formatDateTime(String(createdAt))}</span>
            <span>Atualizado em: {formatDateTime(String(updatedAt))}</span>
        </footer>
      </section>

    </section>
  )
}

export default TodoCard