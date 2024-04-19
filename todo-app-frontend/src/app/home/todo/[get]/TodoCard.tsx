"use client"

import React, { useState } from 'react';

import Icon from '@/components/Icon';
import TodoDescription from './TodoDescription';
import TodoModal from './TodoModal';

import { extractStringsWithPosition } from '@/helpers/extractStringsWithPosition';
import { formatDateTime } from '@/helpers/formatDateTime';
import { useToggle } from '@/hooks/useToggle';
import Transition from '@/app/transition';
import { ITodo } from '@/interface/todo/ITodo';
import { useSearchParams } from 'next/navigation';
import { addImportant, deleteTodo, getImportantsTodos, getTodos } from '@/api/todoActions';
import { todoState } from '@/store/atoms/todoState';
import { useRecoilState } from 'recoil';

type TodoCardProps = {
  todo: ITodo
}

export function TodoCard({ todo }: TodoCardProps) {
  const [openTodo, setOpenTodo] = useState(false)
  const [isOpen, toggle] = useToggle(false);
  const searchParams = useSearchParams()
  const search = searchParams.get('category')
  const [_, setTodos] = useRecoilState(todoState)

  const handleOpenTodo = () => {
    setOpenTodo(!openTodo)
  }

  const handleTodoReload = async () => {
    if (search) {
      const todos = search === "importantes" ? await getImportantsTodos() : await getTodos(search)
      setTodos(todos)
    }
  }

  const handleAddImportant = async () => {
    let newImportantStatus;
    if (todo.important === true) {
        newImportantStatus = false;
        handleTodoReload() // Se a tarefa já é importante, vamos remover da lista
    } else {
        newImportantStatus = true;
        handleTodoReload() // Se a tarefa não é importante, vamos adicionar à lista
    }

    const updatedTodo = { id: todo.id, important: newImportantStatus };

    await addImportant(updatedTodo);
    handleTodoReload()
  }

  const handleDeleteTodo = async () => {
    await deleteTodo(todo.id)
    handleTodoReload()
  }

  const descriptionParts = extractStringsWithPosition(todo.description)

  return (
    <Transition>

      <section
        className="flex flex-col bg-white p-2 rounded-md py-5 px-8 gap-4 mt-5 hover:bg-blue-100 transition-all cursor-pointer" key={todo.id} id={todo.id} >

        < TodoModal id={todo.id} openModal={isOpen} closeModal={toggle} modalType='update' />

        <section className="text-lg text-gray-700 flex w-full justify-between pl-1 ">

          <section className="flex items-center w-full gap-2" onClick={handleOpenTodo}>
            <Icon iconname="Bookmark" className="fill-[#374151]" size={20} />

            <span className="cursor-pointer">{todo.title}</span>
          </section>

          <section className="flex items-center gap-2">

            <button onClick={toggle}>
              <Icon iconname='FilePenLine' title="Adicionar à lista de importantes" color="rgb(59 130 246)" size={20} className="cursor-pointer hover:scale-150 transition-all" />

            </button>
            <button onClick={handleAddImportant}>
              <Icon iconname='Star' title="Adicionar à lista de importantes" color="rgb(59 130 246)" size={20} className={`cursor-pointer hover:scale-150 transition-all ${todo.important === true ? 'fill-blue-500' : ''}`} />
            </button>
            <button onClick={handleDeleteTodo}>
              <Icon iconname='Trash2' title="Adicionar à lista de importantes" color="rgb(59 130 246)" size={20} className="cursor-pointer hover:scale-150 transition-all" />

            </button>

          </section>

        </section>

        <section className={openTodo ? 'transition ease-out duration-300 transform flex flex-col gap-4' : 'hidden'}>

          <TodoDescription descriptionParts={descriptionParts} description={todo.description} />
          <footer className="px-3  pt-3 flex w-fit flex-col text-[10px] text-gray-600 text-start">
            <span >Criado em: {formatDateTime(String(todo.createdAt))}</span>
            <span>Atualizado em: {formatDateTime(String(todo.updatedAt))}</span>
          </footer>
        </section>

      </section>
    </Transition>

  )
}

export default TodoCard