import Sigma from './Sigma'
import React from 'react'
import {getValue} from '../utils'

export default ({
  children,
  color,
  ellipsis,
  css,
  className = '',
  ...others
}) => (
  <Sigma
    as={'p'}
    className={`sg-text-component ${className}`}
    {...(color ? {color: props => getValue(`colors.${color}`, props)} : {})}
    {...(ellipsis ? {
      textOverflow: 'ellipsis',
      overflow: 'hidden',
      whiteSpace: 'pre'
    } : {})}
    {...others}
  >
    {children}
  </Sigma>
)
