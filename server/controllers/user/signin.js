const {
  users,
} = require('../../models');

module.exports = {
  post: (req, res) => {
    const {
      email,
      password,
    } = req.body;
    const {
      session,
    } = req;
    users.findOne({
      where: {
        email,
        password,
      },
    }).then((result) => {
      if (!result) {
        res.status(401).send(JSON.stringify({
          status: false,
        }));
      } else {
        session.userid = result.id;
        res.status(201).json(result);
      }
    });
  },
};
