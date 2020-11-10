const { articles } = require('../../models');

module.exports = {
  browse: (req, res) => {
    const { id } = req.params;
    articles.findOne({
      where: {
        id,
      },
    }).then((result) => res.status(200).send(result));
  },
};
