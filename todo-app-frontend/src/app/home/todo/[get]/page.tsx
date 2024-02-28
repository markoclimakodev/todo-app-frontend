'use client'

import React, { useState, useCallback, useEffect } from 'react';

import Icon, { IconNames } from '@/components/Icon';
import { TodoCard } from './TodoCard';

import { capitalizeTaskTypeLetter } from '@/helpers/capitalizeFirstLetter';

import { useFetch } from '@/hooks/useFetch';
import { useAuth } from '@/hooks/useAuth';
import { useToggle } from '@/hooks/useToggle';
import { useSearchParams } from 'next/navigation';

import { ITodo } from '@/interface/todo/ITodo';
import { QueryValueType } from '@/interface/hooks/UseFetch.types';

import { todoCategoryIcons } from './data/todoCategoryIcons';
import TodoModal from './TodoModal';

function Todos() {
    const searchParams = useSearchParams()

    const search = searchParams.get('tasktype')

    const { apiData, createRequest, } = useFetch()

    const [todos, setTodos] = useState<ITodo[]>([])

    const { token,userId } = useAuth()

    const { isOpen, toggle } = useToggle(false);

    useEffect(() => {
        const fetchTodos = async () => {
            try {
                if (search !== null) {
                    await createRequest({
                        baseUrl: 'http://localhost:3002/',
                        endpoint: 'todo/get?tasktype=',
                        method: 'GET',
                        resquestData: {userId},
                        token,
                        queryValue: search as QueryValueType
                    })
    
                }
            } catch (error) {
                console.error("Error fetching todos:", error);
            } 
        }
        fetchTodos();
    }, [createRequest, search, token, userId]);
    
    useEffect(() => {
        if (apiData?.data) {
            setTodos(apiData.data as ITodo[]);
        }
    }, [apiData?.data]);
    
    

    const icon = todoCategoryIcons[capitalizeTaskTypeLetter(String(search))] as IconNames

    return (
        <>
            <header className="flex gap-3 items-center p-10 text-blue-500 font-bold text-2xl ">
                <Icon iconname={icon } size={28} />{capitalizeTaskTypeLetter(String(search))}
                <button 
                className="flex font-light bg-blue-400 transition-all rounded-md text-white hover:bg-blue-500 " 
                onClick={toggle}>
                    <Icon iconname="Plus" size={24} title="Clique para adicionar uma tarefa" />
                </button>
            </header>

            <TodoModal openModal={isOpen} closeModal={toggle} modalType='create' userId={userId}/>

            <section className="w-full flex flex-col p-10">
                {
                    todos.map((todo) => <TodoCard key={todo.id} todo={todo} />)
                }
            </section>
        </>


    )
}

export default Todos