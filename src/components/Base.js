import {css, createGlobalStyle} from 'styled-components'

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
      height: 100%;
    }
    
    *,
    *::before,
    *::after {
      -webkit-box-sizing: inherit;
              box-sizing: inherit;
    }
    
    body {
      margin: 0;
      min-height: 100%;
      position: relative;
    }
    
    body, input, textarea, select {
      font-family: BlinkMacSystemFont, -apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol";
    }
    
    a {
      text-decoration: none;
      color: #0590ff;
      border-bottom: 1px solid #0590ff;
      padding-bottom: 2px;    
    }
    
    .loading {
        position: relative;

        &:before {
            content: '';
            background: rgba(230, 230, 230, 0.3);
            border-radius: 4px;
            width: 100%;
            height: 100%;
            z-index: 1;
            position: absolute;
            left: 0;
            top: 0;
        }
    
        &:after {
            content: '';
            position: absolute;
            top: 50%;
            left: 50%;
            width: 25px;
            height: 25px;
            border-radius: 50%;
            border-width: 3px;
            border-color: currentColor;
            border-top-color: #ffffff00;
            border-style: solid;
            margin-left: -12.5px;
            margin-top: -12.5px;
            z-index: 2;
            animation: loading 1s infinite linear;
        }
        
        &.large {
          &:after {
            width: 75px;
            height: 75px;
            margin-left: -37.5px;
            margin-top: -37.5px;
          }
        }
        
        @keyframes loading {
            from {
                transform: rotate(0deg)
            }
            
            to {
                transform: rotate(360deg)
            }
        }
    }
`

export default createGlobalStyle(base)
