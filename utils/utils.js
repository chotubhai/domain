const jwt = require("jsonwebtoken");

function checkToken(req, res, next) {
    var { access_token, refresh_token } = req.headers;
    if (!access_token || !refresh_token) return res.status(401).send("unauthorized");
  
    //check access token first
    jwt.verify(access_token, process.env.ACCESS_TOKEN, (err, user) => {
      if (err) console.log(err);
  
      //then if access token expired check refresh token instead.
      if (!user) {
        jwt.verify(refresh_token, process.env.REFRESH_TOKEN, (err, user) => {
          if (err) return res.status(500).send("internal server error");
          if (!user) return res.status(401).send("unauthorized");
  
          //if refresh token verified issue new access token
          access_token = jwt.sign(user, process.env.ACCESS_TOKEN, { expiresIn: 3600 });
          res.set("access_token", access_token);
          next();
        });
      } else {
        next();
      }
    });
  }

  module.exports = {checkToken}