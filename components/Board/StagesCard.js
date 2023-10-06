import React, { useState } from 'react';
import CardDeleteModal from '../Modals/CardDeleteModal';
import CardEditModal from '../Modals/CardEditModal';

const StagesCard = ({ stageId, cardsData, fetchDataAgain = () => { }, reloadData = () => { } }) => {
  const [hoveredIndex, setHoveredIndex] = useState(-1);
  const [deleteModel, setDeleteModel] = useState(false)
  const [deleteId, setDeleteId] = useState()
  const [editModel, setEditModel] = useState(false)
  const [editId, setEditId] = useState()

  const editCardById = (id) => {
    setEditId(id);
    setEditModel(!editModel);
  }

  const deleteCard = (id) => {
    setDeleteId(id);
    setDeleteModel(!deleteModel);
  }

  return (
    <>
      <div className='mt-[1rem] flex flex-col gap-[.8rem]'>
        {cardsData &&
          cardsData.map((content, index) => {
            return (
              <div
                key={index}
                className={`px-[.4rem] py-[.4rem] flex flex-col gap-[.1rem] border-[.01px] rounded-md ry bg-opacity-[.14] ${content.priority === 'High'
                  ? 'border-red-400 bg-red-400'
                  : content.priority === 'Medium'
                    ? 'border-yellow-400 bg-yellow-400'
                    : 'border-blue-400 bg-blue-400'
                  }`}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(-1)}
              >
                <CardDeleteModal
                  visible={deleteModel}

                  onClose={() => setDeleteModel(false)}
                  callback={() => reloadData()}
                  id={deleteId}

                />
                <CardEditModal
                  visible={editModel}
                  onClose={() => setEditModel(false)}
                  callback={() => reloadData()}
                  stageId={stageId}
                  editId={editId}
                />
                <h1 className='font-inter font-[600] capitalize text-[.9rem]'>
                  {content.title}
                </h1>
                <p className='font-inter font-[400] capitalize text-[.7rem] opacity-70'>
                  {content.desc}
                </p>
                {/* code for delete and update button */}
                <div
                  className={`flex justify-between mt-[.5rem] items-center ${hoveredIndex === index ? 'opacity-100 flex ' : 'opacity-0 hidden '
                    } transition-all duration-300`}
                >
                  <div onClick={() => editCardById(content._id)} className='flex gap-[.2rem] text-gray-600 hover:scale-110 duration-300 hover:cursor-pointer'>
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
                  <div onClick={() => deleteCard(content._id)} className='flex gap-[.2rem] text-gray-600 hover:scale-110 duration-300 hover:cursor-pointer'>
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
          })}
      </div>
    </>
  );
};

export default StagesCard;
