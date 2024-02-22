import { FaRegTrashAlt } from "react-icons/fa";
import { MdEditNote, MdStarBorder } from "react-icons/md";

export const actionButtons = [
    { id: 'edit',icon: <MdEditNote  title="Editar Tarefa" className="cursor-pointer size-6 hover:scale-150 transition-all" color="rgb(59 130 246)" /> },
    { id: 'important',icon: <MdStarBorder title="Adicionar à lista de importantes"  className="cursor-pointer size-6 hover:scale-150 transition-all" color="rgb(59 130 246)" /> },
    { id: 'remove',icon: <FaRegTrashAlt title="Excluir Tarefa"  className="cursor-pointer size-4 hover:scale-150 transition-all" color="rgb(59 130 246)" /> }
  ]