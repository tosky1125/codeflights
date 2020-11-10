module.exports = {
  post: (req, res) => {
    const session = req.session.userid;
    if (session) {
      req.session.destroy((err) => {
        if (err) throw err;
        else res.redirect('/');
      });
    } else {
      res.redirect('/');
    }
  },
};
