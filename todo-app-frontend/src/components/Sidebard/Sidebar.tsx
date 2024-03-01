'use client'

import NavigationLink from './NavigationLink'
import Icon from '../Icon'
import { useToggle } from '@/hooks/useToggle'
import { useAuth } from '@/hooks/useAuth'
import { handleTaskListIcons } from '@/helpers/handleTaskListIcons'
import { useGetTaskList } from '@/hooks/useGetTaskList'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { ICreateTask } from '@/interface/task/ICreateTask'
import { TaskSchema,initialCreateTaskValues } from '@/validations/validateCreateTask'

function Sidebar() {
  const [isOpen, toggle] = useToggle(false);
  const [openCreateTask, toggleCreateTask] = useToggle(false);
  const { clearAuth } = useAuth()
  const { taskList } = useGetTaskList()
  const { register, handleSubmit, formState } = useForm<ICreateTask>({
    resolver: zodResolver(TaskSchema),
    mode: 'onSubmit',
    defaultValues: initialCreateTaskValues
  })

  return (
    <nav
      className={` p-10  shadow-2xl text-gray-700 flex flex-col gap-8 text-base font-light relative transition-px duration-500 
    ${isOpen ? 'px-1 items-center' : 'px-[3%]'}`}
      aria-label="Main Navigation"
    >

      <header className={`flex items-center ${isOpen ? '' : 'justify-between  pl-4'}`}>
        {isOpen ? '' : <p className='text-lg'>Minhas listas</p>}
        <button onClick={toggle} type='button'>
          <Icon iconname={isOpen ? 'ChevronsRight' : 'ChevronsLeft'} size={20} className='cursor-pointer hover:scale-125 transition-all' />
        </button>
      </header>

      <nav className={`flex flex-col gap-2 ${isOpen ? 'w-fit' : ' w-[200px]'}`}>
        {taskList.map((item) => <NavigationLink icoName={handleTaskListIcons(item)} title={item} key={item} isSidebarCollapsed={isOpen} />)}
      </nav>
      <hr />
      <section   className={`flex flex-col justify-between flex-1 gap-2 ${isOpen ? 'w-fit' : ' w-[200px]'}`}>

      {openCreateTask ? (
        <form>
          <label className={`flex gap-4 items-center px-3 border rounded-md border-blue-300 shadow-md ${isOpen ? 'hidden' : ' w-[200px]'}`} htmlFor="task">
          <input placeholder='Nome da lista' className='text-blue-500 w-full placeholder:text-blue-500 font-bold items-center transition-all h-14 outline-none rounded-md'  type="text" id="task" />
          <Icon iconname='Plus' size={24} className='transition-all cursor-pointer stroke-blue-500' />
          </label>
        </form>
      ): (
        <button onClick={toggleCreateTask} className='flex gap-4 text-blue-500 hover:bg-blue-100 p-4 rounded-md  items-center transition-all h-14 '>
        <Icon iconname='Plus' size={24} className='transition-all' />
        <span className='hover:text-xl transition-all'>
          {isOpen ? '' : 'Nova Lista'}
        </span>
      </button>
      )}

      <button className='flex gap-4  hover:bg-blue-100 p-4 rounded-md  items-center transition-all h-14 '
      onClick={clearAuth}
      >
        <Icon iconname='LogOut' size={24} className='transition-all' />

        <span className='hover:text-xl transition-all'>
          {isOpen ? '' : 'Sair'}
        </span>

      </button>
      
      </section>
  
    </nav>
  )
}

export default Sidebar