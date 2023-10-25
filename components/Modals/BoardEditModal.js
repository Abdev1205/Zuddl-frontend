import React, { useEffect, useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { MdLockOutline, MdGroup, MdPublic, MdClose } from "react-icons/md"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { ApiUrl } from "../../utils/BaseUrl"

const BoardEditModal = ({ visible, onClose = () => { }, callback = () => { }, editId }) => {
  if (!visible) return null;
  const { data: session } = useSession();
  const router = useRouter();
  const userEmail = session?.user.email;
  const [fetchData, setFetchData] = useState()
  const [cardId, setBoardId] = useState()
  const [boardTitle, setBoardTitle] = useState()
  const [boardDesc, setBoardDesc] = useState()
  const [boardVisibility, setBoardVisibility] = useState()
  const [boardBg, setBoardBg] = useState()
  const [updatingBoard, setUpdatingBoard] = useState(false)
  useEffect(() => {
    fetchDataForUpdating()
  }, [updatingBoard]);

  // useEffect(() => {
  //   fetchDataForUpdating()

  // }), [updatingCard]

  const fetchDataForUpdating = async () => {
    const response = await axios.get(`${ApiUrl}/api/boards/${editId}`)
    console.log(response.data.boardData.boardTitle);
    setFetchData(response.data.boardData)
    console.log(fetchData)
    setBoardId(response.data.boardData._id)
    setBoardTitle(response.data.boardData.boardTitle)
    setBoardBg(response.data.boardData.background)
    setBoardDesc(response.data.boardData.desc)
    setBoardVisibility(response.data.boardData.visibility)
  }

  const updateBoardsByData = async (e) => {
    e.preventDefault()
    if (boardTitle && boardDesc && boardVisibility) {
      setUpdatingBoard(true);
      const data = {
        boardTitle: boardTitle,
        visibility: boardVisibility,
        desc: boardDesc,
        background: boardBg
      }
      try {
        const response = await axios.put(`${ApiUrl}/api/update/boards/${editId}`, data);
        console.log('response', response.data.boardId);
        setUpdatingBoard(false);
        toast.success('Cards Updated Successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setBoardTitle("")
        setBoardDesc("")
        onClose()
        // window.location.reload()
        // router.push(`/${response.data.boardId}`)

      } catch (error) {
        console.log(error)
        setUpdatingBoard(false);
        toast.error(error, {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        onClose()
      }
    }
  }


  return (
    <>
      <div
        id="background"
        className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30"
        onClick={(e) => {
          if (e.target.id == "background") onClose();
        }}
      >
        <div className='  flex flex-col w-fit  bg-white px-[2.5rem] py-[2.5rem] rounded-md shadow-2xl ' >
          <form onSubmit={(e) => updateBoardsByData(e)} className=' flex flex-col gap-[1rem] relative  ' >
            <div onClick={(e) => onClose()} className=' absolute flex justify-center items-center w-[2rem] h-[2rem] rounded-[50%] border-[1px] right-[-2rem] top-[-2rem] border-[#7436d8] shadow-md hover:text-white hover:bg-[#7436d8] hover:border-white cursor-pointer ' >
              <MdClose className=' text-[1.3rem]  ' />
            </div>
            <div className=' flex flex-col  gap-[.4rem] ' >
              <label className=' font-inter text-[.85rem]  '  > Board Title <span className=' text-red-600 ' >*</span>  </label>
              <input required onChange={(e) => setBoardTitle(e.target.value)} value={boardTitle} placeholder='Enter Your Board Name' type="text" name="" id="board-title" className='   px-[.5rem] py-[.4rem] outline-none bg-secondary border-[.5px] border-black border-opacity-30  rounded-md' />
            </div>
            <div className=' flex flex-col  gap-[.4rem]   ' >
              <label className=' font-inter text-[.85rem]  ' > Board Description <span className=' text-red-600 ' >*</span> </label>
              <textarea required onChange={(e) => setBoardDesc(e.target.value)} value={boardDesc} placeholder='Enter Your Board Description...' name="" id="" rows="3" className='   px-[.5rem] py-[.4rem] outline-none bg-secondary border-[.5px] border-black border-opacity-30  rounded-md'  ></textarea>
              {/* <input type="text" name="" id="board-desc" /> */}
            </div>
            <div className=' flex  items-center  gap-[1.4rem]   ' >
              <label className=' font-inter text-[.85rem]  ' > Background Color </label>
              <input type="color" onChange={(e) => setBoardBg(e.target.value)} value={boardBg} name="" id="board-bg" className='   w-[5rem] h-[2.5rem] shadow-xl' />
            </div>
            <div className=' flex flex-col  gap-[.4rem]   ' >
              <label className=' font-inter text-[.85rem]  ' > Visiblity <span className=' text-red-600 ' >*</span> </label>
              <div className=' flex gap-[1.5rem]   ' >
                {/* ---------------------------- */}
                <div onClick={() => setBoardVisibility("Private")} className={`relative cursor-pointer   ${boardVisibility === "Private" ? "border-[#5253F1] shadow-formCard" : "border-[#CFCFCF]"}  border-2 rounded-2xl  flex justify-center items-center gap-[.9rem] flex-col px-[1rem] py-[1rem]  w-[12rem]    `} >
                  <MdLockOutline className=' mx-auto text-[2rem] ' />
                  <h2 className=' text-[.9rem] font-inter font-[600] ' >Private</h2>
                  <p className=' text-[.8rem] font-inter text-center font-[400]  ' >Only board members can see and edit this board.</p>
                  <div className={` ${boardVisibility === "Private" ? "" : "hidden"} absolute left-[.5rem] top-[.5rem] w-[1.25rem] h-[1.25rem] rounded-[50%] bg-primary `} />
                </div>
                {/* ---------------------------- */}
                <div onClick={() => setBoardVisibility("Workspace")} className={`relative cursor-pointer ${boardVisibility === "Workspace" ? "border-[#5253F1] shadow-formCard" : "border-[#CFCFCF]"} border-2 rounded-2xl flex justify-center items-center gap-[.9rem] flex-col px-[1rem] py-[1rem]  w-[12rem]   `} >
                  <MdGroup className=' mx-auto text-[2.5rem] ' />
                  <h2 className=' text-[.9rem] font-inter font-[600] ' >Workspace</h2>
                  <p className=' text-[.8rem] font-inter text-center font-[400]  ' >All members of your Workspace can see and edit this board.</p>
                  <div className={` ${boardVisibility === "Workspace" ? "" : "hidden"} absolute left-[.5rem] top-[.5rem] w-[1.25rem] h-[1.25rem] rounded-[50%] bg-primary `} />
                </div>
                {/* ---------------------------- */}
                <div onClick={() => setBoardVisibility("Public")} className={`relative cursor-pointer ${boardVisibility === "Public" ? "border-[#5253F1] shadow-formCard" : "border-[#CFCFCF]"} border-2 rounded-2xl flex justify-center items-center gap-[.9rem] flex-col px-[1rem] py-[1rem]  w-[12rem]   `} >
                  <MdPublic className=' mx-auto text-[2rem] ' />
                  <h2 className=' text-[.9rem] font-inter font-[600] ' >Public</h2>
                  <p className=' text-[.8rem] font-inter text-center font-[400]  ' >Anyone on the internet can see this board. Only board members can edit.</p>
                  <div className={` ${boardVisibility === "Public" ? "" : "hidden"} absolute left-[.5rem] top-[.5rem] w-[1.25rem] h-[1.25rem] rounded-[50%] bg-primary `} />
                </div>
              </div>
            </div>
            <button type='submit' className={` ${updatingBoard ? "animate-pulse" : ""} flex gap-[.8rem] justify-center items-center bg-primary py-[.5rem] text-white rounded-md mt-[2rem] `} > {updatingBoard ? "Updating Boards" : "Update Board"}
              <div className={` ${updatingBoard ? "" : "hidden"} w-[1rem] h-[1rem] border-t-2  border-white rounded-[50%] animate-spin `} />
            </button>
          </form>

        </div>
      </div>
    </>
  )
}

export default BoardEditModal
