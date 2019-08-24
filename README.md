<p align="center"> 
    <img src="https://user-images.githubusercontent.com/7228512/61580398-714ecd80-ab1a-11e9-8bcb-4677a128aa79.png"/>
</p>

<p align="center">
    <a href="https://dreesq.github.io/sigma/" target="_blank">Demo</a>  
</p>

Sigma is an UI library made using `styled-components`. You can install it using `npm install @dreesq/sigma` command.

The library is built using the core component `Sigma`. Here's a basic example on how to use the component:

```js
import {render} from 'react-dom';
import {Sigma} from '@dreesq/sigma';

const root = (
    <Sigma
        width={100}
        height={100}
        background={'red'}
        borderRadius={'50%'}
        cursor={'pointer'}
        hover={`
            background: yellow;
        `}  
    />
);

render(root, document.querySelector('#root'));
```

In addition to the core component, the library provides additional useful components such as ```Grid``` and ```Base```.

