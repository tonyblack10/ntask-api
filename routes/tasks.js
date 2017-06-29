module.exports = app => {
    const Tasks = app.libs.db.models.Tasks;
    
    app.route('/tasks')
        .all(app.libs.auth.authenticate())
        .get((req, res) => {
            Tasks
                .findAll({where: {user_id: req.user.id} })
                .then(tasks => res.json({tasks: tasks}))
                .catch(error => res.status(412).json({msg: error.message}));
        })
        .post((req, res) => {
            req.body.user_id = req.user.id;
            Tasks
                .create(req.body)
                .then(result => res.json(result))
                .catch(error => res.status(412).json({msg: error.message}));
        });

    app.route('tasks/:id')
        .all(app.libs.auth.authenticate())
        .get((req, res) => {
            Tasks
                .findOne({where: {id: req.params.id, user_id: req.user.id} })
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
                .update(req.body, {where: {id: req.params.id, user_id: req.user.id} })
                .then(result => res.sendStatus(204))
                .catch(error => res.status(412).json({msg: error.message}));
        })
        .delete((req, res) => {
            Tasks
                .destroy(req.body, {where: {id: req.params.id, user_id: req.user.id} })
                .then(result => res.sendStatus(204))
                .catch(error => res.status(412).json({msg: error.message}));
        });

};