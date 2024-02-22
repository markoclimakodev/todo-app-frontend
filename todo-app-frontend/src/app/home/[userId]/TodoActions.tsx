import React from "react"
import { FaRegTrashAlt } from "react-icons/fa"
import { MdEditNote, MdStarBorder } from "react-icons/md"

interface TodoActionProps {
icon: React.ReactNode
id: string
}

function TodoAction ({icon,id}:TodoActionProps) {
return (
    <section className="flex items-center gap-1">
    <button id={id}>
   {icon}
    </button>
  </section>
)
}

export default TodoAction
