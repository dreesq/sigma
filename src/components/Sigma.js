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
  'left',
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
  'lineHeight',
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
  'marginLeft',
  'marginTop',
  'marginBottom',
  'marginRight',
  'padding',
  'paddingLeft',
  'paddingRight',
  'paddingBottom',
  'paddingTop',
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
  t: 'top',
  l: 'left',
  r: 'right',
  b: 'bottom',
  c: 'color',
  ...others.reduce((all, current) => {
    all[current] = toDashed(current)
    return all
  }, {})
}

const attrHelpers = props => {
  let result = [];
  let bps = getValue('breakpoints', props);

  for (const prop in props) {
    if (!mappings[prop]) {
      continue;
    }

    let css = typeof props[prop] === 'function' ? props[prop](props) : props[prop];
    result.push(toCss(mappings[prop], css, bps));
  }

  return result.join('\n');
};

const rawHelpers = [
  props => props.css && (typeof props.css === 'function' ? props.css(props) : props.css),
  props => props.hover && (typeof props.hover === 'function' ? toHover(props.hover(props)) : toHover(props.hover)),
];

const bps = getValue('breakpoints');
const keys = Object.keys(bps);
const mobileHelpers = keys.map((bp, index) => {
  return props => {
    let from = getValue(`breakpoints.${bp}`, props);
    let to = getValue(`breakpoints.${keys[index + 1]}`, props, undefined);
    let css = bp => typeof props[bp] === 'function' ? props[bp](props) : props[bp];

    return [
      props[`${bp}Up`] && toMedia(from, css(`${bp}Up`)),
      props[bp] && toMedia(from, css(bp), to),
      props[`${bp}Down`] && toMedia(undefined, css(`${bp}Down`), from)
    ].filter(item => !!item).join('\n');
  };
});

const helpers = [
  ...rawHelpers,
  attrHelpers,
  ...mobileHelpers
]

export default styled.div(...helpers);
