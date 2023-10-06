import { useSession, signIn, signOut } from "next-auth/react"
import Image from "next/image";
import Link from "next/link";
import { MdOutlineDashboard, MdOutlineGroups, MdOutlineAdd } from "react-icons/md"
import { GrGroup } from "react-icons/gr"
import { FiSettings, } from "react-icons/fi"
import { LuLayoutDashboard } from "react-icons/lu"
import { RiFolderSettingsLine } from "react-icons/ri"
import { IoIosArrowForward } from "react-icons/io"
import { FaCrown } from "react-icons/fa"
import { useState } from "react";
const LeftPanel = () => {
  const { data: session } = useSession();
  const imageUrl = session.user.image;
  const userName = session.user.name;
  const userEmail = session.user.email;
  const [leftPanelActive, setLeftPanelActive] = useState(true)
  return (
    <>
      <div className={`relative flex flex-col gap-[1rem] ${leftPanelActive ? "w-[15rem]" : "w-[4rem]"} duration-300 h-[91vh] px-[1rem] py-[1.5rem] bg-white border-r-2 border-[#CFCFCF] shadow-xl border-t-2 `} >
        <div onClick={() => setLeftPanelActive(!leftPanelActive)} className={` ${leftPanelActive ? "scale-100" : "rotate-180 scale-[.8] "} duration-300 absolute flex justify-center items-center w-[2.2rem] h-[2.2rem] rounded-[50%] border-[1px]  top-[.5rem] right-[0rem] translate-x-[50%] bg-[#7436d8] text-white  shadow-md hover:text-white hover:bg-[#7436d8] hover:border-white cursor-pointer border-[#cfcfcf] `} >
          <IoIosArrowForward className=' text-[1.3rem]  ' />
        </div>
        <div className={`flex ${leftPanelActive ? "gap-[1rem]" : "gap-[0rem]"} duration-300   items-center `} >
          <div className=" flex justify-center items-center w-[1.8rem] h-[2rem] bg-[#7436d8] text-[white] rounded-md " >
            {userName[0]}
          </div>
          <div>
            <h2 className={`text-[.85rem] font-inter font-[400] opacity-[.85] ${leftPanelActive ? "" : "hidden"} duration-300   `} >{session.user.name + "'s Workspace"}</h2>
            {/* <p className=' text-[.8rem] font-inter font-[400] opacity-[.85]   '>{session.user.email}</p> */}
          </div>
        </div>
        <hr />
        <div className=" flex flex-col gap-[1rem]  " >
          <Link href={'/'} className={`flex items-center ${leftPanelActive ? "gap-[1.5rem]" : "gap-[0rem]"} duration-300  text-[.95rem] font-inter font-[400] opacity-[.85] `} >
            <LuLayoutDashboard className=" text-[1.2rem] " />
            <p className={`${leftPanelActive ? "" : "hidden"} duration-300 `} >
              Boards
            </p>

          </Link>
          <div className="  flex justify-between" >

            <Link href={'/'} className={`flex items-center ${leftPanelActive ? "gap-[1.5rem]" : "gap-[0rem]"} duration-300 text-[.95rem] font-inter font-[400] opacity-[.85] `} >
              <GrGroup className=" text-[1.2rem] " />
              <p className={`${leftPanelActive ? "" : "hidden"} duration-300 `} >
                Memebers
              </p>
            </Link>
            <div className={`flex ${leftPanelActive ? "" : "hidden"} duration-300 justify-center items-center w-[1.2rem] h-[1.2rem] rounded-[50%] border-[1px]  mr-[1rem] border-[#7436d8] shadow-md hover:text-white hover:bg-[#7436d8] hover:border-white cursor-pointer `} >
              <MdOutlineAdd className=' text-[1.3rem]  ' />
            </div>
          </div>
          <hr />
          <Link href={'/'} className={`flex items-center ${leftPanelActive ? "gap-[1.5rem]" : "gap-[0rem]"} duration-300 text-[.95rem] font-inter font-[400] opacity-[.85] `} >
            <FiSettings className=" text-[1.2rem] " />
            <p className={`${leftPanelActive ? "" : "hidden"} duration-300 `} >

              Workspace Setting
            </p>

          </Link>
          <Link href={'/'} className={`flex items-center ${leftPanelActive ? "gap-[1.5rem]" : "gap-[0rem]"} duration-300 text-[.95rem] font-inter font-[400] opacity-[.85] `} >
            <RiFolderSettingsLine className=" text-[1.2rem] " />
            <p className={`${leftPanelActive ? "" : "hidden"} duration-300 `} >

              Boards Setting
            </p>

          </Link>
        </div>

        <div className=" absolute bottom-0 w-[100%] left-0 flex justify-center items-center px-[.8rem] py-[.6rem] gap-[.8rem] bg-[#7436d8] text-white text-[.9rem] cursor-pointer " >
          <FaCrown />
          <p className={`${leftPanelActive ? "" : "hidden"} duration-300 `} >

            Try Premium for Free
          </p>
        </div>
      </div>
    </>
  )
}

export default LeftPanel
