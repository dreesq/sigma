let copy = obj => {
  let cloneObj = () => {
    let clone = {};

    for (let key in obj) {
      if (obj.hasOwnProperty(key)) {
        clone[key] = copy(obj[key]);
      }
    }

    return clone;
  };
  let cloneArr = () => {
    return obj.map(item => copy(item));
  };

  let type = Object.prototype.toString.call(obj).slice(8, -1).toLowerCase();
  if (type === 'object') {
    return cloneObj();
  }
  if (type === 'array') {
    return cloneArr();
  }
  return obj;
};

let makeFunction = (instance, key) => {
  if (typeof instance[key] === 'function') {
    return instance[key].bind(instance);
  }

  return () => {};
};

let compare = (a, b) => {
  if (a === b) {
    return true;
  }

  if (typeof a === 'object') {
    for (let key in a) {
      if (a[key] !== b[key]) {
        return false;
      }
    }
  }

  return false;
};

const store = {};
const listeners = [];

export const appStore = {
  set(key, value) {
    let oldValue = copy(store[key]);
    store[key] = value;

    for (const listener of listeners) {
      if (listener[0].indexOf(key) > -1) {
        if (listener[2] && compare(oldValue, value)) {
          continue;
        }

        listener[1](key, oldValue, value);
      }
    }
  },
  get(key, defaultValue) {
    if (store.hasOwnProperty(key)) {
      return copy(store[key]);
    }

    return defaultValue;
  },
  listen(keys, callback, ifChanged) {
    let key = listeners.push([keys, callback, ifChanged]);
    return () => {
      listeners.splice(key, 1);
    }
  },
  bind(instance, keys, ifChanged = false) {
    let removeListener;
    let componentDidMount = makeFunction(instance, 'componentDidMount');
    let componentWillUnmount = makeFunction(instance, 'componentWillUnmount');

    instance.componentDidMount = function() {
      removeListener = appStore.listen(keys, () => this.forceUpdate(), ifChanged);
      componentDidMount();
    };

    instance.componentWillUnmount = function() {
      removeListener && removeListener();
      componentWillUnmount();
    };
  },
  getStore() {
    return store;
  }
};
