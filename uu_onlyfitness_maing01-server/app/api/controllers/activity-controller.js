"use strict";
//const ActivityAbl = require("../../abl/activity-abl.js");
const ListAbl = require("../../abl/activity/list-abl");
const GetAbl = require("../../abl/activity/get-abl");
const CreateAbl = require("../../abl/activity/create-abl");

/*class ActivityController {
  create(ucEnv) {
    const awid = ucEnv.getUri().getAwid();
    const dtoIn = ucEnv.parameters;
    return ActivityAbl.create(awid, dtoIn);
  }
}*/
class ActivityController {

  static list(ucEnv) {
    return ListAbl.list(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
  }

  static get(ucEnv) {
    return GetAbl.get(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.getAuthorizationResult());
  }
  
  static create(ucEnv) {
    return CreateAbl.create(ucEnv.getUri().getAwid(), ucEnv.parameters, ucEnv.session, ucEnv.getAuthorizationResult());
  }
}
module.exports = ActivityController();
