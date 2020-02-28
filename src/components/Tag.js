import Sigma from './Sigma'
import React from 'react'
import {getValue, shadeColor} from '../utils'

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
    color={props => getValue(`colors.${color}`, props)}
    userSelect={'none'}
    bg={props => shadeColor(getValue(`colors.${color}`, props), 200)}
    {...sizes[size]}
    {...others}
  >
    {children}
  </Sigma>
)
