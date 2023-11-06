"use strict";
const UserSettingAbl = require("../../abl/user-setting-abl.js");

class UserSettingController {

  test(ucEnv) {
    return UserSettingAbl.test(ucEnv.getUri().getAwid(), ucEnv.getSession(), ucEnv.getDtoIn());
  }

}

module.exports = new UserSettingController();
