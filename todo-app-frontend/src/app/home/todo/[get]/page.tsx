'use client'

import React, { useEffect, useState } from 'react';

import Icon, { IconNames } from '@/components/Icon';
import { TodoCard } from './TodoCard';

import { capitalizeTaskTypeLetter } from '@/helpers/capitalizeFirstLetter';

import { useToggle } from '@/hooks/useToggle';
import { useSearchParams } from 'next/navigation';


import TodoModal from './TodoModal';
import { handleCategoryIcons } from '@/helpers/handleCategoryIcons';
import { todoState } from '@/store/atoms/todoState';
import { useRecoilState } from 'recoil';
import { getImportantsTodos, getTodos } from '@/api/todoActions';
import { auth } from '@/api/auth';
import { themeState } from '@/store/atoms/themeState';


function Todos() {
	const searchParams = useSearchParams()
	const search = searchParams.get('category')
	const [theme, setTheme] = useRecoilState(themeState)
	
	const { userId } = auth()
	const [todos, setTodos] = useRecoilState(todoState)

	useEffect(() => {
		const fetchTodos = async () => {
			if (search) {
				const todos = search === "importantes" ? await getImportantsTodos() : await getTodos(search)
				setTodos(todos)
			}
		}
		fetchTodos()
	}, [search, setTodos])

	const handleTheme = () => {
		if (theme.theme === "dark") {
			return setTheme({theme: 'light'})
		}
		setTheme({theme: 'dark'})
	}

	const [isOpen, toggle] = useToggle(false);

	const restrictedCategories = search !== 'importantes' && search !== 'todas'

	const welcomeText = restrictedCategories ? 'Que tal dar o pontapé inicial?' : 'Que tal criar uma nova lista de tarefas?'

	const icon = handleCategoryIcons(String(search)) as IconNames

	return (
		<>
			<header className="flex justify-between p-10 font-bold text-2xl ">
				<div className={`flex gap-3 items-center ${theme.theme === "dark" ? "text-white" : "text-blue-500"} transition-all`}>
					<Icon iconname={icon || 'BookmarkCheck'} size={28} />{capitalizeTaskTypeLetter(String(search))}
					{todos.length === 0 ? (
						''
					) : (
						<button
							className={`flex font-light ${theme.theme === "dark" ? "bg-zinc-700 hover:bg-zinc-500" : "bg-blue-400 hover:bg-blue-600"} transition-all rounded-md text-white`}
							onClick={toggle}>
							<Icon iconname="Plus" size={24} title="Clique para adicionar uma tarefa" />
						</button>
					)}
				</div>
				<button onClick={handleTheme} className={`hover:scale-150 ${theme.theme === "dark" ? "text-white" : "text-blue-500"} transition-all`}>
					<Icon iconname={theme.theme === "dark" ? "Sun" : "Moon"} size={24}/>
				</button>
			</header>

			<TodoModal openModal={isOpen} closeModal={toggle} modalType='create' userId={userId} />

			<section className="w-full h-screen flex flex-col p-10 ">

				{todos.length > 0 ? (
					todos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
				) : (
					<section className='flex flex-col gap-2 items-center justify-center flex-1 h-full'>
						<p className={`text-2xl ${theme.theme === "dark" ? "text-zinc-400" : "text-blue-500"} transition-all`}>
							{search === "importantes" && `Você ainda não adicionou nenhuma tarefa na lista de importantes.`}
							{search !== "importantes" && `Ops! Essa lista ainda está vazia. ${welcomeText}`}
						</p>
					{ restrictedCategories && (
						<button
							className={`w-fit flex p-2 font-semibold text-white ${theme.theme === "dark" ? "bg-zinc-700 hover:bg-zinc-500" : "bg-blue-400 hover:bg-blue-500"} transition-all rounded-md`}
							onClick={toggle}
						>
							Adicionar tarefa
						</button>
					)}
					</section>
				)}
			</section>
		</>
	)
}

export default Todos