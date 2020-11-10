const {
  articles,
} = require('../../models');

module.exports = {
  write: (req, res) => {
    const {
      title,
      content,
    } = req.body;
    const author = req.session.userid;

    articles.create({
      author,
      title,
      contents: content,
    }).then(() => {
      res.status(201).send(JSON.stringify({
        status: true,
      }));
    });
  },
};
