"use client"

import React, { useState } from 'react';

import Icon from '@/components/Icon';
import TodoDescription from './TodoDescription';
import TodoModal from './TodoModal';

import { extractStringsWithPosition } from '@/helpers/extractStringsWithPosition';
import { formatDateTime } from '@/helpers/formatDateTime';

import { useFetch } from '@/hooks/useFetch';
import { useAuth } from '@/hooks/useAuth';
import { useToggle } from '@/hooks/useToggle';
import { motion } from 'framer-motion'
import { ITodoCardProps } from '@/interface/todo/ITodoCardProps';


export function TodoCard({ todo }: ITodoCardProps) {
  const { id, title, description, createdAt, updatedAt } = todo

  const [openTodo, setOpenTodo] = useState(false)

  const { isOpen, toggle } = useToggle(false);

  const { token } = useAuth()

  const { createRequest } = useFetch()

  const handleDeleteTodo = async () => {
    await createRequest({
      baseUrl:'http://localhost:3002/',
      endpoint: 'todo/delete/', 
      method: 'DELETE',
      resquestData: {id},
      token,
    })
  }

  const handleOpenTodo = () => {
    setOpenTodo(!openTodo)
  }

  const descriptionParts = extractStringsWithPosition(description)

  return (
    <motion.section
    initial={{y: 20, opacity: 0}}
    animate={{y: 0, opacity: 1}}
    transition={{ease: 'easeInOut', duration: 0.35, delay: 0.35}}
    className="flex flex-col bg-white p-2 rounded-md py-5 px-8 gap-4 mt-5 hover:bg-blue-100 transition-all cursor-pointer" key={id} id={id} >

      < TodoModal id={id} openModal={isOpen} closeModal={toggle} modalType='update'/>

      <section className="text-lg text-gray-700 flex w-full justify-between pl-1 ">

        <section className="flex items-center w-full gap-2" onClick={handleOpenTodo}>
        <Icon iconname="Bookmark" className="fill-[#374151]" size={20}/>

          <span className="cursor-pointer">{title}</span>
        </section>

        <section className="flex items-center gap-2">

          <button onClick={toggle}>
          <Icon iconname='FilePenLine' title="Adicionar à lista de importantes" color="rgb(59 130 246)" size={20} className="cursor-pointer hover:scale-150 transition-all" />

          </button>
          <button>
            <Icon iconname='Star' title="Adicionar à lista de importantes" color="rgb(59 130 246)" size={20} className="cursor-pointer hover:scale-150 transition-all" />
          </button>
          <button onClick={handleDeleteTodo}>
          <Icon iconname='Trash2' title="Adicionar à lista de importantes" color="rgb(59 130 246)" size={20} className="cursor-pointer hover:scale-150 transition-all" />

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

    </motion.section>
  )
}

export default TodoCard