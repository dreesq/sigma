import {css, createGlobalStyle} from 'styled-components';

/**
 * Reset css component
 * @type {Array|*}
 */

const base = css`
    [hidden] {
      display: none;
    }
    
    article, aside, details, figcaption, figure,
    footer, header, hgroup, main, menu, nav, section {
      display: block;
    }
    
    html {
      -webkit-box-sizing: border-box;
              box-sizing: border-box;
      -ms-overflow-style: scrollbar;
    }
    
    *,
    *::before,
    *::after {
      -webkit-box-sizing: inherit;
              box-sizing: inherit;
    }
    
    body {
      margin: 0;
      font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
`;

export default createGlobalStyle(base);