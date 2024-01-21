function renderMiddleware(req, res, next) {
    res.redirect(302, '/');
  next();
}

module.exports = renderMiddleware;
