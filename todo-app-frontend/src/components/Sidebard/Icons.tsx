import React from "react"

interface IconsProps {
  title: string,
  icon: React.ReactNode
}

function Icons({title, icon}: IconsProps) {
  return (
    <li className='flex gap-4 items-center cursor-pointer hover:bg-slate-100 p-4 rounded-md transition-all hover:text-xl'> {icon} {title}</li>
  )
}

export default Icons