"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory,ObjectStoreError } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/activity-error.js");

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

};

class ActivityAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("activity");
  }

  async create(session, dtoIn) {
    const validationResult = this.validator.validate("activityCreateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Create.UnsupportedKeys.code,
      Errors.Create.InvalidDtoIn
    );

    let dtoOut;
    try {
      //dtoIn.awid = awid;
      dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Create.ActivityDaoCreateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
    
  }
  
  async get(awid,session, dtoIn) {
    
    const validationResult = this.validator.validate("activityIdDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let dtoOut = await this.dao.get(awid, dtoIn.id);

    if (!dtoOut) { // pokud activity jeste neexistuje, vraci se prazdny objekt jen s awid a errorMap (ale nehodi chybu)
      dtoOut = {
        awid,
        id: dtoIn.id
      };
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
    
  }

}

module.exports = new ActivityAbl();
