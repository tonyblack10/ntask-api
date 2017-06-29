const Sequelize = require('sequelize');
const fs = require('fs');
const path = require('path');

let db = null;

module.exports = app => {
    const config = app.libs.config;
    
    if(!db) {
        let sequelize = new Sequelize(
            config.database,
            config.username,
            config.password,
            config.params
        );
        db = {
            sequelize,
            Sequelize,
            models: {}
        };

        let dir = path.join(__dirname, '../models');

        fs.readdirSync(dir).forEach(file => {
            let modelDir = path.join(dir, file);
            let model = sequelize.import(modelDir);
            db.models[model.name] = model;
        });

        Object.keys(db.models).forEach(key => db.models[key].associate(db.models));
    }

    return db;
};