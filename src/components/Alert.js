import Sigma from './Sigma'
import React from 'react'
import {getValue, shadeColor} from '../utils'

export default ({
  children,
  color = 'primary',
  ...others
}) => (
  <Sigma
    p={[20, 15]}
    borderRadius={4}
    bg={props => `${shadeColor(getValue(`colors.${color}`, props),  200)}`}
    color={props => getValue(`colors.${color}`, props)}
    {...others}>
    {children}
  </Sigma>
)
