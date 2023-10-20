import React from 'react'
import Lottie from 'lottie-react';
import noResultAnim from "../../public/images/NoResult.json"

const NoResultAnimation = () => {
  return (
    <>
      <Lottie
        animationData={noResultAnim}
        autoplay={true}
        loop={true}
      />
    </>
  )
}

export default NoResultAnimation
