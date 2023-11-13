"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/user-setting-error.js");

const WARNINGS = {

  Create: {
    UnsupportedKeys: {
      code: `${Errors.Create.UC_CODE}unsupportedKeys`,
    },
  },

  Get: {
    UnsupportedKeys: {
      code: `${Errors.Get.UC_CODE}unsupportedKeys`,
    },
  },

  Delete: {
    UnsupportedKeys: {
      code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
    },
  }
};

class UserSettingAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("userSetting");
  }

  async create(awid, session, dtoIn) {
    
  }

  async get(awid, session, dtoIn) {

    const validationResult = this.validator.validate("settingsIdDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let dtoOut = await this.dao.get(awid, dtoIn.id);

    if (!dtoOut) { // pokud uzivatel jeste neexistuje, vraci se prazdny objekt jen s awid a errorMap (ale nehodi chybu)
      dtoOut = {
        awid,
        id: dtoIn.id
      };
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;

  }

  async update(awid, session, dtoIn) {
    //Meno, pohlavie, výška, váha, dátum narodenia (?)

    
      /*
    let dtoOut;
    try {
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.GameDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }
*/
    
  }

  async delete(awid, session, dtoIn) {

    const validationResult = this.validator.validate("settingsIdDtoInType", dtoIn);

    let uuAppErrorMap = {};
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    await this.dao.remove(awid, dtoIn.id);

    dtoOut = {
        awid,
        id: dtoIn.id,
        uuAppErrorMap: uuAppErrorMap
    };

    return dtoOut;
    
  }

/***************************************/

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
