import Sigma from './Sigma'
import React from 'react'

export default ({
  children,
  css,
  ...others
}) => (
  <Sigma
    as={'table'}
    css={
      props => `
        width: 100%;
        border-spacing: 0;
        border-collapse: collapse;
        
        th {
            border-bottom: 1px solid #dedede;
            padding: 12px 8px;
            text-align: left;
            font-weight: 500;
        }
        
        tr:not(:last-child) {
            border-bottom: 1px solid #dedede;
        }
        
        td {
            padding: 12px 8px;
            text-align: left;
        }
    
        ${css ? (typeof css === 'function' ? css(props) : css) : ''}
    `}
    {...others}
    >
    {children}
  </Sigma>
);
