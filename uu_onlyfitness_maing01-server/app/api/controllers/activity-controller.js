"use strict";
const ActivityAbl = require("../../abl/activity-abl.js");

class ActivityController {

  create(ucEnv) {
    return ActivityAbl.create(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return ActivityAbl.get(ucEnv.getUri().getAwid(), ucEnv.getDtoIn());
  }

}

module.exports = new ActivityController();
