module.exports = app => {
    return {
        findAll: (params, callback) => {
            return callback([
                {title: 'Fazer compras'},
                {title: 'Consertar o PC'},
                {title: 'Estudar'}
            ]);
        },
    };
};