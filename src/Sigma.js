import styled from 'styled-components';
import store from '../store';

const bps = store.get('breakpoints');

const toString = value => {
    if (Array.isArray(value)) {
        return value.map(value => `${value}px`).join(' ');
    }

    if (typeof value === 'number') {
        return `${value}px`;
    }

    return value;
};

const toMedia = (size, css) => `
    @media screen and (min-width: ${size}px) {
        ${css}
    }
`;

const toHover = css => `
    &:hover {
        ${css}
    }
`;

const toCss = (key, value) => {
    if (typeof value === 'undefined') {
        return;
    }

    let css = ``;

    if (typeof value === 'object' && !Array.isArray(value)) {
        for (const bp in value) {
            if (!bps.hasOwnProperty(bp)) {
                continue;
            }

            css += toMedia(bps[bp], `${key}: ${toString(value[bp])};`);
        }

        if (value.any) {
            css += `${key}: ${toString(value.any)};`;
        }
    } else {
        css = `${key}: ${toString(value)};`;
    }

    return css;
};

const toDashed = str => str.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`);

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
    'resize ',
    'textIdent',
    'transformOrigin',
    'verticalAlign',
    'whiteSpace',
    'wordBreak',
    'borderRadius',
    'margin',
    'padding',
    'visibility',
    'userSelect'
];

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
    ...others.reduce((all, current) => {
        all[current] = toDashed(current);
        return all;
    }, {})
};

const attrHelpers = Object.keys(mappings).map(key => props => toCss(mappings[key], props[key]));

const rawHelpers = [
    props => props.css && (typeof props.css === 'function' ? props.css(props) : props.css),
    props => props.hover && (typeof props.hover === 'function' ? toHover(props.hover(props)) : toHover(props.hover)),
    ...Object.keys(bps).map(
        bp => props => props[bp] &&
            (typeof props[bp] === 'function' ? toMedia(bps[bp], props[bp](props))
                : toMedia(bps[bp], props[bp]))
    )
];

const helpers = [
    ...attrHelpers,
    ...rawHelpers
];

export default styled.div(...helpers);