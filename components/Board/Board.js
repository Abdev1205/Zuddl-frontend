import React from 'react'
import { useEffect, useState } from 'react';
import { useSession, signIn, signOut } from "next-auth/react"
import BoardDeleteModal from '../Modals/BoardDeleteModal';
import BoardEditModal from '../Modals/BoardEditModal';
import axios from 'axios';
import Link from 'next/link';
import { MdOutlineOpenInNew } from "react-icons/md"
import NoResultAnimation from '../Animation/NoResultAnimation';
import { ApiUrl } from "../../utils/BaseUrl"

const Board = () => {
  const { data: session } = useSession();
  const email = session.user.email;
  const [userEmail, setUserEmail] = useState(email);
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [boards, setBoards] = useState([]);
  const [deleteModel, setDeleteModel] = useState(false)
  const [deleteId, setDeleteId] = useState()
  const [editModel, setEditModel] = useState(false)
  const [editId, setEditId] = useState()
  const fetchBoards = async () => {
    try {
      console.log(ApiUrl)
      setUserEmail(email);
      const response = await axios.get(`${ApiUrl}/api/boards/user/${userEmail}`);
      setBoards(response.data.boards)
    } catch (error) {
      console.error('Error:', error);
    }
  };
  useEffect(() => {
    fetchBoards()
  }, [editModel, deleteModel])

  const editBoardById = (id) => {
    setEditId(id);
    setEditModel(!editModel);
  }

  const deleteBoard = (id) => {
    setDeleteId(id);
    setDeleteModel(!deleteModel);
  }
  return (
    <>
      <div className='mt-[3rem] flex flex-col   pl-[6rem]  flex-wrap gap-[1rem]'>
        <h1 className=' flex gap-[1rem] text-[2rem] font-inter font-[600] ' >
          <span className=' w-[.5rem]  rounded-[.25rem] bg-primary  ' ></span>
          Boards</h1>
        <div className=' flex flex-wrap gap-[1rem] mt-[2rem] ' >

          {boards && boards.length > 0 ?
            boards.map((content, index) => {
              return (
                <div

                  key={index}
                  className={` bg-white border-2 border-[#CFCFCF] px-[.6rem] w-[10rem] py-[.4rem] flex flex-col h-fit gap-[.1rem]  rounded-md   `}
                  onMouseEnter={() => setHoveredIndex(index)}
                  onMouseLeave={() => setHoveredIndex(-1)}
                >
                  <BoardDeleteModal
                    visible={deleteModel}
                    onClose={() => setDeleteModel(false)}
                    callback={() => fetchBoards()}
                    deleteId={deleteId}

                  />
                  <BoardEditModal
                    visible={editModel}
                    onClose={() => setEditModel(false)}
                    callback={() => fetchBoards()}
                    editId={editId}
                  />
                  <h1 className='flex items-center justify-between font-inter font-[600] capitalize text-[.9rem]'>
                    {content.boardTitle}
                    <Link
                      href={`/${content._id}`}
                      className=' opacity-70 '
                    >
                      <MdOutlineOpenInNew />
                    </Link>


                  </h1>
                  <p className='font-inter font-[400] capitalize text-[.7rem] opacity-70'>
                    {content.desc}
                  </p>
                  {/* code for delete and update button */}
                  <div
                    className={` justify-between mt-[.5rem] items-center ${hoveredIndex === index ? 'opacity-100 flex ' : 'opacity-0 hidden '}  duration-300`}
                  >
                    <div onClick={() => editBoardById(content._id)} className='flex gap-[.2rem] text-gray-600 hover:scale-110 duration-300 hover:cursor-pointer'>
                      <svg
                        className='w-[.8rem] stroke-green-700'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <path d='M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7'></path>
                        <path d='M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z'></path>
                      </svg>
                      <button className='font-[400] text-[.75rem] text-green-700'>
                        Edit
                      </button>
                    </div>
                    <div onClick={() => deleteBoard(content._id)} className='flex gap-[.2rem] text-gray-600 hover:scale-110 duration-300 hover:cursor-pointer'>
                      <svg
                        className='w-[.8rem] stroke-red-700'
                        viewBox='0 0 24 24'
                        fill='none'
                        stroke='currentColor'
                        strokeWidth='2'
                        strokeLinecap='round'
                        strokeLinejoin='round'
                      >
                        <polyline points='3 6 5 6 21 6'></polyline>
                        <path d='M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2'></path>
                        <line x1='10' y1='11' x2='10' y2='17'></line>
                        <line x1='14' y1='11' x2='14' y2='17'></line>
                      </svg>
                      <button className='font-[400] text-[.75rem] text-red-700'>
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              );
            }) : (
              <div className=' flex flex-col items-center justify-center w-[100%] ' >

                <NoResultAnimation />
                <h1 className=' text-[1.4rem] font-inter font-[600] ' >You have not Created any Board , Create it </h1>
              </div>
            )}
        </div>
      </div>
    </>
  )
}

export default Board