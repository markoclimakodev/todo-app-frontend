import { useTodoApi } from "@/hooks/useTodoApi";
import { useAuth } from "@/hooks/useToken";
import { CreateSchema, CreateTodoSchema, initialCreateTodoFormValues } from "@/validations/validateCreateTodoForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { MdAdd } from "react-icons/md";

function CreateTodo() {
  const { register, handleSubmit, reset } = useForm<CreateTodoSchema>({
    resolver: zodResolver(CreateSchema),
    mode: 'onSubmit',
    defaultValues: initialCreateTodoFormValues
  })
  const { token, userId } = useAuth()

  const { todoTask } = useTodoApi('http://localhost:3002/')

  const handleCreateTodo = async ({ title, description }: CreateTodoSchema) => {
    await todoTask({
      endpoint: `home/${userId}`,
      reqData: { title, description }, method: 'POST',
      token,
    })
    reset()
  }

  return (
    <section className="flex items-end p-2 rounded-md py-5 px-8 ">

      <form onSubmit={handleSubmit(handleCreateTodo)} className="flex flex-col gap-3 ">
        <input {...register('title')} className="placeholder:text-blue-500 rounded-md p-2 bg-white w-[95%] text-lg outline-none text-blue-500" placeholder="Título da tarefa" type="text" />
        <textarea {...register('description')} className="placeholder:text-blue-500 bg-white p-2 rounded-md w-[95%] text-lg outline-none text-blue-500" placeholder="Descrição da tarefa" cols={50} rows={5} />
        <button className="text-blue-500 flex items-end justify-end" type="submit">
          <MdAdd className="hover:scale-125 transition-all rounded-full bg-blue-200 " size={24} />
        </button>
      </form>

    </section>
  )
}

export default CreateTodo