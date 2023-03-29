const express = require("express");
const Router = express.Router();
const Controller = require("../controller/crud");
const multipleUpload = require("../multer/multer");

Router.route("/createEvent").post(multipleUpload, Controller.create);

Router.route("/event")
  .get(Controller.get)
  .put(multipleUpload, Controller.update)
  .delete(Controller.delete);

Router.route("/getAllEvent").get(Controller.getAll);

module.exports = Router;
