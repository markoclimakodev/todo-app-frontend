import { MdAdd } from "react-icons/md";

function CreateTodo() {
  return (
    <section className="flex items-end p-2 rounded-md py-5 px-8 ">

    <div className="flex flex-col gap-3 ">

      <input className="placeholder:text-blue-500 rounded-md p-2 bg-white w-[95%] text-lg outline-none text-blue-500" placeholder="Título da tarefa" type="text"/>
      <textarea className="placeholder:text-blue-500 bg-white p-2 rounded-md w-[95%] text-lg outline-none text-blue-500" placeholder="Descrição da tarefa" cols={50} rows={5}/>

    </div>

    <button className="text-blue-500">
      <MdAdd className="hover:scale-125 transition-all" size={24} />
    </button>
    
    </section>
  )
}

export default CreateTodo