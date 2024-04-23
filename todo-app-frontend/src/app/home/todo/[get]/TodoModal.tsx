'use client'

import { createTodo, getImportantsTodos, getTodos, updateTodo } from "@/api/todoActions"
import { categoryState } from "@/store/atoms/categoryState"
import { todoState } from "@/store/atoms/todoState"
import { ICreateTodo } from "@/interface/todo/ICreateTodo"
import { ModalProps } from "@/interface/todo/IModal"
import { IUpdateTodo } from "@/interface/todo/IUpdateTodo"
import { CreateTodoSchema, createTodoValues } from "@/validations/validateCreateTodoForm"
import { UpdateTodoSchema, updateTodoValues } from "@/validations/validateUpdateTodoForm"
import { zodResolver } from "@hookform/resolvers/zod"
import { useSearchParams } from "next/navigation"
import { useForm } from "react-hook-form"
import { useRecoilState } from "recoil"
import { themeState } from "@/store/atoms/themeState"
import Swal from "sweetalert2"

function TodoModal({ id, openModal, closeModal, modalType }: ModalProps) {
  const [theme, __] = useRecoilState(themeState)
  const [categories,] = useRecoilState(categoryState)
  const [_, setTodos] = useRecoilState(todoState)
  const searchParams = useSearchParams()
  const search = searchParams.get('category')
  const { handleSubmit, register, reset, formState, watch } = useForm({
    mode: 'onSubmit',
    defaultValues: createTodoValues || updateTodoValues,
    resolver: zodResolver(CreateTodoSchema || UpdateTodoSchema)
  })

  const isCreateModal = modalType === 'create'
  
  const nonRestrictedCategories = categories.filter((category) => category.name !== 'todas' && category.name !== 'importantes')

  const handleSubmitFormErrors = () => {
    if (watch(['title'])[0].length < 6 ) {
       return Swal.fire({
        background: `${theme.theme === "dark" ? 'rgb(25,25,25)' : 'rgb(239, 246, 255)'}`,
        color: `${theme.theme === "dark" ? 'rgb(255,255,255)' : 'rgb(24, 24, 27)'}`,
        iconColor: 'rgb(255, 0, 0)',
        confirmButtonColor: 'rgb(16,185,129)',
        icon: "error",
        title: "Título inválido.",
        text: "O título deve conter pelo menos 6 caracteres."
      });
    }
    
    if (watch(['description'])[0].length < 30) {
       return Swal.fire({
        background: `${theme.theme === "dark" ? 'rgb(25,25,25)' : 'rgb(239, 246, 255)'}`,
        color: `${theme.theme === "dark" ? 'rgb(255,255,255)' : 'rgb(24, 24, 27)'}`,
        iconColor: 'rgb(255, 0, 0)',
        confirmButtonColor: 'rgb(16,185,129)',
        icon: "error",
        title: "Descrição inválida.",
        text: "A descrição deve conter pelo menos 30 caracteres."
      });
    }

    return closeModal()
  }

  const handleTodoReload = async () => {
    if (search) {
      const todos = await getTodos(search)
      setTodos(todos)
    }
    const importantTodos = await getImportantsTodos()
    setTodos(importantTodos)

  }

  const handleCreateTodo = async ({ title, description, category }: ICreateTodo) => {
    await createTodo({ title, description, category })
    handleTodoReload()
    reset()
  }

  const handleUpdateTodo = async ({ title, description, category }: IUpdateTodo) => {
    if (id) {
      await updateTodo({ title, description, category, id })
      handleTodoReload()
      reset()
    }
  }

  const handleRequest = isCreateModal ? handleCreateTodo : handleUpdateTodo
  
  return (
    <section
      className={openModal ? 'fixed z-10 flex items-center justify-center top-0 left-0 bg-black bg-opacity-80 gap-4 w-screen h-screen' : 'hidden'}>
      <form
        onSubmit={handleSubmit(handleRequest)}
        className={`flex flex-col gap-4 w-2/5 ${theme.theme === "dark" ? "bg-zinc-900 text-white" : "bg-blue-50 text-zinc-700"} rounded-2xl p-12 h-2/3`}>
        <label className="rounded-md text-lg outline-none" htmlFor="title">
          <input
            placeholder="Título"
            {...register('title')}
            className={`rounded-md p-2 text-lg w-full outline-none ${theme.theme === "dark" ? "bg-zinc-900 text-zinc-400" : "text-blue-500 placeholder:text-blue-500 bg-transparent"}`}
            type="text"
            id="title"
          />
        </label>

        <label className="rounded-md text-lg flex-1 outline-none" htmlFor="description">
          <textarea
            placeholder="Descrição"
            {...register('description')}
            className={`rounded-md h-full w-full p-2 text-lg outline-none ${theme.theme === "dark" ? "bg-zinc-900 text-zinc-400" : "text-blue-500 placeholder:text-blue-500 bg-transparent"}`}
            id="description"
          />
        </label>
        <label htmlFor="categories" className={`text-lg  font-bold ${theme.theme === "dark" ? "text-zinc-400" : "text-blue-500"}`}>Escolha uma categoria:</label>
        <select
          {...register("category")}
          className={`rounded-md p-2 text-lg border-0 ${theme.theme === "dark" ? "text-zinc-400 bg-zinc-900" : "text-blue-500 bg-transparent"} outline-none`} id="categories">
          <option className={`${theme.theme === "dark" ? "text-zinc-400" : "text-blue-500"}`}
          >Selecione uma categoria</option>
          {nonRestrictedCategories.map((category) => (
            <option key={category.id} value={category.name}>
              {category.name}
            </option>
          ))}
        </select>
        <button onClick={handleSubmitFormErrors} type="submit" className="bg-emerald-500 font-bold transition-all shadow-md hover:bg-emerald-800 p-2 rounded-md text-white mt-2">
          {isCreateModal ? ' Criar tarefa' : ' Atualizar tarefa'}
        </button>
        <button type="reset" onClick={closeModal} className="bg-red-500 font-bold transition-all shadow-md hover:bg-red-700 p-2 rounded-md text-white mt-2">
          Cancelar
        </button>
      </form>

    </section>
  )
}

export default TodoModal