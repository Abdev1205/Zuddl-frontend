import React from 'react'
import Image from 'next/image'
import { useSession, signIn, signOut } from "next-auth/react"
import { CgArrowsExchange } from "react-icons/cg"
import { RiShareBoxLine } from "react-icons/ri"
import { MdLogout, MdClose } from "react-icons/md"

const AccountDropdown = ({ visible, onClose = () => { }, callback = () => { } }) => {
  if (!visible) return null;
  const { data: session } = useSession();
  const imageUrl = session.user.image;
  return (
    <>
      <div
        id="background"
        className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30"
        onClick={(e) => {
          if (e.target.id == "background") onClose();
        }}
      >
        <div className={`absolute flex overflow-hidden flex-col right-0 justify-between h-[100vh] w-[18rem] shadow-lg px-[1rem] py-[2rem] ${visible ? "translate-x-[0%]" : "translate-x-[400%"} bg-white  duration-[5s] `} >
          {/* ****************** */}
          <div className=' flex flex-col justify-center gap-[1rem] ' >
            <div className=' flex flex-col gap-[1rem] '  >
              <div className=' flex items-center justify-between '>
                <p className=' text-[1.1rem] font-inter text-[#000000]  ' >Account</p>
                <div onClick={(e) => onClose()} className=' flex justify-center items-center w-[2rem] h-[2rem] rounded-[50%] border-[1px] mt-[-1rem] mr-[1rem] border-[#7436d8] shadow-md hover:text-white hover:bg-[#7436d8] hover:border-white cursor-pointer ' >
                  <MdClose className=' text-[1.3rem]  ' />
                </div>
              </div>
              <div className=' flex gap-[1rem] items-center ' >
                <Image
                  src={imageUrl}
                  height={500}
                  width={500}
                  className='  w-[2.5rem]  rounded-[50%] '
                />
                <div>
                  <h2 className=' text-[.85rem] font-inter font-[400] opacity-[.85]   ' >{session.user.name}</h2>
                  <p className=' text-[.8rem] font-inter font-[400] opacity-[.85]   '>{session.user.email}</p>
                </div>
              </div>
              <div className='   ' >
                <div className=' flex gap-[.5rem] items-center opacity-[.85] cursor-pointer  ' >
                  <p className=' text-[.8rem] font-inter font-[400]    ' >Switch Accounts</p>
                  <CgArrowsExchange className=' text-[1.1rem]   ' />
                </div>
                <div className=' flex items-center gap-[.5rem] opacity-[.85] cursor-pointer  ' >
                  <p className='text-[.8rem] font-inter font-[400]' >Manage Account</p>
                  <RiShareBoxLine className=' text-[.8rem] ' />
                </div>
              </div>
            </div>
            <hr />
            <div className=' flex flex-col gap-[.8rem] ' >
              <p className='text-[1.1rem] font-inter text-[#000000]'>Zuddl</p>
              <div className=' flex flex-col gap-[.6rem]  ' >
                <h2 className=' cursor-pointer text-[.85rem] font-inter font-[400] opacity-[.85] ' >Profile and Visiblity</h2>
                <h2 className=' cursor-pointer text-[.85rem] font-inter font-[400] opacity-[.85] ' >Actvity</h2>
                <h2 className=' cursor-pointer text-[.85rem] font-inter font-[400] opacity-[.85] ' >Cards</h2>
                <h2 className=' cursor-pointer text-[.85rem] font-inter font-[400] opacity-[.85] ' >Setting</h2>
                <h2 className=' cursor-pointer text-[.85rem] font-inter font-[400] opacity-[.85] ' >Theme</h2>
              </div>
            </div>
          </div>
          {/* ****************** */}
          <div className=' flex flex-col gap-[1rem] ' >
            <hr />


            <div className=' flex justify-between  ' >
              <p className=' cursor-pointer text-[.85rem] font-inter font-[400] opacity-[.85] ' >Help</p>
              <p className=' cursor-pointer text-[.85rem] font-inter font-[400] opacity-[.85] ' >Support</p>
            </div>
            <hr />
            <div className=' flex items-center gap-[.5rem] ' >
              <p className='text-[1.1rem] font-inter text-[#000000]'>Logout</p>
              <MdLogout onClick={() => signOut()} className=' cursor-pointer ' />
            </div>
          </div>
        </div>

      </div>
    </>
  )
}

export default AccountDropdown
