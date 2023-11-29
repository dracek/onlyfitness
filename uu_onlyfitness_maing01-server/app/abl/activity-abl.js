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
    Delete: {
      UnsupportedKeys: {
        code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
      },
    }

};

class ActivityAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("activity");
  }

  async delete(awid,session, dtoIn) {
    const validationResult = this.validator.validate("activityIdDtoInType", dtoIn);

    let uuAppErrorMap = {};
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    // todo - nejdriv get
    await this.dao.remove(awid, dtoIn.id); // nevaliduje se, jestli vubec entita existuje

    let dtoOut = {
        awid,
        id: dtoIn.id,
        uuAppErrorMap: uuAppErrorMap
    };

    return dtoOut;
    
  }

  async create(awid, session, dtoIn) {
    console.log(">>>---");
    console.log(dtoIn)
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
      console.log(session.getIdentity())
      dtoIn.awid = awid;
      dtoIn.ownerId = session.getIdentity().getUuIdentity();
      dtoIn.activityDate = new Date(dtoIn.activityDate);
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
  
  async get(awid, session, dtoIn) {
    
    const validationResult = this.validator.validate("activityIdDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let dtoOut = await this.dao.get(awid, dtoIn.id);

    if (!dtoOut) {
      throw new Errors.Get.ActivityNotPresent({ uuAppErrorMap });
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
    
  }

}

module.exports = new ActivityAbl();
