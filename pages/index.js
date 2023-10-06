import React from 'react'
import Image from 'next/image'
import { logoImage } from '@/public/assets'
import Login from '@/components/Authentication/Login'
import LoginWrapper from './LoginWrapper'
import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from '@/components/Navbar'
import Sucess from '@/components/Alerts/Sucess'


const index = () => {
  return (
    <>
      <LoginWrapper>
        <Navbar />
        <div className=' flex flex-col justify-center items-center w-[100%] h-[91vh] ' >

          <h1>you are logged in </h1>
          <button className='  ' onClick={() => signOut()}  >Sign out</button>
        </div>
      </LoginWrapper>
    </>
  )
}

export default index
