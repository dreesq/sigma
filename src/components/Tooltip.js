import React from 'react'
import Sigma from './Sigma'

export default ({
  css,
  children,
  ...others
}) => (
  <Sigma
    as={'span'}
    css={props => `
      &:hover &:nth-child(2) {
          display: inline-block;
      }
      
      & > *:nth-child(2) {
          position: absolute;
          display: none;
          z-index: 3;
      }
     
     ${css ? (typeof css === 'function' ? css(props) : css) : ''}
    `}
    {...others}
  >
    {children}
  </Sigma>
)
