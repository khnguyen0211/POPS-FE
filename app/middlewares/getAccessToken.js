function getAccessToken(req, res, next) {
  req.accessToken = req.headers.authorization;
  next();
}

module.exports = getAccessToken;
