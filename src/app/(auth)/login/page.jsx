'use client'

import React, { useState, useEffect} from 'react'
import Image from "next/image";
import { useFormik } from 'formik';
import * as Yup from 'yup'

import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';

export default function Login() {
  const [hasError, setHasError] = useState(false)


  const [showPassword, setShowPassword] = useState(false)

  const validationSchema = Yup.object().shape({
   username: Yup.string().required('Username required'),
   password: Yup.string().required('Password required')
  })

  const formik = useFormik({
    initialValues: {
      username: '',
      password: ''
    },
    onSubmit: async (values) => {
      validationSchema,
      console.log(values)
    }
  })

  return (
    <>
      <main className='flex h-screen items-center justify-center'>
        <div className='z-10 max-w-md w-full items-center flex-col text-sm'>
          {/* Header */}
          <div className='text-center mb-2 text-lg py-4'>
            SAGENT Account Management
          </div>
          {/* Form */}
          <div className='fixed left-0 top-0 w-full shadow-md mb-2 border-b border-gray-300 bg-gradient-to-b from-zinc-200 px-8 pt-6 pb-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:static lg:w-auto lg:rounded-xl lg:border lg:bg-gray-200 lg:p-4 lg:dark:bg-zinc-800/30  form-wrapper'>
            {/* If Error */}
            {hasError && (
                <div className="flex justify-center items-center">
                <div>
                  <div className='flex items-center justify-center'>
                    <XCircle size={32} className='text-red-500' />
                  </div>
                  <span className='text-red-500'>Invalid Username or Password!</span>
                  </div>
                </div>
            )}

            <form id='dataForm' onSubmit={formik.handleSubmit}>
              {/* Input Username */}
              <div className='mb-4'>
                <Label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2 md:dark:text-white">Username</Label>
                <input
                  id='username'
                  type='text'
                  className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                  onChange={formik.handleChange}
                  value={formik.values.username}
                />
                {/* Validation Username */}
                {console.log(formik.errors, 'fomk')}
                {/* {formik.errors.username && (
                    <Label className="text-red-500 text-xs mx-2">{formik.errors.username}<span className="text-red-500">*</span></Label>
                )} */}
              </div>
              {/* Input Password */}
              <div className='mt-4'>
                <Label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2 md:dark:text-white">Password</Label>
                <div className='relative'>
                  <input
                    id='password'
                    type={showPassword ? 'text' : 'password'}
                    className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
                    onChange={formik.handleChange}
                    value={formik.values.password}
                  />
                  {/* Change type password and/or text */}
                  <button
                    type='button'
                    aria-label={showPassword ? 'Password Visible' : 'Password Invisible'}
                    className='text-primary dark:text-primary-foreground'
                    onClick={() => {
                      setShowPassword((prev) => !prev)
                    }}
                  >
                    {
                      showPassword ?
                    (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth="1.5"
                        stroke="currentColor"
                        className="w-6 select-none  cursor-pointer h-6 absolute top-2 right-2"
                        tabIndex="-1"
                      >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    ) 
                        :
                    (
                      <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="w-6 select-none cursor-pointer h-6 absolute top-2 right-2"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88"
                      ></path>
                    </svg>   
                    )}
                  </button>
                  {/* Submit Button */}
                  <div className='text-center'>
                      <Button type='submit' className="bg-success hover:bg-success-hover" onClick={formik.handleSubmit}>Login</Button>
                  </div>
                </div>
              </div>
            </form>
          </div>
          {/* MKI Logo */}
          <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
              <a
                className="pointer-events-none flex place-items-center gap-2 p-8 lg:pointer-events-auto lg:p-0"
                href="https://www.mk-indonesia.com/id/"
                target="_blank"
                rel="noopener noreferrer"
                >
                <Image
                  src="/mki_logo.svg"
                  alt="Media Kode Indonesia Logo"
                  width={100}
                  height={24}
                  priority
                />
                </a>
          </div>

        </div>
      </main>
    </>
   
  );
}
