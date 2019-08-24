import Sigma from './Sigma'
import React from 'react'
import {getValue} from '../utils'

export default ({
  children,
  color = 'primary',
  ...others
}) => (
  <Sigma
    p={[20, 15]}
    borderRadius={4}
    border={props => `1px solid ${getValue(`colors.${color}`, props)}`}
    bg={props => getValue(`colors.${color}`, props)}
    color={'#fff'}
    {...others}>
    {children}
  </Sigma>
)
