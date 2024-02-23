import { useFetch } from "@/hooks/useFetch"
import { useAuth } from "@/hooks/useToken"
import { UpdateTodoSchema, UpdateSchema, initialUpdateTodoFormValues } from "@/validations/validateUpdateTodoForm"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"

type UpdateTodoModalProps = {
  openUpdateTodoModal: boolean,
  todoId: string
  closeUpdateTodoModal: () => void
}

function UpdateTodoModal({openUpdateTodoModal, todoId, closeUpdateTodoModal}: UpdateTodoModalProps) {

  const { register, handleSubmit, reset } = useForm<UpdateTodoSchema>({
    resolver: zodResolver(UpdateSchema),
    mode: 'onSubmit',
    defaultValues: initialUpdateTodoFormValues
  })
  const { token, userId } = useAuth()

  const { todoTask } = useFetch('http://localhost:3002/')

  const handleUpdateTodo = async ({ title, description }: UpdateTodoSchema) => {
    await todoTask({
      endpoint: `home/${userId}/${todoId}`,
      reqData: { title, description }, 
      method: 'PATCH',
      token,
    })
    reset()
  }

  return (
    <section className={openUpdateTodoModal ? 'fixed z-10 flex items-center justify-center top-0 left-0 bg-black bg-opacity-80 gap-4 w-screen h-screen' : 'hidden'}>

      <form onSubmit={handleSubmit(handleUpdateTodo)} className="flex flex-col gap-4 w-2/5 bg-slate-200 rounded-2xl p-12 h-2/3">
        <label className="rounded-md text-lg outline-none text-blue-500" htmlFor="title">
          <input
           placeholder="Título"
           {...register ('title')}
           className="rounded-md shadow-md p-2 text-lg outline-none text-blue-500 placeholder:text-blue-500 bg-white placeholder:font-bold"
           type="text"
           id="title"
          />
        </label>

        <label className="rounded-md text-lg flex-1 outline-none text-blue-500" htmlFor="description">
          <textarea
          placeholder="Descrição" 
          {...register ('description')}
          className="rounded-md shadow-md h-full w-full p-2 text-lg outline-none text-blue-500 placeholder:text-blue-500 placeholder:font-bold bg-white" 
          id="description" 
          />
        </label>

        <button onClick={closeUpdateTodoModal} type="submit" className="bg-emerald-500 font-bold transition-all shadow-md hover:bg-emerald-800 p-2 rounded-md text-white mt-2">
          Atualizar tarefa
        </button>
        <button onClick={closeUpdateTodoModal} className="bg-red-500 font-bold transition-all shadow-md hover:bg-red-700 p-2 rounded-md text-white mt-2">
          Cancelar
        </button>
      </form>

    </section>
  )
}

export default UpdateTodoModal