module.exports = (sequelize, Sequelize) => {
    const Cours = sequelize.define("cours", {
      title: {
        type: Sequelize.STRING
      },
      description: {
        type: Sequelize.STRING
      },
      published: {
        type: Sequelize.BOOLEAN
      }
    });
  
    return Cours;
  };