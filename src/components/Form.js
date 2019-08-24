import Sigma from './Sigma'
import React from 'react'
import {shadeColor, getValue} from '../utils'

const Form = ({children, ...others}) => React.createElement(Sigma, {
  as: 'form',
  ...others
}, children)

const sizes = {
  small: {
    p: [11, 14],
    fontSize: 14
  },
  medium: {
    p: [14, 15],
    fontSize: 15
  },
  large: {
    p: [16, 17],
    fontSize: 16
  }
}

const Input = ({
  children,
  size = 'medium',
  error = false,
  as = 'input',
  ...others
}) => React.createElement(Sigma, {
  as: as,
  ...sizes[size],
  width: '100%',
  borderRadius: 4,
  bg: props => `${!error ? 'transparent' : shadeColor(getValue('colors.danger', props), 200)}`,
  border: props => `1px solid ${error ? getValue('colors.danger', props) : '#dedede'}`,
  outline: 'none',
  ...(as === 'select' ? {
    boxSizing: 'content-box',
    height: sizes[size].p[0] * 2 + sizes[size].fontSize,
    textIndent: sizes[size].p[1] - 5,
    p: 0
  } : {}),
  ...(as === 'textarea' ? {
    resize: 'vertical',
    minHeight: 90
  } : {}),
  ...others
}, children)

const Label = ({
  children,
  error = false,
  ...others
}) => React.createElement(Sigma, {
  as: 'label',
  d: 'block',
  mb: 10,
  fontWeight: '500',
  ...(error ? {color: props => getValue('colors.danger', props)} : {}),
  ...others
}, children)

const Group = ({children, css, ...others}) => React.createElement(Sigma, {
  mb: 12,
  css: props => `
        .sg-text-component {
            font-size: 14px;
            margin-top: 4px;
        }
        
        ${css ? (typeof css === 'function' ? css(props) : css) : ''}
    `,
  ...others
}, children)

export {
  Form,
  Input,
  Label,
  Group
}
