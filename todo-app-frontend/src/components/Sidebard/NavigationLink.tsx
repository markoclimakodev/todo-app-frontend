import React from "react";
import Icon, { IconNames } from "../Icon";
import { useRouter, useSearchParams } from "next/navigation";
import { capitalizeTaskTypeLetter } from "@/helpers/capitalizeFirstLetter";
import { updateCategory, getCategories, deleteCategory } from "@/api/categoryActions";
import { IUpdateCategory } from "@/interface/category/IUpdateCategory";
import { useRecoilState } from "recoil";
import { categoryState } from "@/store/atoms/categoryState";
import { initialCreateCategory, CategorySchema } from "@/validations/validateCreateCategory";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { useToggle } from "@/hooks/useToggle";
import useNavigateTo from "@/hooks/useNavigateTo";
import { getImportantsTodos, getTodos } from "@/api/todoActions";
import { todoState } from "@/store/atoms/todoState";
import { themeState } from "@/store/atoms/themeState";

interface NavigationLinkProps {
  title: string;
  icoName: string;
  isSidebarCollapsed: boolean;
  id: string;
}

function NavigationLink({ title, icoName, isSidebarCollapsed, id }: NavigationLinkProps) {
  const [theme, _] = useRecoilState(themeState)
  const [__, setCategories] = useRecoilState(categoryState)
  const [___, setTodos] = useRecoilState(todoState)
  const router = useRouter();
  const searchParams = useSearchParams();
  const navigateTo = useNavigateTo()
  const search = searchParams.get("category");
  const [focusedCategory, togglefocusedCategory] = useToggle(false);
  const [openUpdateCategory, toggleUpdateCategory] = useToggle(false);
  const { handleSubmit, register, reset } = useForm({
    mode: 'onSubmit',
    defaultValues: initialCreateCategory,
    resolver: zodResolver(CategorySchema)
  })

  const isSelected = title.toLowerCase() === search?.toLowerCase();

  const isRestrictedCategories = title.toLowerCase() === 'todas' || title.toLowerCase() === 'importantes'

  const handleNavigate = () => {
    if (title === 'todas') {
      router.push('/home/todo/get?category=');
    }
    router.push(`/home/todo/get?category=${title.toLocaleLowerCase()}`);
  };

  const handleCategoriesReload = async (name: string) => {
    router.push(`/home/todo/get?category=${name.toLocaleLowerCase()}`);
}

  const handleTodoReload = async () => {
    if (search) {
      const todos = search === "importantes" ? await getImportantsTodos() : await getTodos(search)
      setTodos(todos)
    }
  }

  const handleUpdateCategory = async ({ name }: IUpdateCategory) => {
    await updateCategory(id, name)

    const updatedCategories = await getCategories();
    setCategories(updatedCategories);
    
    reset();
    handleCategoriesReload(name)
    toggleUpdateCategory()
  }

  const handleDeleteCategory = async () => {
    await deleteCategory(id)
    
    const updatedCategories = await getCategories();
    setCategories(updatedCategories);
    
    handleTodoReload()
    navigateTo('?category=todas')
  }

  return (
    <>                                                                                       
      {!openUpdateCategory && (
        <section className={`flex items-center justify-between rounded-md ${theme.theme === "dark" ? "hover:bg-zinc-800 text-white" : "hover:bg-slate-100"}  ${isSelected && theme.theme === "dark" && "text-white bg-zinc-800"} ${isSelected && theme.theme === "light" && "text-gray-700 bg-blue-50"}`}>
          <button
            onClick={handleNavigate}
            type="button"
            className={`flex gap-4 items-center cursor-pointer p-4 rounded-md transition-all hover:text-xl h-14`}>
            <Icon iconname={icoName as IconNames} size={20} className="cursor-pointer" />
            {isSidebarCollapsed ? "" : capitalizeTaskTypeLetter(title)}
          </button>

          <section
            className={`gap-1 pr-2 h-full w-[80px] justify-end ${isSidebarCollapsed ? 'hidden' : 'flex'}`}
            onMouseEnter={togglefocusedCategory}
            onMouseLeave={togglefocusedCategory}>
            
            {focusedCategory && !isRestrictedCategories && (
              <>
                <button onClick={toggleUpdateCategory}>
                <Icon iconname="Edit" size={14}/>
                </button>
                <button onClick={handleDeleteCategory}>
                <Icon iconname="Trash" size={14}/>
                </button>
              </>
            )}
          </section>
        </section>
      )}

      {openUpdateCategory && (
        <form onSubmit={handleSubmit(handleUpdateCategory)} >
          <label className={`flex gap-4 items-center px-3 border rounded-md border-blue-300 shadow-md w-[200px]}`} htmlFor="task">
            <input {...register('name')} placeholder='Nome da lista' className={`${theme.theme === "dark" ? "text-white placeholder:text-white" : "text-blue-500 placeholder:text-blue-500"} w-full bg-transparent items-center transition-all h-14 outline-none rounded-md`} type="text" id="task" />
            <div className='flex flex-col items-center gap-1'>
              <button type='submit'>
                <Icon iconname='Plus' size={17} className='transition-all cursor-pointer stroke-blue-500 hover:scale-125' />
              </button>
              <button onClick={toggleUpdateCategory} type="button">
                <Icon iconname='Ban' size={12} className='transition-all cursor-pointer stroke-red-500 hover:scale-125' />
              </button>
            </div>
          </label>
        </form>
      )}

    </>
  );
}

export default NavigationLink;
