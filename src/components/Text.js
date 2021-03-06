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
    className={`text-component${className ? ` ${className}` : ''}`}
    {...(color ? {c: props => getValue(`colors.${color}`, props)} : {})}
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
