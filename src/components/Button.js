import Sigma from './Sigma'
import React from 'react'
import {shadeColor, getValue} from '../utils'

const sizes = {
  small: {
    p: [12, 13],
    fontSize: 14
  },
  medium: {
    p: [14, 21],
    fontSize: 16
  },
  large: {
    p: [16, 26],
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
}) => (
  <Sigma
    as={'button'}
    outline={'none'}
    borderRadius={4}
    cursor={'pointer'}
    boxSizing={'border-box'}
    border={'none'}
    {...sizes[size]}
    {...(inverted ? {
      bg: 'transparent',
      border: props => `1px solid ${getValue(`colors.${color}`, props)}`,
      c: props => getValue(`colors.${color}`, props),
      hover: props => `
            border-color: ${shadeColor(getValue(`colors.${color}`, props), 20)};
            color: ${shadeColor(getValue(`colors.${color}`, props), 20)};
            ${hover ? (typeof hover === 'function' ? hover(props) : hover) : ''}
        `
    } : {
      c: '#fff',
      bg: props => getValue(`colors.${color}`, props),
      hover: props => `
            background: ${shadeColor(getValue(`colors.${color}`, props), 20)};
            ${hover ? (typeof hover === 'function' ? hover(props) : hover) : ''}
        `
    })}
    className={`${loading ? 'loading' : ''}${className}`}
    {...(block ? {width: '100%'} : {})}
    {...(disabled ? {
      cursor: 'not-allowed',
      opacity: '.5'
    } : {})}
    css={props => `
        &.loading {
          cursor: not-allowed;
        }
        
        ${css ? (typeof css === 'function' ? css(props) : css) : ''}
    `}
    {...others}
  >
    {children}
  </Sigma>
)
