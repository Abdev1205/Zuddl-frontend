import React from 'react'
import Lottie from 'lottie-react';
import deleteAnimation from '../../public/images/delete.json'

const DeleteLottieAnimation = () => {
  return (
    <div className='  flex mx-auto justify-center w-[8rem] '>
      <Lottie
        animationData={deleteAnimation}
        autoplay={true}
        loop={true}
      />
    </div>

  )
}

export default DeleteLottieAnimation
