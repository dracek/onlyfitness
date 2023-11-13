"use strict";
const UserSettingAbl = require("../../abl/user-setting-abl.js");

class UserSettingController {

  create(ucEnv) {
    return UserSettingAbl.create(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  get(ucEnv) {
    return UserSettingAbl.get(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  update(ucEnv) {
    return UserSettingAbl.update(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  delete(ucEnv) {
    return UserSettingAbl.delete(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

  test(ucEnv) {
    return UserSettingAbl.test(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

}

module.exports = new UserSettingController();
