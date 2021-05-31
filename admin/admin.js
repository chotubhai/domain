require("dotenv").config();
const AdminBro = require("admin-bro");
const AdminBroExpress = require("@admin-bro/express");
const AdminBroMongoose = require("@admin-bro/mongoose");
// const { BaseProvider } = require("@admin-bro/upload");
const bcrypt = require("bcrypt");
const mongoose = require("mongoose");

const clientModel = require("../Model/clientModel");
const domainModel = require("../Model/domainModel");

//need to connect mongoose before registering adapter
mongoose
  .connect(
    process.env.MONGOURI,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("mongoose connected"))
  .catch((e) => console.log(e));

AdminBro.registerAdapter(AdminBroMongoose);

const adminBro = new AdminBro({
  resources: [
    {
      resource: clientModel,
    },
    {
      resource: domainModel,
    },
  ],
  dashboard: {
    component: AdminBro.bundle("./my-dashboard-component"),
  },
  rootPath: "/admin"
});

module.exports = adminRouter = AdminBroExpress.buildAuthenticatedRouter(
  adminBro,
  {
    authenticate: async (email, password) => {
      if (process.env.adminEmail === email) {
        const same = bcrypt.compare(
          password,
          process.env.adminPassword || global.secrets.adminPassword
        );
        if (same) return { email, role: "admin" };
        else return false;
      } else return false;
    },
    cookieName: "adminbro",
    cookiePassword: "1620a45d17d76849eade1f8a3f51e10e83464742",
  }
);

