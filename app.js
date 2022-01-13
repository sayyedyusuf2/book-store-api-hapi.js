const Hapi = require("@hapi/hapi");
const Vision = require("@hapi/vision");
const Inert = require("@hapi/inert");
const mongoose = require("mongoose");
const indexRoute = require("./routes/indexRoute");
const path = require("path");
const hapiSwagger = require("hapi-swagger");
const pack = require("./package.json");
const dotenv = require("dotenv");
dotenv.config();

const port = process.env.PORT || 3000;
const User = require("./model/userModel");

mongoose
  .connect(process.env.DB_URL)
  .then(() => console.log("DB connection successful"))
  .catch((err) => console.log(err));

async function init() {
  const server = Hapi.server({
    port: port,
    // routes: {
    //   files: {
    //     relativeTo: path.join(__dirname, "public"),
    //   },
    // },
  });

  await server.register([
    Inert,
    Vision,
    require("hapi-auth-jwt2"),
    {
      plugin: hapiSwagger,
      options: {
        info: {
          title: "Test API Documentation",
          version: pack.version,
        },
      },
    },
  ]);

  server.auth.strategy("jwt", "jwt", {
    key: process.env.JWT_SECRET,
    validate: async function (decoded, request, h) {
      try {
        const user = await User.findById(decoded);
        if (!user) {
          return { isValid: false };
        }
        return { isValid: true, credentials: { user } };
      } catch (err) {
        console.log(err);
        return;
      }
    },
    // payloadKey: "token",
    // attemptToExtractTokenInPayload: true,
  });

  server.auth.default("jwt");

  // server.route({
  //   method: "GET",
  //   path: "/{param*}",
  //   handler: {
  //     directory: {
  //       path: ".",
  //       redirectToSlash: true,
  //     },
  //   },
  //   options: {
  //     auth: false,
  //   },
  // });

  server.route(indexRoute);

  await server.start();

  console.log(`Server is running  at ${server.info.uri} .`);
}

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
