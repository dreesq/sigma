import Sigma from './Sigma'
import React from 'react'

export default ({
  children,
  ...others
}) => (
  <Sigma
    p={[25, 30, 40, 30]}
    borderRadius={4}
    bg={'#fff'}
    boxShadow={'0 5px 10px rgba(154,160,185,.05), 0 15px 40px rgba(166,173,201,.2)'}
    width={'100%'}
    {...others}
  >
    {children}
  </Sigma>
)
