module.exports = app => {
    const Tasks = app.libs.db.models.Tasks;
    
    app.route('/tasks')
        .get((req, res) => {
            Tasks
                .findAll({})
                .then(tasks => res.json({tasks: tasks}))
                .catch(error => res.status(412).json({msg: error.message}));
        })
        .post((req, res) => {
            Tasks
                .create(req.body)
                .then(result => res.json(result))
                .catch(error => res.status(412).json({msg: error.message}));
        });

    app.route('tasks/:id')
        .get((req, res) => {
            Tasks
                .findOne({where: req.params})
                .then(result => {
                    if(!result) {
                        res.sendStatus(404);
                    } else {
                        res.json(result);
                    }
                })
                .catch(error => res.status(412).json({msg: error.message}));
        })
        .put((req, res) => {
            Tasks
                .update(req.body, {where: req.params})
                .then(result => res.sendStatus(204))
                .catch(error => res.status(412).json({msg: error.message}));
        })
        .delete((req, res) => {
            Tasks
                .destroy(req.body, {where: req.params})
                .then(result => res.sendStatus(204))
                .catch(error => res.status(412).json({msg: error.message}));
        });

};