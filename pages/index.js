import React from 'react'
import Image from 'next/image'
import { logoImage } from '@/public/assets'
import Login from '@/components/Authentication/Login'
import LoginWrapper from './LoginWrapper'
import { useSession, signIn, signOut } from "next-auth/react"
import Navbar from '@/components/Navbar'
import Sucess from '@/components/Alerts/Sucess'
import Board from '@/components/Board/Board'


const index = () => {
  return (
    <>
      <LoginWrapper>
        <Navbar />
        <div className=' flex flex-col z-10  w-[100%] h-[91vh] bg-secondary   ' >
          <Board />
        </div>
      </LoginWrapper>
    </>
  )
}

export default index
