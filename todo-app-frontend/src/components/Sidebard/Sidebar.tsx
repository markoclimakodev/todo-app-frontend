'use client'
import NavigationLink from './NavigationLink'
import Icon from '../Icon'
import { useState, useCallback } from 'react'

const todoList = [{
  title: 'O Meu Dia',
  icon: 'Sun'
},
{
  title: 'Importantes',
  icon: 'Star'
}
  , {
  title: 'Tarefas',
  icon: 'ListTodo'
},
{
  title: 'Concluídas',
  icon: 'ListChecks'
}
]

function Sidebar() {
  const [isSidebarCollapsed, setSidebarCollapsed] = useState(false)

  const handleSidebarCollapse = useCallback(() => {
    setSidebarCollapsed(!isSidebarCollapsed)
  }, [isSidebarCollapsed])

  return (
    <aside
      className={`p-10 shadow-2xl text-gray-700 flex flex-col gap-10 text-base font-light relative transition-px duration-500 ${isSidebarCollapsed ? 'px-3' : 'px-[3%]'
        }`}
    >

      <header className='pl-4 flex justify-between items-center'>
        {isSidebarCollapsed ? '' : <p className='text-lg'>Minhas listas</p>}
        <button onClick={handleSidebarCollapse} type='button'>
          <Icon iconName={isSidebarCollapsed ? 'ChevronsRight' : 'ChevronsLeft'} size={20} className='cursor-pointer hover:scale-125 transition-all' />
        </button>
      </header>

      <ul className={`flex flex-col gap-5  ${isSidebarCollapsed ? 'w-fit' : ' w-[200px]'
        }`}>
        {todoList.map((item) => <NavigationLink icoName={item.icon} title={item.title} key={item.title} isSidebarCollapsed={isSidebarCollapsed} />)}
      </ul>
      <hr />
      <ul className='flex flex-col gap-5'>
        <li className='flex justify-between items-center text-blue-500 cursor-pointer  hover:bg-blue-100 p-4 rounded-md transition-all hover:text-xl h-14'>
          <span className='flex gap-4 items-center'>
            <Icon iconName='Plus' size={24} className='cursor-pointer hover:scale-125 transition-all' />
            {isSidebarCollapsed ? '' : 'Nova Lista'}
          </span>
          {isSidebarCollapsed ? '' :
            <Icon iconName='Edit' size={20} className='cursor-pointer hover:scale-125 transition-all' />

          }
        </li>
      </ul>

    </aside>
  )
}

export default Sidebar