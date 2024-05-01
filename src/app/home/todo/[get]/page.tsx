'use client'

import React, { useEffect } from 'react';

import Icon, { IconNames } from '@/components/Icon';
import { TodoCard } from './TodoCard';

import { capitalizeTaskTypeLetter } from '@/helpers/capitalizeFirstLetter';

import { useToggle } from '@/hooks/useToggle';
import { useSearchParams } from 'next/navigation';

import TodoModal from './TodoModal';
import { handleCategoryIcons } from '@/helpers/handleCategoryIcons';
import { todoState } from '@/store/atoms/todoState';
import { useRecoilState } from 'recoil';
import { getCompletedTodos, getImportantsTodos, getTodos } from '@/api/todoActions';
import { auth } from '@/api/auth';
import { themeState } from '@/store/atoms/themeState';
import { Theme } from '@/interface/ITheme';


function Todos() {
	const searchParams = useSearchParams()
	const search = searchParams.get('category')
	const [theme, setTheme] = useRecoilState(themeState)
	
	const { userId } = auth()
	const [todos, setTodos] = useRecoilState(todoState)

	useEffect(() => {
		const fetchTodos = async () => {
		switch (search) {
			case 'importantes':
				const importantTodos = await getImportantsTodos()
				return setTodos(importantTodos)
			case 'concluídas':
				const completedTodos = await getCompletedTodos()
				return setTodos(completedTodos)
			default:
				const todos = await getTodos(String(search))		
				return setTodos(todos)
		}
		}
		fetchTodos()

		let theme:Theme = "dark"
		const storedTheme = localStorage.getItem('theme') as Theme;

		if (storedTheme) {
			theme = storedTheme
			setTheme({theme})
		}

	}, [search, setTheme, setTodos])

	const handleTheme = () => {
		if (theme.theme === "dark") {
			localStorage.setItem('theme', 'light')
			return setTheme({theme: 'light'})
		}
		localStorage.setItem('theme', 'dark')
		setTheme({theme: 'dark'})
	}

	const [isOpen, toggle] = useToggle(false);

	const restrictedCategories = search !== 'importantes' && search !== 'todas' && search !== 'concluídas'

	const welcomeText = () => {
		switch (search) {
			case 'importantes':
				return 'Até agora, não há tarefas marcadas como importantes na sua lista.'
			
			case 'todas':
				return 'Para organizar suas tarefas, comece criando uma lista e em seguida, acrescente novas tarefas.'
				
			case 'concluídas':
				return 'Até o momento, não há tarefas concluídas na sua lista.'
				
			default:
					return 'Que tal adicionar uma tarefa à sua lista?'
		}
	}

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
							{`${welcomeText()}`}
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