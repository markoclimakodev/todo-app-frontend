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
import { getTodos } from '@/api/todoActions';
import { auth } from '@/api/auth';


function Todos() {
	const searchParams = useSearchParams()
	const search = searchParams.get('category')
	const { userId } = auth()
	const [todos, setTodos] = useRecoilState(todoState)

	useEffect(() => {
		const fetchTodos = async () => {
			if (search) {
				const todos = await getTodos(search)
				setTodos(todos)
			}
		}
		fetchTodos()
	}, [search, setTodos])



	const [isOpen, toggle] = useToggle(false);

	const restrictedCategories = search !== 'importantes' && search !== 'todas'

	const welcomeText = restrictedCategories ? 'Que tal dar o pontapé inicial?' : 'Que tal criar uma nova lista de tarefas?'

	const icon = handleCategoryIcons(String(search)) as IconNames

	return (
		<>
			<header className="flex gap-3 items-center p-10 text-blue-500 font-bold text-2xl ">
				<Icon iconname={icon || 'BookmarkCheck'} size={28} />{capitalizeTaskTypeLetter(String(search))}
				{todos.length === 0 ? (
					''
				) : (
					<button
						className="flex font-light bg-blue-400 transition-all rounded-md text-white hover:bg-blue-500 "
						onClick={toggle}>
						<Icon iconname="Plus" size={24} title="Clique para adicionar uma tarefa" />
					</button>
				)}
			</header>

			<TodoModal openModal={isOpen} closeModal={toggle} modalType='create' userId={userId} />

			<section className="w-full h-screen flex flex-col p-10 ">

				{todos.length > 0 ? (
					todos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
				) : (
					<section className='flex flex-col gap-2 items-center justify-center flex-1 h-full'>
						<p className='text-2xl text-gray-700'>
							Ops! Essa lista ainda está vazia. {welcomeText}
						</p>
					{ restrictedCategories && (
						<button
							className=" w-fit flex p-2 font-semibold bg-blue-400 transition-all rounded-md text-white hover:bg-blue-500 "
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