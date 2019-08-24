import Sigma from './Sigma'
import React from 'react'

export default ({
  children,
  css,
  ...others
}) => (
  <Sigma
    bg={'#f3f3f3'}
    display={'flex'}
    alignItems={'center'}
    height={65}
    css={props => `
        ul {
            list-style: none;
            padding: 0;
        }
        
        a {
            color: #292929;
            text-decoration: none;
            border: none;
            padding: 0;
        }
        
        ${css ? (typeof css === 'function' ? css(props) : css) : ''}
    `}
    {...others}
  >
    {children}
  </Sigma>
);
