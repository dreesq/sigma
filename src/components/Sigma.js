import styled from 'styled-components'
import {toMedia, toDashed, toCss, toHover, getValue} from '../utils'

const others = [
  'display',
  'color',
  'background',
  'fontSize',
  'fontFamily',
  'width',
  'height',
  'position',
  'top',
  'right',
  'bottom',
  'border',
  'borderLeft',
  'borderBottom',
  'borderRight',
  'borderTop',
  'alignItems',
  'justifyContent',
  'order',
  'zIndex',
  'transform',
  'textAlign',
  'fontStyle',
  'transition',
  'fontWeight',
  'textDecoration',
  'float',
  'clearfix',
  'animation',
  'boxShadow',
  'boxSizing',
  'filter',
  'flex',
  'flexDirection',
  'flexGrow',
  'flexWrap',
  'flexShrink',
  'grid',
  'gridGap',
  'gridArea',
  'gridTemplate',
  'letterSpacing',
  'lineBreak',
  'listStyle',
  'maxWidth',
  'maxHeight',
  'minWidth',
  'minHeight',
  'objectFit',
  'opacity',
  'outline',
  'overflow',
  'overflowX',
  'overflowY',
  'cursor',
  'pointerEvents',
  'resize',
  'textIndent',
  'textOverflow',
  'transformOrigin',
  'verticalAlign',
  'whiteSpace',
  'wordBreak',
  'borderRadius',
  'margin',
  'padding',
  'visibility',
  'userSelect'
]

const mappings = {
  p: 'padding',
  pr: 'padding-right',
  pl: 'padding-left',
  pt: 'padding-top',
  pb: 'padding-bottom',
  m: 'margin',
  mb: 'margin-bottom',
  mt: 'margin-top',
  ml: 'margin-left',
  mr: 'margin-right',
  bg: 'background',
  d: 'display',
  w: 'width',
  h: 'height',
  ...others.reduce((all, current) => {
    all[current] = toDashed(current)
    return all
  }, {})
}

const attrHelpers = Object.keys(mappings).map(key => props => toCss(mappings[key],
  typeof props[key] === 'function' ? props[key](props) : props[key],
  getValue('breakpoints', props))
)

const rawHelpers = [
  props => props.css && (typeof props.css === 'function' ? props.css(props) : props.css),
  props => props.hover && (typeof props.hover === 'function' ? toHover(props.hover(props)) : toHover(props.hover)),
  ...Object.keys(getValue('breakpoints')).map(
    bp => props =>
      props[bp] && toMedia(getValue(`breakpoints.${bp}`, props), typeof props[bp] === 'function' ? props[bp](props) : props[bp])
  )
]

const helpers = [
  ...rawHelpers,
  ...attrHelpers
]

export default styled.div(...helpers);
