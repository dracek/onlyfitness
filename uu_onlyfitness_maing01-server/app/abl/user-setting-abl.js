"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/user-setting-error.js");

const WARNINGS = {

};

class UserSettingAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("userSetting");
  }

  async test(awid, session, dtoIn) {
    console.log(" ");
    console.log(" --- command start --- ");
    console.log("hi, i am in some testing ABL! yaay!");
    console.log(" ");
    
    console.log("awid:", awid );

    const identity = session.getIdentity()
    console.log("logged user:", identity.getUuIdentity());
    console.log("  name:", identity.getName());


    // testing DB:
    // try getting user setting
    let result = await this.dao.get(awid, identity.getUuIdentity());

    console.log(result);

    if(!result){ 

      console.log("creating some setiings item for logged user, because it doesn't exist yet");
      
      const newItem = {
        awid: awid,
        id : identity.getUuIdentity(),
        name: identity.getName(),
        some_other_value: "i'm just testing...."
      }

      result = await this.dao.create(newItem);
    }

    console.log(" --- command end --- ");
    console.log(" ");
    console.log(" ");
    return result;
  }

}

module.exports = new UserSettingAbl();
