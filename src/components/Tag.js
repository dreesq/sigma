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
}) => React.createElement(Sigma, {
  d: 'inline-block',
  borderRadius: 4,
  userSelect: 'none',
  color: '#fff',
  bg: props => getValue(`colors.${color}`, props),
  ...sizes[size],
  ...others
}, children)
