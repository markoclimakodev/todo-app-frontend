'use client'

import { ChangeEvent, FormEvent, useState } from "react";
import Image from "next/image";
import signInSVG from '../../../public/sign-in.svg'


function Register() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [createAccSuccess, setCreateAccSuccess] = useState(false)

  const handleRegister = async () => {
    try {
      const responseData = {
        status: 'SUCCESS',
        data: 'Conta criada com sucesso!'
      }
      // const response = await fetch('http://localhost:3001/register/', {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/json',
      //   },
      //   body: JSON.stringify({ name, email, password }),
      // });

      // if (!response.ok) {
      //   throw new Error('arrumar depois');
      // }

      // const responseData = await response.json();
      
      if (responseData.status === 'SUCCESS') {
        setCreateAccSuccess(true)
      }
      

    } catch (error) {
      if (error instanceof Error) {
        console.error('Error:', error.message);
      }
    }
  };

  const handleName = (event: ChangeEvent<HTMLInputElement>) => {
    setName(event.target.value);
  };

  const handleEmail = (event: ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };

  const handlePassword = (event: ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    await handleRegister()
    setName('')
    setEmail('')
    setPassword('')
  };
  
  return (
    <section className="flex bg-rose-50 items-center justify-center flex-1 flex-col h-screen">

      <div className="bg-black rounded-2xl px-24 py-12">

        <div className="flex justify-center">
          <Image src={signInSVG} className="mb-4" width={60} alt="Sign in SVG icon"/>
        </div>

        <form>

          <h1 className="font-extrabold text-white text-4xl">Create your account</h1>

          <p className="text-slate-400 pb-10">and be able to enjoy your best Todo List!</p>

          <label className='flex flex-col gap-3 w-full text-white' htmlFor="name">Name:
              <input onChange={handleName} value={name} className='p-4 shadow-lg bg-slate-200 outline-none mb-8 rounded-md text-black' type= "text" name="name" id="name" placeholder='your name' />
          </label>

          <label className='flex flex-col gap-3 w-full text-white' htmlFor="email">Email:
              <input onChange={handleEmail} value={email} className='p-4 shadow-lg bg-slate-200 outline-none mb-8 rounded-md text-black' type="email" name="email" id="email" placeholder='example@email.com' />
          </label>

          <label className='flex flex-col gap-3 w-full text-white' htmlFor="password">Password:
              <input onChange={handlePassword} value={password} className='p-4 shadow-lg bg-slate-200 outline-none mb-8 rounded-md text-black' type="password" name="password" id="password" placeholder='your secret pass' />
          </label>

          <button onClick={handleSubmit} className='font-semibold shadow-lg mt-4 text-white hover:bg-emerald-700 transition-all bg-emerald-600 py-4 px-8 rounded-md w-full' type="button">Criar conta</button>

        </form>

        {createAccSuccess ? (
          <div className="flex justify-center mt-14 gap-1">
            <p className="text-white">Conta criada com sucesso!</p>
            <a className="text-emerald-600" href="/login">Logue aqui.</a>
          </div>
        ): (
          <div className='flex justify-center mt-14 gap-1'>
            <p className="text-white">Já tem uma conta?</p>
            <button>
              <a className='text-emerald-600' href="/login">Entre!</a>
            </button>
          </div>
        )}

      </div>

    </section>
  )
}

export default Register