import React from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import Image from 'next/image'
import { googleImage, linkedinImage, faceBookImage, logoImage } from '@/public/assets'

const Login = () => {
  return (
    <>
      <div className=' flex flex-col justify-center items-center w-[100%] h-[100vh] gap-[.5rem]   ' >
        <Image
          src={logoImage}
          height={500}
          width={500}
          className='  w-[4rem]  my-[1rem] '
        />
        <h1 className='text-[1.5rem] text-black font-inter font-[700] ' >One platform, many solutions</h1>
        <p className='text-[.9rem] text-[#323232] font-inter font-[500]  ' >Events. Streaming. Webinars.</p>
        <div className=' flex justify-center items-center w-[100%]  gap-[2rem] my-[1rem]   ' >
          {/* ********* */}
          <div onClick={() => signIn("google")} className=' flex flex-col justify-center items-center cursor-pointer  '>
            <div className=' border-[#d9e2e2] border-2 rounded-[50%] w-[2.5rem] h-[2.5rem] flex justify-center items-center   '>
              <Image
                src={googleImage}
                height={500}
                width={500}
                className='w-[1.25rem]'
              />
            </div>
            <p className=' text-[.75rem] opacity-70 font-inter ' >Google</p>
          </div>
          {/* ********* */}
          <div className=' flex flex-col justify-center items-center  cursor-pointer ' >
            <div className='border-[#d9e2e2] border-2 rounded-[50%] w-[2.5rem] h-[2.5rem] flex justify-center items-center' >
              <Image
                src={faceBookImage}
                height={500}
                width={500}
                className='w-[2.5rem]'
              />
            </div>
            <p className=' text-[.75rem] opacity-70 font-inter '>Facebook</p>
          </div>
          {/* ********* */}
          <div className=' flex flex-col justify-center items-center  cursor-pointer ' >
            <div className='border-[#d9e2e2] border-2 rounded-[50%] w-[2.5rem] h-[2.5rem] flex justify-center items-center' >
              <Image
                src={linkedinImage}
                height={500}
                width={500}
                className='w-[1rem]'
              />
            </div>
            <p className=' text-[.75rem] opacity-70 font-inter '>Linkedin</p>
          </div>
        </div>

        <div className=' flex items-center justify-center gap-[.5rem]  ' >
          <hr className=' h-[1.5px] w-[10rem] bg-[#d9e2e2]  ' />
          <p>or</p>
          <hr className=' h-[1.5px] w-[10rem] bg-[#d9e2e2]  ' />
        </div>

        <button className=' bg-[#7436d8] text-white  py-[.5rem] w-[22rem] rounded-md my-[1rem]   ' >Login With Email</button>
        <p className=' w-[22rem] text-center text-[.85rem] font-inter ' >
          By logging in, I agree to <span className=' text-[#7436d8] ' >Zuddl Privacy Policy</span> , <span className=' text-[#7436d8] '>Terms of Use</span> and <span className=' text-[#7436d8] '>Terms of Service</span>
        </p>
      </div>
    </>
  )
}

export default Login
