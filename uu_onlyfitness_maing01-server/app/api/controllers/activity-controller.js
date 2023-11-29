"use strict";
const ActivityAbl = require("../../abl/activity-abl.js");

class ActivityController {

  delete(ucEnv) {
    return ActivityAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  create(ucEnv) {
    return ActivityAbl.create(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return ActivityAbl.get(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

}

module.exports = new ActivityController();
