const defaultStore = {
    breakpoints: {
        xs: 0,
        sm: 576,
        md: 768,
        lg: 992,
        xl: 1200
    }
};

export default {
    store: defaultStore,
    set(key, value) {
        this.store[key] = value;
    },
    get(key) {
        return this.store[key];
    }
};