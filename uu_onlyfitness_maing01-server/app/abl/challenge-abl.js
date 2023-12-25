"use strict";
const Path = require("path");
const { Validator } = require("uu_appg01_server").Validation;
const { DaoFactory } = require("uu_appg01_server").ObjectStore;
const { ValidationHelper } = require("uu_appg01_server").AppServer;
const Errors = require("../api/errors/challenge-error.js");

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

  Update: {
    UnsupportedKeys: {
      code: `${Errors.Update.UC_CODE}unsupportedKeys`,
    },
  },

  Delete: {
    UnsupportedKeys: {
      code: `${Errors.Delete.UC_CODE}unsupportedKeys`,
    },
  },

  List: {
    UnsupportedKeys: {
      code: `${Errors.List.UC_CODE}unsupportedKeys`,
    },
  },

};

class ChallengeAbl {

  constructor() {
    this.validator = Validator.load();
    this.dao = DaoFactory.getDao("challenge");
  }

  async list(awid, session, dtoIn) {

    const validationResult = this.validator.validate("challengeListDtoInType", dtoIn);

    let uuAppErrorMap = {};
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.List.UnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    let filter = {
      ownerId : session.getIdentity().getUuIdentity()
    };

    let dtoOut;
    try {
      dtoOut = await this.dao.listByFilter(awid, filter, dtoIn.pageInfo, { "categoryId" : 1 });

    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.List.ChallengeDaoListFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
   
  }

  async delete(awid, session, dtoIn) {
    
    const validationResult = this.validator.validate("challengeIdDtoInType", dtoIn);

    let uuAppErrorMap = {};
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.Delete.UnsupportedKeys.code,
      Errors.Delete.InvalidDtoIn
    );

    let entity = await this.dao.get(awid, dtoIn.id);
    if (!entity){
      throw new Errors.Delete.ChallengeNotPresent({ uuAppErrorMap });  
    }

    if (entity.ownerId != session.getIdentity().getUuIdentity()){
      throw new Errors.Delete.NotOwner({ uuAppErrorMap });  
    }

    await this.dao.remove(awid, dtoIn.id);

    let dtoOut = {
        awid,
        id: dtoIn.id,
        uuAppErrorMap: uuAppErrorMap
    };

    return dtoOut;
    
  }


  async update(awid, session, dtoIn) {

    const validationResult = this.validator.validate("challengeUpdateDtoInType", dtoIn);

    //TODO validace existence category v category DAO    

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    let entity = await this.dao.get(awid, dtoIn.id);
    if (!entity){
      throw new Errors.Update.ChallengeNotPresent({ uuAppErrorMap });  
    }

    let dtoOut;
    try {
      dtoIn.awid = awid;
      dtoOut = await this.dao.update(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.ChallengeDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
    
  }

  async create(awid, session, dtoIn) { // todo duplicates check

    let validationResult = this.validator.validate("challengeCreateDtoInType", dtoIn);
    
    let uuAppErrorMap = ValidationHelper.processValidationResult(
        dtoIn,
        validationResult,
        {},
        WARNINGS.Create.UnsupportedKeys.code,
        Errors.Create.InvalidDtoIn
        );

    let dtoOut;
    try {
        dtoIn.awid = awid;
        dtoIn.ownerId = session.getIdentity().getUuIdentity(); 
        dtoOut = await this.dao.create(dtoIn);
    } catch (e) {
        if (e instanceof ObjectStoreError) {
            throw new Errors.Create.ChallengeDaoCreateFailed({ uuAppErrorMap }, e)
        }
        throw e;
    }
    
    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
  }


  async get(awid, session, dtoIn) {

    const validationResult = this.validator.validate("challengeIdDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let dtoOut = await this.dao.get(awid, dtoIn.id);

    if (!dtoOut) {
      throw new Errors.Get.ChallengeNotPresent({ uuAppErrorMap });
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
    
  }

}

module.exports = new ChallengeAbl();
