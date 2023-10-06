import React from 'react'
import Navbar from '@/components/Navbar'
import Sucess from '@/components/Alerts/Sucess'

const Layout = ({ children }) => {
  return (
    <>
      <div>
        <Navbar />
        <Sucess />
        {children}
      </div>
    </>

  )
}

export default Layout
