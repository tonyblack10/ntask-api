const logger = require('./logger.js');

module.exports = {
    database: 'ntask',
    username: '',
    password: '',
    params: {
        dialect: 'sqlite',
        storage: 'ntask.sqlite',
        define: {
            underscored: true
        },
        logging: sql => logger.info(`[${new Date()}] ${sql}`)
    },
    jwtSecret: 'Nta$k-AP1',
    jwtSession: {session: false}
};