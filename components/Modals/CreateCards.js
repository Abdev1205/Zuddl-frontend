import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { MdLockOutline, MdGroup, MdPublic, MdClose } from "react-icons/md"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import { ApiUrl } from "../../utils/BaseUrl"


const CreateCards = ({ visible, onClose = () => { }, callback = () => { }, id }) => {
  if (!visible) return null;
  const { data: session } = useSession();
  const router = useRouter();
  const userEmail = session.user.email;


  const [cardTitle, setCardTitle] = useState("")
  const [cardDesc, setCardDesc] = useState("")
  const [cardPriority, setCardPriority] = useState("High")
  const [cardVisiblity, setCardVisiblity] = useState("Private")
  const [creatingCard, setCreatingCard] = useState(false)

  const createCardsByData = async (e) => {
    e.preventDefault()
    if (cardTitle && cardDesc && cardVisiblity) {
      setCreatingCard(true);
      const data = {
        stageId: id,
        boardId: router.query.boardId,
        title: cardTitle,
        visibility: cardVisiblity,
        desc: cardDesc,
        userEmail: userEmail,
        priority: cardPriority,
      }
      try {
        const response = await axios.post(`${ApiUrl}/api/cards/create`, data);
        console.log('response', response.data.boardId);
        setCreatingCard(false);
        toast.success('Cards Created Successfully', {
          position: "top-center",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        setCardTitle("")
        setCardDesc("")
        onClose()
        // router.push(`/${response.data.boardId}`)

      } catch (error) {
        console.log(error)
        setCreatingCard(false);
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
          <form onSubmit={(e) => createCardsByData(e)} className=' flex flex-col gap-[1rem] relative  ' >
            <div onClick={(e) => onClose()} className=' absolute flex justify-center items-center w-[2rem] h-[2rem] rounded-[50%] border-[1px] right-[-2rem] top-[-2rem] border-[#7436d8] shadow-md hover:text-white hover:bg-[#7436d8] hover:border-white cursor-pointer ' >
              <MdClose className=' text-[1.3rem]  ' />
            </div>
            <div className=' flex flex-col  gap-[.4rem] ' >
              <label onClick={() => alert(id)} className=' font-inter text-[.85rem]  '  > Card Title <span className=' text-red-600 ' >*</span>  </label>
              <input required onChange={(e) => setCardTitle(e.target.value)} value={cardTitle} placeholder='Enter Your Card Name' type="text" name="" id="board-title" className='   px-[.5rem] py-[.4rem] outline-none bg-secondary border-[.5px] border-black border-opacity-30  rounded-md' />
            </div>
            <div className=' flex flex-col  gap-[.4rem]   ' >
              <label className=' font-inter text-[.85rem]  ' > Card Description <span className=' text-red-600 ' >*</span> </label>
              <textarea required onChange={(e) => setCardDesc(e.target.value)} value={cardDesc} placeholder='Enter Your Card Description...' name="" id="" rows="3" className='   px-[.5rem] py-[.4rem] outline-none bg-secondary border-[.5px] border-black border-opacity-30  rounded-md'  ></textarea>
              {/* <input type="text" name="" id="board-desc" /> */}
            </div>
            <div className=' flex  items-center  gap-[2.5rem]   ' >
              <label className=' font-inter text-[.85rem]  ' > Priority <span className=' text-red-600 ' >*</span>  </label>
              <div className=' flex gap-[1.5rem]   ' >
                {/* ---------------------------- */}
                <div onClick={() => setCardPriority("High")} className={`relative cursor-pointer   ${cardPriority === "High" ? "border-[#C70000] shadow-formCard" : "border-[#CFCFCF]"}  border-2 rounded-md  flex justify-center items-center gap-[.9rem] flex-col px-[1rem] py-[1rem]  w-[7rem] h-[2rem]    `} >
                  <h2 className=' text-[.9rem] font-inter font-[600] ' >High</h2>
                  <div className={` ${cardPriority === "High" ? "" : "hidden"} absolute left-[.5rem] top-[.5rem] w-[.75rem] h-[.75rem] rounded-[50%] bg-[#C70000] `} />
                </div>
                {/* ---------------------------- */}
                <div onClick={() => setCardPriority("Medium")} className={`relative cursor-pointer ${cardPriority === "Medium" ? "border-[#F5C400] shadow-formCard" : "border-[#CFCFCF]"} border-2 rounded-md  flex justify-center items-center gap-[.9rem] flex-col px-[1rem] py-[1rem]  w-[7rem] h-[2rem]   `} >
                  <h2 className=' text-[.9rem] font-inter font-[600] ' >Medium</h2>
                  <div className={` ${cardPriority === "Medium" ? "" : "hidden"} absolute left-[.5rem] top-[.5rem] w-[.75rem] h-[.75rem] rounded-[50%] bg-[#F5C400] `} />
                </div>
                {/* ---------------------------- */}
                <div onClick={() => setCardPriority("Low")} className={`relative cursor-pointer ${cardPriority === "Low" ? "border-[#88D9EB] shadow-formCard" : "border-[#CFCFCF]"} border-2 rounded-md  flex justify-center items-center gap-[.9rem] flex-col px-[1rem] py-[1rem]  w-[7rem] h-[2rem]   `} >
                  <h2 className=' text-[.9rem] font-inter font-[600] ' >Low</h2>
                  <div className={` ${cardPriority === "Low" ? "" : "hidden"} absolute left-[.5rem] top-[.5rem] w-[.75rem] h-[.75rem] rounded-[50%] bg-[#88D9EB] `} />
                </div>
              </div>
            </div>
            <div className=' flex flex-col  gap-[.4rem]   ' >
              <label className=' font-inter text-[.85rem]  ' > Visiblity <span className=' text-red-600 ' >*</span> </label>
              <div className=' flex gap-[1.5rem]   ' >
                {/* ---------------------------- */}
                <div onClick={() => setCardVisiblity("Private")} className={`relative cursor-pointer   ${cardVisiblity === "Private" ? "border-[#5253F1] shadow-formCard" : "border-[#CFCFCF]"}  border-2 rounded-2xl  flex justify-center items-center gap-[.9rem] flex-col px-[1rem] py-[1rem]  w-[12rem]    `} >
                  <MdLockOutline className=' mx-auto text-[2rem] ' />
                  <h2 className=' text-[.9rem] font-inter font-[600] ' >Private</h2>
                  <p className=' text-[.8rem] font-inter text-center font-[400]  ' >Only board members can see and edit this board.</p>
                  <div className={` ${cardVisiblity === "Private" ? "" : "hidden"} absolute left-[.5rem] top-[.5rem] w-[1.25rem] h-[1.25rem] rounded-[50%] bg-primary `} />
                </div>
                {/* ---------------------------- */}
                <div onClick={() => setCardVisiblity("Workspace")} className={`relative cursor-pointer ${cardVisiblity === "Workspace" ? "border-[#5253F1] shadow-formCard" : "border-[#CFCFCF]"} border-2 rounded-2xl flex justify-center items-center gap-[.9rem] flex-col px-[1rem] py-[1rem]  w-[12rem]   `} >
                  <MdGroup className=' mx-auto text-[2.5rem] ' />
                  <h2 className=' text-[.9rem] font-inter font-[600] ' >Workspace</h2>
                  <p className=' text-[.8rem] font-inter text-center font-[400]  ' >All members of your Workspace can see and edit this board.</p>
                  <div className={` ${cardVisiblity === "Workspace" ? "" : "hidden"} absolute left-[.5rem] top-[.5rem] w-[1.25rem] h-[1.25rem] rounded-[50%] bg-primary `} />
                </div>
                {/* ---------------------------- */}
                <div onClick={() => setCardVisiblity("Public")} className={`relative cursor-pointer ${cardVisiblity === "Public" ? "border-[#5253F1] shadow-formCard" : "border-[#CFCFCF]"} border-2 rounded-2xl flex justify-center items-center gap-[.9rem] flex-col px-[1rem] py-[1rem]  w-[12rem]   `} >
                  <MdPublic className=' mx-auto text-[2rem] ' />
                  <h2 className=' text-[.9rem] font-inter font-[600] ' >Public</h2>
                  <p className=' text-[.8rem] font-inter text-center font-[400]  ' >Anyone on the internet can see this board. Only board members can edit.</p>
                  <div className={` ${cardVisiblity === "Public" ? "" : "hidden"} absolute left-[.5rem] top-[.5rem] w-[1.25rem] h-[1.25rem] rounded-[50%] bg-primary `} />
                </div>
              </div>
            </div>
            <button type='submit' className={` ${creatingCard ? "animate-pulse" : ""} flex gap-[.8rem] justify-center items-center bg-primary py-[.5rem] text-white rounded-md mt-[2rem] `} > {creatingCard ? "Creating Cards" : "Create card"}
              <div className={` ${creatingCard ? "" : "hidden"} w-[1rem] h-[1rem] border-t-2  border-white rounded-[50%] animate-spin `} />
            </button>
          </form>

        </div>
      </div>
    </>
  )
}

export default CreateCards
