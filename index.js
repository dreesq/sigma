import Base from './src/Base';
import Grid from './src/Grid';
import Sigma from './src/Sigma';
import store from './store';

const setBreakpoints = breakpoints => {
    store.set('breakpoints', breakpoints);
};

export {
    Base,
    Sigma,
    Grid,
    setBreakpoints
}