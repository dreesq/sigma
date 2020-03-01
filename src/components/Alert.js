import Sigma from './Sigma'
import React from 'react'
import {getValue, hexToOpacity} from '../utils'

export default ({
  children,
  color = 'primary',
  ...others
}) => (
  <Sigma
    p={[20, 15]}
    borderRadius={4}
    bg={props => `${hexToOpacity(getValue(`colors.${color}`, props),  0.15)}`}
    color={props => getValue(`colors.${color}`, props)}
    {...others}>
    {children}
  </Sigma>
)
