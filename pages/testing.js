import React from 'react'
import databaseData from '@/Db/Databse';
import LoginWrapper from './LoginWrapper';
import AccountDropdown from '@/components/AccountDropdown';

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
