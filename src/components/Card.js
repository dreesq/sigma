import Sigma from './Sigma'
import React from 'react'

export default ({
  children,
  ...others
}) => (
  <Sigma
    p={[25, 30, 40, 30]}
    borderRadius={4}
    border={'1px solid #dedede'}
    bg={'#fff'}
    boxShadow={'0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.10)'}
    width={'100%'}
    {...others}
  >
    {children}
  </Sigma>
)
