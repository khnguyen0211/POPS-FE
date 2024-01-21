function checkAccessToken() {
  return function (req, res, next) {
    console.log("checkAccessToken: "+accessToken)
    !accessToken ? res.redirect("/") : next();
  };
}

module.exports = checkAccessToken;

