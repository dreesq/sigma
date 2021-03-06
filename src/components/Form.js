import Sigma from './Sigma'
import React from 'react'
import {shadeColor, getValue} from '../utils'

const Form = ({
  children,
  ...others
}) => (
  <Sigma as={'form'} {...others}>
    {children}
  </Sigma>
)

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
  icon = '',
  container = {},
  ...others
}) => (
  <Sigma position={'relative'} {...container}>
    <Sigma
      as={as}
      {...sizes[size]}
      width={'100%'}
      borderRadius={4}
      boxSizing={'border-box'}
      bg={props => `${!error ? getValue('colors.bg', props) : shadeColor(getValue('colors.danger', props), 200)}`}
      border={props => `1px solid ${error ? getValue('colors.danger', props) : '#dedede'}`}
      outline={'none'}
      {...(as === 'select' ? {
        height: sizes[size].p[0] * 2 + sizes[size].fontSize,
        p: 0,
        pl: sizes[size].p[1],
        pr: sizes[size].p[1]
      } : {})}
      {...(as === 'textarea' ? {
        resize: 'vertical',
        minHeight: 90
      } : {})}
      {...others}
    >
      {children}
    </Sigma>
    {icon && icon}
  </Sigma>
)

const Label = ({
  children,
  error = false,
  ...others
}) => (
  <Sigma
    as={'label'}
    d={'block'}
    mt={10}
    mb={10}
    fontWeight={'500'}
    {...(error ? {c: props => getValue('colors.danger', props)} : {})}
    {...others}
  >
    {children}
  </Sigma>
)

const Group = ({
  children,
  css,
  ...others
}) => (
  <Sigma
    mb={12}
    css={props => `
        .text-component {
            font-size: 14px;
            margin-top: 4px;
        }
        
        ${css ? (typeof css === 'function' ? css(props) : css) : ''}
    `}
    {...others}
  >
    {children}
  </Sigma>
)

export {
  Form,
  Input,
  Label,
  Group
}
