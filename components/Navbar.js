import React, { useState } from 'react'
import Image from 'next/image'
import { logoImage } from '@/public/assets'
import Link from 'next/link'
import { MdKeyboardArrowDown, MdSearch, MdNotificationsActive } from "react-icons/md"
import { AiOutlineQuestionCircle } from "react-icons/ai"
import { useSession, signIn, signOut } from "next-auth/react"
import AccountDropdown from '../components/Modals/AccountDropdown'
import CreateBoards from './Modals/CreateBoards'

const Navbar = () => {
  const { data: session } = useSession();
  const imageUrl = session?.user.image;
  const [accountDropdown, setAccountDropdown] = useState(false)
  const [createBoards, setCreateBoards] = useState(false)
  return (
    <>
      <nav className=' sticky top-0 z-30 overflow-hidden bg-white  flex justify-between items-center w-[100%] h-[4rem] px-[2rem] shadow-md ' >

        <div className=' flex items-center mx-[4rem] gap-[3rem]  ' >
          <div>
            <Image
              src={logoImage}
              height={500}
              width={500}
              className='  w-[4rem]  my-[1rem] '
            />
          </div>
          <div className=' flex items-center gap-[1.2rem]  ' >
            <Link href={'/'} className=' flex items-center '  >
              Workspaces
              <MdKeyboardArrowDown />
            </Link>
            <Link href={'/'} className=' flex items-center '  >
              Recent
              <MdKeyboardArrowDown />
            </Link>
            <Link href={'/'} className=' flex items-center '  >
              Starred
              <MdKeyboardArrowDown />
            </Link>
            <Link href={'/'} className=' flex items-center '  >
              Templates
              <MdKeyboardArrowDown />
            </Link>
            <button onClick={() => setCreateBoards(!createBoards)} className=' bg-[#7436d8] text-white  py-[.5rem] w-[8rem] rounded-md   '>Create Board</button>
          </div>
        </div>


        <div className=' flex items-center gap-[1rem] ' >
          <div className=' flex border-[#cdcdcd] border-[1px] px-[1rem] items-center py-[.3rem]  rounded-md gap-[.5rem]  ' >
            <MdSearch />
            <input type="text" className=' outline-none  w-[10rem] ' />
          </div>
          <MdNotificationsActive className='text-[1.2rem]  ' />
          <AiOutlineQuestionCircle className='text-[1.2rem]  ' />
          <Image
            src={imageUrl}
            height={500}
            width={500}
            className='  w-[2rem]  rounded-[50%] cursor-pointer '
            onClick={() => setAccountDropdown(!accountDropdown)}
          />
        </div>
      </nav>
      {/* <div className='  relative w-[100%] ' >
        <AccountDropdown active={accountDropdown} />
      </div> */}
      <AccountDropdown
        visible={accountDropdown}
        onClose={() => setAccountDropdown(false)}
        callback={() => fetchData()}
      />
      <CreateBoards
        visible={createBoards}
        onClose={() => setCreateBoards(false)}
        callback={() => fetchData()}
      />

    </>
  )
}

export default Navbar
