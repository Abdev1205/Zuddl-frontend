import React from 'react'
import { MdOutlineDashboard, MdOutlineGroups, MdOutlineAdd } from "react-icons/md"
import CreateStages from '../Modals/CreateStages'
import { useSession, signIn, signOut } from "next-auth/react"
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useRouter } from 'next/router';
import { redClip, yellowClip, blueClip } from '@/public/assets'
import Image from 'next/image'
import CreateCards from '../Modals/CreateCards'
import StagesCard from './StagesCard'
import { ApiUrl } from "../../utils/BaseUrl"

const Stages = () => {
  const { data: session } = useSession();
  const router = useRouter();
  const imageUrl = session?.user.image;
  const [stageModel, setStageModel] = useState(false)
  const [cardsModel, setCardsModel] = useState(false)
  const [fetchDataAfterDeleting, setFetchDataAfterDeleting] = useState(false)
  const [stagesData, setStagesData] = useState([]);
  const [cardsData, setCardsData] = useState([]);
  const [reload, setReload] = useState(false)
  const [tempId, setTempId] = useState();

  const createCardsOpertaion = (id) => {
    setTempId(id);
    setCardsModel(!cardsModel);

  }



  const fetchCardData = async () => {
    console.log(router.query.boardId)
    console.log(fetchDataAfterDeleting)
    try {
      const response = await axios.get(`${ApiUrl}/api/card/${router.query.boardId}/cards`);
      // setReload(!reload)
      setCardsData(response.data.cards);
      console.log(response.data.cards)

    } catch (error) {
      console.log("Error", error?.message || "")
    }
  }

  useEffect(() => {
    fetchCardData();
  }, [cardsModel, reload]);

  const fetchData = async () => {
    try {
      const response = await axios.get(`${ApiUrl}/api/board/${router.query.boardId}/stages`);
      setStagesData(response.data.stages);
      console.log(response.data.stages)
      console.log(reload);
      // setReload(!reload)

    } catch (error) {
      console.log("Error", error?.message || "")
    }
  }
  useEffect(() => {
    fetchData();
  }, [stageModel, cardsModel]);

  return (
    <>
      <div className=' flex relative w-[100%] overflow-x-scroll  h-[91] ' >
        <CreateStages
          visible={stageModel}
          onClose={() => setStageModel(false)}
          callback={() => fetchData()}
        />
        <CreateCards
          visible={cardsModel}
          onClose={() => setCardsModel(!cardsModel)}
          callback={() => fetchCardData(tempId)}
          id={tempId}
          setFetchDataAfterDeleting={() => setFetchDataAfterDeleting()}

        />
        <div className='  flex gap-[2rem]   h-[100%] py-[1.5rem] px-[1.5rem]  ' >
          {
            stagesData && stagesData.map((content, index) => {
              const filteredCards = cardsData.filter((card) => card.stageId === content._id);
              return (
                <div key={index} className={` relative border-2 border-[#CFCFCF] flex px-[1rem] gap-[.4rem]  rounded-xl py-[1rem] flex-col w-[15rem] max-h-[100%] h-fit bg-white ${content.priority === "High" ? " border-[#C70000]" : ""} ${content.priority === "Medium" ? " " : ""} ${content.priority === "Low" ? " " : ""}   `}  >
                  <Image
                    src={content.priority === "High" ? redClip : content.priority === "Medium" ? yellowClip : blueClip}
                    height={500}
                    width={500}
                    className=' absolute right-[1rem] top-[.3rem]  w-[1.8rem]  drop-shadow-lg '

                  />

                  <h1 onClick={() => fetchCardData(content._id)} className=' font-inter font-[600] ' >{content.title}</h1>
                  <hr className='   ' />
                  <div className='h-fit  pr-[.6rem]  max-h-[80vh] overflow-y-scroll ' >
                    <StagesCard reloadData={() => setReload(!reload)} stageId={filteredCards.stageId} cardsData={filteredCards} />
                  </div>





                  <div onClick={() => createCardsOpertaion(content._id)} className={` flex items-center   translate-x-[-1.1rem] hover:opacity-80 duration-300 mt-[1rem]  `}>
                    <div className={` translate-x-[50%] flex  bg-white  duration-300 justify-center items-center w-[2.5rem] h-[2.5rem] rounded-[50%] border-[1px]   border-[#7436d8] shadow-md  cursor-pointer `} >
                      <MdOutlineAdd className=' text-[1.3rem]  ' />
                    </div>
                    <button className=' px-[1rem] h-[2rem] py-[.1rem] rounded-md bg-primary text-white w-[10rem] ' >Add Cards</button>
                  </div>



                </div>
              )
            })
          }

          <div onClick={() => setStageModel(true)} className={` flex h-[3rem]  my-auto items-center hover:opacity-80 duration-300 ${stagesData.length != 0 ? " top-[50%] ml-[2rem]" : " absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]"}  `}>
            <div className={` translate-x-[50%] flex  bg-white  duration-300 justify-center items-center w-[3.2rem] h-[3.2rem] rounded-[50%] border-[1px]   border-[#7436d8] shadow-md  cursor-pointer `} >
              <MdOutlineAdd className=' text-[1.3rem]  ' />
            </div>
            <button className=' px-[1rem] py-[.5rem] rounded-md bg-primary text-white w-[10rem] ' >Add Stages</button>
          </div>
        </div>
      </div>
    </>
  )
}

export default Stages
