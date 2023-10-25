import React from 'react'
import databaseData from '@/Db/Databse';
import LoginWrapper from './LoginWrapper';
import AccountDropdown from '@/components/Modals/AccountDropdown';

const testing = () => {

  return (
    <>
      <LoginWrapper>
        <AccountDropdown />
      </LoginWrapper>
    </>
  )
}

export default testing
