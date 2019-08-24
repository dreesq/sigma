import Sigma from './Sigma'
import React from 'react'
import {getValue} from '../utils'

export default ({
  children,
  color = 'primary',
  ...others
}) => React.createElement(Sigma, {
  p: [20, 15],
  borderRadius: 4,
  border: props => `1px solid ${getValue(`colors.${color}`, props)}`,
  width: '100%',
  bg: props => getValue(`colors.${color}`, props),
  color: '#fff',
  ...others
}, children)
