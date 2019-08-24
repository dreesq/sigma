import Sigma from './Sigma'
import React from 'react'
import {shadeColor, getValue} from '../utils'

const sizes = {
  small: {
    p: [10, 20],
    fontSize: 14
  },
  medium: {
    p: [12, 24],
    fontSize: 16
  },
  large: {
    p: [14, 30],
    fontSize: 17
  }
}

export default ({
  children,
  block = false,
  inverted = false,
  disabled = false,
  loading = false,
  color = 'primary',
  size = 'medium',
  className = '',
  css,
  hover,
  ...others
}) => React.createElement(Sigma, {
  as: 'button',
  outline: 'none',
  borderRadius: 4,
  cursor: 'pointer',
  border: props => `1px solid ${getValue(`colors.${color}`, props)}`,
  ...sizes[size],
  ...(inverted ? {
    bg: 'transparent',
    color: props => getValue(`colors.${color}`, props),
    hover: props => `
            border-color: ${shadeColor(getValue(`colors.${color}`, props), 20)};
            color: ${shadeColor(getValue(`colors.${color}`, props), 20)};
            ${hover ? (typeof hover === 'function' ? hover(props) : hover) : ''}
        `
  } : {
    color: '#fff',
    bg: props => getValue(`colors.${color}`, props),
    hover: props => `
            background: ${shadeColor(getValue(`colors.${color}`, props), 20)};
            ${hover ? (typeof hover === 'function' ? hover(props) : hover) : ''}
        `
  }),
  className: `${loading ? 'loading' : ''}${className}`,
  ...(block ? {width: '100%'} : {}),
  ...(disabled ? {
    cursor: 'not-allowed',
    opacity: '.5'
  } : {}),
  css: props => `
        &.loading {
            cursor: not-allowed;
        }
        
        ${css ? (typeof css === 'function' ? css(props) : css) : ''}
    `,
  ...others
}, children)
