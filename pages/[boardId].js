import React from 'react'
import { useRouter } from 'next/router'
import LeftPanel from '@/components/LeftPanel/LeftPanel';
import LoginWrapper from './LoginWrapper';
import Navbar from '@/components/Navbar';
import Stages from '@/components/Board/Stages';

const board = () => {
  const router = useRouter();
  const id = router.query.boardId;

  return (
    <>
      <LoginWrapper>
        <Navbar />
        <div className=' flex  w-[100%] h-[91vh] bg-secondary  ' >
          <LeftPanel />
          <Stages />
        </div>
      </LoginWrapper>
    </>
  )
}

export default board
