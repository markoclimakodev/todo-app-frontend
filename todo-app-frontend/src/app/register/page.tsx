'use client'
import Image from "next/image";
import { useForm } from "react-hook-form";
import {  RegisterSchema, initialRegisterFormValues } from "@/validations/validateRegisterForm";
import { zodResolver } from "@hookform/resolvers/zod";
import signInSVG from '../../../public/sign-in.svg'
import { useFetch } from "@/hooks/useFetch";
import useNavigateTo from "@/hooks/useNavigateTo";
import { IRegister } from "@/interface/IRegister";


function Register() {
  const { register, handleSubmit, formState } = useForm<IRegister>({
    resolver: zodResolver(RegisterSchema),
    mode: 'onSubmit',
    defaultValues: initialRegisterFormValues
  })
  const navigateTo = useNavigateTo();


  const { createRequest } = useFetch()

  const handleRegister = async ({ name, email, password }: IRegister) => {
    await createRequest({
      baseUrl: 'http://localhost:3002/',
      endpoint: 'register',
      resquestData: { name, email, password },
      method: 'POST',
    })
    navigateTo(`/login`);
  };

  return (
    <section className="flex bg-rose-50 items-center justify-center flex-1 flex-col bg-sign-up-bg bg-cover bg-center h-screen " >

      <div className="bg-black rounded-2xl px-24 py-4 bg-opacity-85">

        <div className="flex justify-center">
          <Image src={signInSVG} className="mb-4" width={60} alt="Sign in SVG icon" />
        </div>

        <form onSubmit={handleSubmit(handleRegister)}>

          <h1 className="font-extrabold text-white text-4xl">Create your account</h1>

          <p className="text-slate-400 pb-10">and be able to enjoy your best Todo List!</p>

          <label className='flex flex-col gap-3 w-full text-white' htmlFor="name">Name:
            <input
              {...register('name')}
              className='p-4 shadow-lg bg-slate-200 outline-none mb-8 rounded-md text-black  placeholder:text-gray-500 '
              type="text"
              name="name"
              id="name"
              placeholder='your name'
            />
          </label>

          <label className='flex flex-col gap-3 w-full text-white' htmlFor="email">Email:
            <input
              {...register('email')}
              className='p-4 shadow-lg bg-slate-200 outline-none mb-8 rounded-md text-black  placeholder:text-gray-500'
              name="email"
              id="email"
              placeholder='example@email.com'
            />
          </label>

          <label className='flex flex-col gap-3 w-full text-white' htmlFor="password">Password:
            <input
              {...register('password')}
              className='p-4 shadow-lg bg-slate-200 outline-none mb-8 rounded-md text-black  placeholder:text-gray-500'
              type="password"
              name="password"
              id="password"
              placeholder='your secret pass'
            />
          </label>

          <button
            className='font-semibold shadow-lg mt-4 text-white hover:bg-emerald-700 transition-all bg-emerald-600 py-4 rounded-md w-full'
            type="submit">Criar conta
          </button>

          <div className='flex justify-center gap-1 mt-6'>
            <p className="text-white">Já tem uma conta?</p>
            <button>
              <a className='text-emerald-600' href="/login">Entre!</a>
            </button>
          </div>

        </form>

        {formState.errors && (
          <p className='text-sm text-red-400 mt-4'>{
            formState.errors.password?.message ||
            formState.errors.email?.message ||
            formState.errors.name?.message}
          </p>
        )}
      </div>

    </section>
  )
};
export default Register