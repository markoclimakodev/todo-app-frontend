import { ITodo } from "@/interface/ITodo"
import { MdBookmark } from "react-icons/md"
import { useState } from "react";
import TodoAction from "./TodoActions";
import { actionButtons } from "./data";
import { formatDateTime } from "@/helpers/formatDateTime";
import { extractStringsWithPosition } from "@/helpers/extractStringsWithPosition";
import TodoDescription from "./TodoDescription";


interface TodoCardProps {
  todo: ITodo,
}

function TodoCard({ todo }: TodoCardProps) {
  const { id, title, description, createdAt, updatedAt } = todo
  const [openTodo, setOpenTodo] = useState(false)

  const handleTodo = () => {
    setOpenTodo(!openTodo)
  }

  const descriptionParts = extractStringsWithPosition(description)



  return (
    <section className="flex flex-col bg-white p-2 rounded-md py-5 px-8 gap-4 mt-5 hover:bg-blue-100 transition-all cursor-pointer" key={id} id={id} >

      <section className="text-lg text-gray-700 flex w-full justify-between pl-1 ">
        <section className="flex items-center w-full" onClick={handleTodo}>
          <MdBookmark />
          <span className="cursor-pointer">{title}</span>
        </section>
        <section className="flex items-center gap-1">
          {
            actionButtons.map((action) => <TodoAction icon={action.icon} key={action.id} id={action.id} />)
          }
        </section>

      </section>

      <section className={openTodo ? 'transition ease-out duration-300 transform flex flex-col gap-4' : 'hidden'} onClick={handleTodo}>

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