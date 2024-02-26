'use client'
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { useFetch } from "@/hooks/useFetch"
import { useAuth } from "@/hooks/useAuth"

import { UpdateTodoSchema, initialUpdateTodoFormValues } from "@/validations/validateUpdateTodoForm"
import { categories } from "./data/categories"
import { ModalProps } from "@/interface/todo/IModal"
import { IUpdateTodo } from "@/interface/todo/IUpdateTodo"

function TodoModal({  id, openModal,closeModal,modalType,userId }: ModalProps) {
  const { token } = useAuth()
  
  const { createRequest } = useFetch()

  const { register, handleSubmit, reset } = useForm<IUpdateTodo>({
    resolver: zodResolver(UpdateTodoSchema),
    mode: 'onSubmit',
    defaultValues: initialUpdateTodoFormValues
  })

  const isCreateModal = modalType === 'create'

  const handleRequest = async ({ title, description, taskType }: IUpdateTodo) => {
    const resquestData = isCreateModal ?  { title, description, taskType, userId} :  { title, description, taskType, id }
    const endpoint = isCreateModal  ? 'todo/create' : 'todo/update/'
    const method = isCreateModal  ? 'POST' : 'PATCH'
    await createRequest({
      baseUrl: 'http://localhost:3002/',
      endpoint,
      resquestData,
      method,
      token,
    })

    reset()
  }

  return (
    <section
    className={openModal ? 'fixed z-10 flex items-center justify-center top-0 left-0 bg-black bg-opacity-80 gap-4 w-screen h-screen' : 'hidden'}>

      <form onSubmit={handleSubmit(handleRequest)} className="flex flex-col gap-4 w-2/5 bg-slate-200 rounded-2xl p-12 h-2/3">
        <label className="rounded-md text-lg outline-none text-blue-500" htmlFor="title">
          <input
            placeholder="Título"
            {...register('title')}
            className="rounded-md shadow-md p-2 text-lg outline-none text-blue-500 placeholder:text-blue-500 bg-white placeholder:font-bold"
            type="text"
            id="title"
          />
        </label>

        <label className="rounded-md text-lg flex-1 outline-none text-blue-500" htmlFor="description">
          <textarea
            placeholder="Descrição"
            {...register('description')}
            className="rounded-md shadow-md h-full w-full p-2 text-lg outline-none text-blue-500 placeholder:text-blue-500 placeholder:font-bold bg-white"
            id="description"
          />
        </label>
        <label htmlFor="categories" className=" text-lg  font-bold text-blue-500">Escolha uma categoria:</label>
        <select {...register("taskType")} className="rounded-md p-2 bg-white text-lg font-bold border-0 text-blue-500 outline-none" id="categories">
          <option value=""
          >Selecione uma categoria</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {category}
            </option>
          ))}
        </select>
        <button onClick={closeModal} type="submit" className="bg-emerald-500 font-bold transition-all shadow-md hover:bg-emerald-800 p-2 rounded-md text-white mt-2">
          { isCreateModal ? ' Criar tarefa': ' Atualizar tarefa'}
        </button>
        <button onClick={closeModal} className="bg-red-500 font-bold transition-all shadow-md hover:bg-red-700 p-2 rounded-md text-white mt-2">
          Cancelar
        </button>
      </form>

    </section>
  )
}

export default TodoModal