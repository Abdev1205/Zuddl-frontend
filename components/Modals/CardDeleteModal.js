import React, { useState } from 'react'
import { useSession, signIn, signOut } from "next-auth/react"
import { MdLockOutline, MdGroup, MdPublic, MdClose } from "react-icons/md"
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useRouter } from 'next/router';
import DeleteLottieAnimation from '../Animation/DeleteLottieAnimation';

const CardDeleteModal = ({ visible, onClose = () => { }, callback = () => { }, id, fetchDataAgain = () => { } }) => {

  if (!visible) return null;
  const { data: session } = useSession();
  const router = useRouter();
  const [deletingCard, setDeletingCard] = useState(false)

  const deleteCardById = async (e) => {
    e.preventDefault()
    setDeletingCard(true);

    try {
      const response = await axios.delete(`http://localhost:4000/api/delete/cards/${id}`);
      setDeletingCard(false);
      toast.success('Cards Deleted Successfully', {
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
      // fetchDataAgain()
      // window.location.reload()

    } catch (error) {
      console.log(error)
      setDeletingCard(false);
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


  return (
    <>
      <div
        id="background"
        className="fixed inset-0 flex justify-center items-center z-50 bg-black bg-opacity-30"
        onClick={(e) => {
          if (e.target.id == "background") onClose();
        }}
      >
        <div className='  flex flex-col items-center justify-center w-[22rem] h-[24rem] gap-[1rem]  bg-white px-[2.5rem] py-[2.5rem] rounded-md shadow-2xl ' >
          <DeleteLottieAnimation />
          <p className=' font-inter font-[500] text-[.9rem] ' >Are you sure want to delete this Card</p>
          <div className='  flex flex-col gap-[1rem] w-[100%] mt-[1rem]  ' >
            <button onClick={(e) => deleteCardById(e)} className={` ${deletingCard ? "animate-pulse" : ""} flex gap-[.8rem] justify-center items-center bg-[#DC2626] py-[.6rem] text-white rounded-md mt-[2rem] `} > {deletingCard ? "Deleting Card" : "Delete card"}
              <div className={` ${deletingCard ? "" : "hidden"} w-[1rem] h-[1rem] border-t-2  border-white rounded-[50%] animate-spin `} />
            </button>
            {/* <button className=' rounded-md  px-[1rem] py-[.6rem] bg-[#DC2626] text-white font-inter  ' >Delete</button> */}
            <button onClick={() => onClose()} className=' rounded-md   py-[.6rem] bg-white border-2 border-[#D1D5DB]   font-inter  ' >Cancel</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default CardDeleteModal
