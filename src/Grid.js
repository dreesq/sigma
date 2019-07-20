import Sigma from './Sigma';
import React from 'react';
import store from '../store';

const bps = store.get('breakpoints');

const toAllBreakpoints = (css) => {
    let result = '';

    for (const bp in bps) {
        const size = bps[bp];
        const compiled = css(size);

        if (!compiled) {
            continue;
        }

        result += `
            @media(min-width: ${size}px) {
                ${compiled};
            }
        `;
    }

    return result;
};

const Container = ({
   children,
   fluid,
   ...others
}) => React.createElement(Sigma, {
    css: `
        width: 100%;
        padding-left: 15px;
        padding-right: 15px;
       
        ${!fluid && toAllBreakpoints(size => size && `
            width: ${size}px
        `)}
    `,
    ...(fluid ? {} : {m: '0 auto'}),
    ...others
}, children);

const Row = ({
   children,
   ...others
}) => React.createElement(Sigma, {
    ...others,
    css: `
        display: flex;
        flex-wrap: wrap;
        margin-right: -15px;
        margin-left: -15px;
    `
}, children);

const Col = ({
   children,
   ...others
}) => React.createElement(Sigma, {
    ...others,
    css: `
        padding-left: 15px;
        padding-right: 15px;
        min-height: 1px;
    `
}, children);

export default {
    Container,
    Row,
    Col
}