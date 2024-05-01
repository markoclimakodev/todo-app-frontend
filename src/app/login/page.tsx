'use client'

import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod'
import { ILogin } from '@/interface/ILogin';
import { LoginSchema, initialLoginFormValues } from '@/validations/validateLoginForm';
import { userLogin } from '@/api/userActions';
import useNavigateTo from '@/hooks/useNavigateTo';
import { useState } from 'react';

function Login() {

  const { register, handleSubmit, formState } = useForm<ILogin>({
    resolver: zodResolver(LoginSchema),
    mode: 'onSubmit',
    defaultValues: initialLoginFormValues
  })
  const [errorMessage, setErrorMessage] = useState<string>('');
  const navigateTo = useNavigateTo()

  const handleLogin = async ({ email, password }: ILogin) => {
    try {
      await userLogin({ email, password });
      navigateTo('home/todo/get?category=todas');
    } catch (error) {
      setErrorMessage('Email ou senha inválidos.');
    }
  };

  return (
    <section className='flex bg-login-up-bg bg-cover bg-center h-screen'>

      <div className='flex items-center justify-center flex-1 flex-col'>

        <form onSubmit={handleSubmit(handleLogin)} className='flex flex-col items-center text-lg text-white bg-black rounded-2xl px-24 py-12 bg-opacity-85'>

          <p className='text-xl mb-3'>Bem vindo de volta!</p>

          <h2 className='font-semibold text-4xl mb-10'>Faça login na sua conta</h2>

          <label className='flex flex-col gap-3 w-full' htmlFor="email">Email:
            <input
              {...register('email')}
              className='p-4 shadow-lg bg-slate-200  text-black placeholder:text-gray-500 outline-none rounded-md'
              name="email"
              id="email"
              placeholder='example@email.com'
            />
          </label>

          <label className='flex flex-col gap-3 w-full mt-8' htmlFor="password">Senha:
            <input
              {...register('password')}
              className='p-4 shadow-lg bg-slate-200 text-black placeholder:text-gray-500 outline-none rounded-md'
              type="password"
              name="password"
              id="password"
              placeholder='your secret pass'
            />
          </label>

          <button
            disabled={!formState.isValid}
            className='font-semibold mt-12 shadow-lg text-white hover:bg-emerald-900 transition-all bg-emerald-700 py-4 px-8 rounded-md w-full disabled:bg-emerald-400 '
            type="submit">
            Entrar na conta
          </button>

          {errorMessage && (
            <p className='text-sm text-red-400 mt-4'>{errorMessage}</p>
          )}

          <div className='flex mt-14 gap-1'>
            <p>Não tem uma conta?</p>
            <button>
              <a className='text-emerald-600' href="/register">Cadastre-se!</a>
            </button>
          </div>
        </form>

      </div>

    </section>
  )
}

export default Login