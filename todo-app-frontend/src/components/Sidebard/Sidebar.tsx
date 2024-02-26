'use client'
import NavigationLink from './NavigationLink'
import Icon from '../Icon'
import { useToggle } from '@/hooks/useToggle'
import { useAuth } from '@/hooks/useAuth'
import { todoListCategories } from './data/todoListCategories'

function Sidebar() {
  const { isOpen, toggle } = useToggle(false);
  const {clearAuth} = useAuth()

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

      <nav className={`flex flex-col gap-2 ${isOpen ? 'w-fit' : ' w-[200px]'}
        `}>
        {todoListCategories.map((item) => <NavigationLink icoName={item.icon} title={item.title} key={item.title} isSidebarCollapsed={isOpen} />)}
      </nav>
      <hr />
      <section   className={`flex flex-col justify-between flex-1 gap-2 ${isOpen ? 'w-fit' : ' w-[200px]'}
        `}>

      <button className='flex gap-4 text-blue-500 hover:bg-blue-100 p-4 rounded-md  items-center transition-all h-14 '>
        <Icon iconname='Plus' size={24} className='transition-all' />

        <span className='hover:text-xl transition-all'>
          {isOpen ? '' : 'Nova Lista'}
        </span>

      </button>

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