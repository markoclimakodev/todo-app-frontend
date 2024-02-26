import React from "react"
import Icon, { IconNames } from "../Icon"
import { useRouter, useSearchParams, } from 'next/navigation'
import { capitalizeTaskTypeLetter } from "@/helpers/capitalizeFirstLetter"

interface NavigationLinkProps {
  title: string,
  icoName: string
  isSidebarCollapsed: boolean
}

function NavigationLink({ title, icoName, isSidebarCollapsed }: NavigationLinkProps) {
  const router = useRouter();
  const searchParams = useSearchParams()
  const search = searchParams.get('tasktype')
  
  const handleNavigate = () => {
    router.push(`/home/todo/get?tasktype=${title.toLocaleLowerCase()}`);
  }

  return (
    <button
      onClick={handleNavigate}
      type="button"
      className={`flex gap-4 items-center cursor-pointer
    hover:bg-slate-100 p-4 rounded-md transition-all hover:text-xl h-14  ${title === capitalizeTaskTypeLetter(String(search)) ? 'text-blue-500' : ''}`}>
      <Icon iconname={icoName as IconNames} size={20} className="cursor-pointer" />
      {isSidebarCollapsed ? '' : title}
    </button>
  )
}

export default NavigationLink