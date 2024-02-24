import React from "react"
import Icon, { IconNames } from "../Icon"


interface NavigationLinkProps {
  title: string,
  icoName: string
  isSidebarCollapsed: boolean
}

function NavigationLink({ title, icoName ,isSidebarCollapsed}: NavigationLinkProps) {
  return (
    <li className={`flex gap-4 items-center cursor-pointer hover:bg-slate-100 p-4 rounded-md transition-all hover:text-xl h-14  ${title === 'Tarefas' ? 'text-blue-500' : ''}`}>
      <Icon iconName={icoName as IconNames} size={20} className="cursor-pointer" />
      {isSidebarCollapsed ? '' : title}
    </li>
  )
}

export default NavigationLink