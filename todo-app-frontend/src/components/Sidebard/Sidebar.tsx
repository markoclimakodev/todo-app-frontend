import {MdOutlineMenu, MdOutlineWbSunny, MdStarBorder, MdOutlineHome, MdAdd, MdEditNote} from 'react-icons/md'
import Icons from './Icons'

const todoList = [{
  title: 'O Meu Dia',
  icon: <MdOutlineWbSunny  size={24}/> 
},
{
  title: 'Importantes',
  icon: <MdStarBorder  size={24}/> 
}
,{
  title: 'Tarefas',
  icon: <MdOutlineHome  size={24}/> 
}
]

function Sidebar() {
  return (
    <aside className='p-10 shadow-2xl h-screen text-gray-700 flex flex-col gap-10 text-base font-light'>

      <header><MdOutlineMenu className='cursor-pointer hover:scale-125 transition-all' size={24} /></header>

      <ul className='flex flex-col gap-5 w-80'>
        {todoList.map((item) => <Icons icon={item.icon} title={item.title} key={item.title} />)}
      </ul>

      <hr />

      <ul className='flex flex-col gap-5 w-80'>
        <li className='flex justify-between items-center text-blue-500 cursor-pointer  hover:bg-blue-100 p-4 rounded-md transition-all hover:text-xl'><span className='flex gap-4 items-center'><MdAdd size={24} />Nova Lista</span><MdEditNote size={24}/></li>
      </ul>

    </aside>
  )
}

export default Sidebar