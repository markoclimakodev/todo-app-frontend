'use client'
import NavigationLink from './NavigationLink'
import Icon from '../Icon'
import { useToggle } from '@/hooks/useToggle'
import { clearAuth } from '@/api/auth'
import { handleCategoryIcons } from '@/helpers/handleCategoryIcons'
import { useForm } from 'react-hook-form'
import { CategorySchema, initialCreateCategory } from '@/validations/validateCreateCategory'
import { zodResolver } from '@hookform/resolvers/zod'
import { ICreateCategory } from '@/interface/category/ICreateCategory'
import { useCallback, useEffect } from 'react'
import { useRecoilState } from 'recoil'
import { categoryState } from '@/store/atoms/categoryState'
import { getCategories, createCategory } from '@/api/categoryActions'
import useNavigateTo from '@/hooks/useNavigateTo'
import { themeState } from '@/store/atoms/themeState'


function Sidebar() {
  const [theme, _] = useRecoilState(themeState)
  const [categories, setCategories] = useRecoilState(categoryState)
  const [isOpen, toggle] = useToggle(false);
  const [openCreateCategory, toggleCreateCategory] = useToggle(false);
  const {handleSubmit, register, reset} = useForm({
    mode: 'onSubmit',
    defaultValues: initialCreateCategory,
    resolver: zodResolver(CategorySchema)
  })

  const navigateTo = useNavigateTo()

  const handleOpenCreateTask = () => {
    if (isOpen && openCreateCategory) {
      toggle()
      toggleCreateCategory()
    }
    toggleCreateCategory()
  }

  const handleLogout = () => {
    clearAuth()
    navigateTo('/login')
  }

  const fetchCategories = useCallback( async () => {
    const categoriesResponse = await getCategories()
    setCategories(categoriesResponse)
  }, [setCategories])


  const handleSubmitCreateCategory = async ({name}:ICreateCategory) => {
    await createCategory(name);

    const updatedCategories = await getCategories();
    setCategories(updatedCategories);

    reset();
    toggleCreateCategory();
  }

  useEffect(()=> {
    fetchCategories()
  },[fetchCategories])

  return (
    <nav
      className={` p-10  shadow-2xl text-gray-700 flex flex-col gap-8 text-base font-light relative transition-px duration-500 
    ${isOpen ? 'px-1 items-center' : 'px-[3%]'}`}
      aria-label="Main Navigation"
    >

      <header className={`flex items-center ${isOpen ? '' : 'justify-between  pl-4'}`}>
        {isOpen ? '' : <p className={`text-lg ${theme.theme === "dark" ? "text-white" : "text-gray-700"} transition-all duration-1000`}>Minhas listas</p>}
        <button onClick={toggle} type='button'>
          <Icon iconname={isOpen ? 'ChevronsRight' : 'ChevronsLeft'} size={20} className={`cursor-pointer hover:scale-125 ${theme.theme === "dark" ? "text-white" : "text-black"} transition-all duration-1000`} />
        </button>
      </header>

      <nav className={`flex flex-col gap-2 max-h-[376px] overflow-auto ${isOpen ? 'w-fit overflow-hidden' : ' w-[300px]'}`}>
        {categories.map((category) => <NavigationLink id={category.id} icoName={handleCategoryIcons(category.name)} title={category.name} key={category.id} isSidebarCollapsed={isOpen} />)}
      </nav> 
      <hr />
      <section className={`flex flex-col justify-between flex-1 gap-2 ${isOpen ? 'w-fit items-center  ' : ' w-[200px]'}`}>

        {openCreateCategory && !isOpen ? (
          <form onSubmit={handleSubmit(handleSubmitCreateCategory)} >
            <label className={`flex gap-4 items-center px-3 border rounded-md border-blue-300 shadow-md ${isOpen ? 'hidden' : ' w-[200px]'}`} htmlFor="task">
              <input {...register('name')}  placeholder='Nome da lista' className={`${theme.theme === "dark" ? "text-white hover:bg-zinc-800 placeholder:text-white" : "text-gray-700 hover:bg-blue-50 placeholder:text-blue-500"} bg-transparent w-full items-center transition-all h-14 outline-none rounded-md`} type="text" id="task" />
              <div className='flex flex-col items-center gap-1'>
                <button type='submit'>
                  <Icon iconname='Plus' size={17} className='transition-all cursor-pointer stroke-blue-500 hover:scale-125' />
                </button>
                <button onClick={toggleCreateCategory} type="button">
                  <Icon iconname='Ban' size={12} className='transition-all cursor-pointer stroke-red-500 hover:scale-125' />
                </button>
              </div>
            </label>
          </form>
        ) : (
          <button onClick={handleOpenCreateTask} className={`flex gap-4 p-4 rounded-md items-center h-14 ${theme.theme === "dark" ? "text-white hover:bg-zinc-800" : "text-gray-700 hover:bg-blue-50"} transition-all`}>
            <Icon iconname='Plus' size={24} />
            {!isOpen && <span>
              Nova Lista
            </span>}
          </button>
        )}

        <button className={`flex gap-4 ${theme.theme === "dark" ? "text-white hover:bg-zinc-800" : "text-gray-700 hover:bg-blue-50"} p-4 rounded-md transition-all h-14 ${isOpen ? 'w-fit items-center  ' : ' w-[200px]'} `}
          onClick={handleLogout}
        >
          <Icon iconname='LogOut' size={24} className='transition-all' />

          {!isOpen && <span className='hover:text-xl transition-all'>
              Sair
            </span>}

        </button>

      </section>

    </nav>
  )
}

export default Sidebar