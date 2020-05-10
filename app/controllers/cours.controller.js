const db = require("../models");
const Cours = db.cours;
const Op = db.Sequelize.Op;

// Create and Save a new Course
exports.create = (req, res) => {
    // Validate request
    if(!req.body.title) {
        res.status(400).send({
            message: "Le champ ne peut être vide! "
        });
        return;
    }

    // Create a Course
    const cours = {
        title: req.body.title,
        description: req.body.description,
        published: req.body.published ? req.body.published : false
    };

    // Save Course in the database
    Cours.create(cours)
    .then(data => {
        res.send(data);
    })
    .catch(err => {
        res.status(500).send({
        message:
            err.message || "Une erreur s'est produite lors de la création du cours."
        });
    });
  
};

// Retrieve all Courses from the database.
exports.findAll = (req, res) => {
    const title = req.query.title;
    var condition = title ? { title: { [Op.like]: `%${title}%` } } : null;

    Cours.findAll({ where: condition })
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message:
            err.message || "Une erreur s'est produite lors de la récupération des cours."
        });
    });
  
};

// Find a single Course with an id
exports.findOne = (req, res) => {
    const id = req.params.id;

    Cours.findByPk(id)
        .then(data => {
        res.send(data);
        })
        .catch(err => {
        res.status(500).send({
            message: "Erreur lors de la récupération du cours avec l'id=" + id
        });
    });
    
};

// Update a Course by the id in the request
exports.update = (req, res) => {
    const id = req.params.id;

    Cours.update(req.body, {
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Le cours a été mis à jour avec succès."
            });
        } else {
            res.send({
            message: `Impossible de mettre à jour le cours avec l'id=${id}. Peut-être que le cours n'a pas été trouvé ou que le corps de la demande est vide!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Impossible de mettre à jour le cours avec l'id=" + id
        });
    });
  
};

// Delete a Course with the specified id in the request
exports.delete = (req, res) => {
    const id = req.params.id;

    Cours.destroy({
        where: { id: id }
    })
        .then(num => {
        if (num == 1) {
            res.send({
            message: "Le cours a été supprimé avec succès!"
            });
        } else {
            res.send({
            message: `Impossible de supprimer le cours avec l'id=${id}. Le cours est peut-être introuvable!`
            });
        }
        })
        .catch(err => {
        res.status(500).send({
            message: "Impossible de supprimer le cours avec l'id=" + id
        });
    });
  
};

// Delete all Courses from the database.
exports.deleteAll = (req, res) => {
    Cours.destroy({
        where: {},
        truncate: false
      })
        .then(nums => {
          res.send({ message: `${nums} Cours ont été supprimés avec succès!` });
        })
        .catch(err => {
          res.status(500).send({
            message:
              err.message || "Une erreur s'est produite lors de la suppression des cours."
          });
        });
  
};

// Find all published Courses
exports.findAllPublished = (req, res) => {
    Cours.findAll({ where: { published: true } })
    .then(data => {
      res.send(data);
    })
    .catch(err => {
      res.status(500).send({
        message:
          err.message || "Une erreur s'est produite lors de la récupération des cours."
      });
    });
  
};
