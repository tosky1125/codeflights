const {
  users,
} = require('../../models');

module.exports = {
  post: (req, res) => {
    const {
      email,
      username,
      password,
    } = req.body;

    users.findOrCreate({
      where: {
        email,
      },
      defaults: {
        password,
        username,
      },
    }).then(async ([, exist]) => {
      if (!exist) {
        return res.status(409).send(JSON.stringify({
          status: false,
        }));
      }
      return res.status(200).send(JSON.stringify({
        status: true,
      }));
    });
  },
};
