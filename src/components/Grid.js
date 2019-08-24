import Sigma from './Sigma'
import React from 'react'
import {toAllBreakpoints, getValue} from '../utils'

const Container = ({
  children,
  fluid,
  css,
  ...others
}) => React.createElement(Sigma, {
  css: props => `
        width: 100%;
        padding-left: 15px;
        padding-right: 15px;
       
        ${!fluid && toAllBreakpoints(size => size && `
            width: ${size}px
        `, getValue('breakpoints', props))}
        
        ${css ? (typeof css === 'function' ? css(props) : css) : ''}
    `,
  ...(fluid ? {} : {m: '0 auto'}),
  ...others
}, children)

const Row = ({
  children,
  css,
  ...others
}) => React.createElement(Sigma, {
  css: props => `
        display: flex;
        flex-wrap: wrap;
        margin-right: -15px;
        margin-left: -15px;
        ${css ? (typeof css === 'function' ? css(props) : css) : ''}
    `,
  ...others
}, children)

const Col = ({
  children,
  css,
  ...others
}) => React.createElement(Sigma, {
  css: props => `
        padding-left: 15px;
        padding-right: 15px;
        min-height: 1px;
        width: 100%;
        ${css ? (typeof css === 'function' ? css(props) : css) : ''}
    `,
  ...others
}, children)

export {
  Container,
  Row,
  Col
}
