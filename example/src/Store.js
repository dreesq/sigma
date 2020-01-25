import React, { Component } from 'react';
import { store as s } from '@dreesq/sigma';

const Child = ({ value, key }) => {
  const deleteItem = () => {
    let x = s.get('state');
    x.items.splice(key, 1);
    s.set('state', x);
  };

  return (
    <p>
      {value}
      <button onClick={deleteItem}>Delete</button>
    </p>
  );
};

export default class Store extends Component {
 constructor(props) {
   super(props);

   s.set('state', {
     heading: 'Click to push item',
     items: [1, 2, 3, 4]
   });

   s.bind(this, ['state'], true);
 }

  pushItem = () => {
   let x = s.get('state');
   x.items.push(x.items.length + 1);
   s.set('state', x);
  };

  render() {
    const state = s.get('state');

    return (
      <div>
        <h1 onClick={this.pushItem}>{state.heading}</h1>
        {state.items.map((f, key) => <Child value={f} key={key} />)}
      </div>
    )
  }
}
