const {setup, start} = require('@dreesq/serpent');
const express = require('express');

const app = express();

const config = {
    autoload: {
        middlewares: false,
    },
    actions: {
        handler: '/o',
        list: '/o'
    }
};

setup(app, config).then(start);