require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const fs = require("fs");
const adminRouter = require("./admin/admin");
const domainRouter = require("./Routes/domain");
const domainMiddleware = require("./middlewares/domainMiddleware");
const { checkToken } = require("./utils/utils");
const clientModel = require("./Model/clientModel");

//load swagger only in dev and staging
if (!process.env.NODE_ENV && process.env.NODE_ENV !== "production") {
  const swaggerUi = require("swagger-ui-express");
  const swaggerDocs = require("./utils/swaggerDocs");
  app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));
}

mongoose
  .connect(process.env.MONGOURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongoose connected"))
  .catch((e) => console.log(e));

const PORT = process.env.PORT || 7000;

var allowCrossDomain = function (req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,PUT,POST,DELETE");
  res.header("Access-Control-Allow-Headers", "*");

  next();
};
//this need to be before express.json()
app.use("/admin", adminRouter);

app.use(express.json());
app.use(allowCrossDomain);
app.use(express.static("views"));
app.use(express.urlencoded({ extended: true }));

app.post("/login", (req, res) => {
  const { email, password } = req.body;
  clientModel.findOne({ email }).then((response) => {
    if (!response) return res.status(403).send();

    bcrypt.compare(password, response.password).then((matched) => {
      if (!matched) return res.status(401).send();
      jwt.sign(
        { email, _id: response._id },
        process.env.ACCESS_TOKEN,
        (err, token) => {
          if (err) res.status(500).send(err);
          jwt.sign(
            { email, _id: response._id },
            process.env.REFRESH_TOKEN,
            (err, REFRESH_TOKEN) => {
              res.send({
                name: response.name,
                ACCESS_TOKEN: token,
                REFRESH_TOKEN,
              });
            }
          );
        }
      );
    });
  });
});

app.use("/domain", checkToken, domainMiddleware, domainRouter);

app.get("/", (req, res) => {
  res.send("at path /");
});

app.listen(PORT, () => {
  console.log("server started");
});
