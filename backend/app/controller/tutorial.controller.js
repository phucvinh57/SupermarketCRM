const db = require('../models/index');
const Tutorial = db.tutorials;
const Op = db.Sequelize.Op;

var create = function (req, res) {
    const data = {
        title: req.body.title,
        description: req.body.description,
        published: false
    };
    Tutorial.create(data)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ msg: err.message })
        })
}
var findAll = function (req, res) {
    const title = req.query.title;
    const condition = title ? { title: { [Op.like]: `%${title}%` } } : null;
    Tutorial.findAll({ where: condition })
        .then(data => {
            console.log(data)
            res.send(data)})
        .catch(err => {
            res.status(500).send({ msg: err.message })
        })
}
var findOne = function (req, res) {
    const id = req.params.id;
    Tutorial.findByPk(id)
        .then(data => res.send(data))
        .catch(err => {
            res.status(500).send({ msg: err.message })
        })
}
var remove = function (req, res) {
    const id = req.params.id;
    Tutorial.destroy({ where: { id: id } })
        .then(num => {
            if (num == 1) res.send({
                message: "Tutorial was deleted successfully!"
            })
            else res.send({
                message: `Cannot delete Tutorial with id=${id}. Maybe Tutorial was not found!`
            });
        }).catch(err => {
            res.status(500).send({
                message: "Could not delete Tutorial with id=" + id
            });
        })
}
var removeAll = function (req, res) {
    Tutorial.destroy({
        where: {},
        truncate: false
    }).then(nums => {
        res.send({ message: `${nums} Tutorials were deleted successfully!` });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Some error occurred while removing all tutorials."
        });
    });
}
var update = function (req, res) {
    const id = req.params.id;

    Tutorial.update(req.body, {
        where: { id: id }
    }).then(num => {
        if (num == 1) res.send({
            message: "Tutorial was updated successfully."
        });
        else res.send({
            message: `Cannot update Tutorial with id=${id}. Maybe Tutorial was not found or req.body is empty!`
        });
    }).catch(err => {
        res.status(500).send({
            message: err.message || "Error updating Tutorial with id=" + id
        });
    });
}
var findAllPublished = function (req, res) {
    Tutorial.findAll({ where: { published: true } })
        .then(data => {
            res.send(data);
        })
        .catch(err => {
            res.status(500).send({
                message:
                    err.message || "Some error occurred while retrieving tutorials."
            });
        });
}
module.exports = {
    create, findAll,
    findOne, remove,
    removeAll, update,
    findAllPublished,
}
