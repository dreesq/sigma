import Sigma from './Sigma'
import React from 'react'
import {getValue} from '../utils'

const sizes = {
  small: {
    p: [5, 10],
    fontSize: 11
  },
  medium: {
    p: [8, 14],
    fontSize: 13
  },
  large: {
    p: [11, 16],
    fontSize: 15
  }
}

export default ({
  children,
  size = 'medium',
  color = 'primary',
  ...others
}) => (
  <Sigma
    d={'inline-block'}
    borderRadius={4}
    userSelector={'none'}
    color={'#fff'}
    userSelect={'none'}
    bg={props => getValue(`colors.${color}`, props)}
    {...sizes[size]}
    {...others}
  >
    {children}
  </Sigma>
)
