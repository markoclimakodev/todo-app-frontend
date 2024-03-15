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

interface NavigationLinkProps {
  title: string;
  icoName: string;
  isSidebarCollapsed: boolean;
  id: string;
}

function NavigationLink({ title, icoName, isSidebarCollapsed, id }: NavigationLinkProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const navigateTo = useNavigateTo()
  const search = searchParams.get("category");
  const [focusedCategory, togglefocusedCategory] = useToggle(false);
  const [openUpdateCategory, toggleUpdateCategory] = useToggle(false);
  const [_, setCategories] = useRecoilState(categoryState)
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

  const handleUpdateCategory = async ({ name }: IUpdateCategory) => {
    await updateCategory(id, name)

    const updatedCategories = await getCategories();
    setCategories(updatedCategories);

    reset();
    toggleUpdateCategory()
  }

  const handleDeleteCategory = async () => {
    await deleteCategory(id)

    const updatedCategories = await getCategories();
    setCategories(updatedCategories);

    navigateTo('?category=todas')
  }

  return (
    <>
      {!openUpdateCategory && (
        <section className={`flex items-center justify-between rounded-md hover:bg-slate-100 ${isSelected ? "text-blue-500 bg-blue-50" : "text-gray-700"}`}>
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
            <input {...register('name')} placeholder='Nome da lista' className='text-blue-500 w-full placeholder:text-blue-500 font-bold items-center transition-all h-14 outline-none rounded-md' type="text" id="task" />
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
