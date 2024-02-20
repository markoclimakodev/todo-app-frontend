'use client'

import Image from 'next/image'
import loginImg from '../../../public/loginImg.svg'
import { ChangeEvent, FormEvent, useState } from 'react'
import { useRouter, } from 'next/navigation'
import { useAuth } from '@/hooks/useToken'

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { saveAuth } = useAuth()
  const router = useRouter()

  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:3001/login/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        throw new Error('arrumo depois');
      }

      const responseData = await response.json();

      const { authResponse } = responseData;
      const { token, userId } = authResponse;

      saveAuth(token, userId);
      router.push(`/home/${userId}`);
    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message);

      }
    }
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await handleLogin();
  };

  return (
    <section className='flex'>

      <div>
        <Image src={loginImg} alt="Imagem da tela de login" />
      </div>

      <div className='flex items-center justify-center flex-1 flex-col'>

        <form className='flex flex-col items-center text-lg'>

          <p className='text-xl mb-3'>Bem vindo de volta!</p>

          <h2 className='font-semibold text-4xl mb-10'>Faça login na sua conta</h2>

          <label className='flex flex-col gap-3 w-full' htmlFor="email">Email:
            <input onChange={handleEmail} value={email} className='p-4 shadow-lg bg-slate-200 outline-none mb-8 rounded-md' type="email" name="email" id="email" placeholder='example@email.com' />
          </label>

          <label className='flex flex-col gap-3 w-full' htmlFor="password">Senha:
            <input onChange={handlePassword} value={password} className='p-4 shadow-lg bg-slate-200 outline-none mb-8 rounded-md' type="password" name="password" id="password" placeholder='your secret pass' />
          </label>

          <button onClick={handleSubmit} className='font-semibold mt-4 shadow-lg text-white hover:bg-emerald-700 transition-all bg-emerald-600 py-4 px-8 rounded-md w-full' type="button">Entrar na conta</button>
          
        </form>

        <div className='flex mt-14 gap-1'>
          <p>Não tem uma conta?</p>
          <button>
            <a className='text-emerald-600' href="/register">Cadastre-se!</a>
          </button>
        </div>

      </div>

    </section>
  )
}

export default Login