const {
  OAuth2Client,
} = require('google-auth-library');
const {
  users,
} = require('../../models');

module.exports = {
  post: (req, res) => {
    const client = new OAuth2Client('956886343865-f8080heu2d93mukf82e027btrg0mgcl8.apps.googleusercontent.com');
    async function verify() {
      const ticket = await client.verifyIdToken({
        idToken: req.body.tokenId,
        audience: '956886343865-f8080heu2d93mukf82e027btrg0mgcl8.apps.googleusercontent.com',
      });
      const payload = ticket.getPayload();
      const {
        email,
        name,
      } = payload;
      const { session } = req;

      users.findOrCreate({
        where: {
          email,
        },
        defaults: {
          password: 'google',
          username: name,
        },
      }).then(async ([user]) => {
        session.userid = user.id;
        const data = {
          username: user.username,
          email: user.email,
        };
        res.status(201).send(data);
      });
    }
    verify().catch();
  },
};
