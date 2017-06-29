const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const logger = require('./logger.js');
const morgan = require('morgan');
const compression = require('compression');
const helmet = require('helmet');

module.exports = app => {
    app.set('port', 3000);
    app.set('json spaces', 4);
    app.use(morgan('common', {
        stream: {
            write: message => logger.info(message)
        }
    }));
    app.use(helmet());
    // configurar cors de acordo a origin
    app.use(cors());
    app.use(compression());

    app.use(bodyParser.urlencoded({ extended: false }))
    app.use(bodyParser.json());
    app.use(app.libs.auth.initialize());

    app.use((req, res, next) => {
        delete req.body.id;
        next();
    });

    app.use(express.static('public'));
};