import React from 'react'
import Sigma from './Sigma'

export default ({
  children,
  ...others
}) => (
  <Sigma
    bg={'#f7f7f7'}
    d={'flex'}
    alignItems={'center'}
    h={60}
    mt={30}
    w={'100%'}
    {...others}
  >
    {children}
  </Sigma>
)
