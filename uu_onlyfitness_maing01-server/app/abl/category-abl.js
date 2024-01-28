
const {Validator} = require("uu_appg01_server").Validation;
const {ValidationHelper} = require("uu_appg01_server").AppServer;
const {DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;

const Errors = require("../api/errors/category-error.js");

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

class CategoryAbl {

    constructor() {
        this.validator = Validator.load();
        this.dao = DaoFactory.getDao("category");
    }

  async list(awid, session, dtoIn) {

    const validationResult = this.validator.validate("categoryListDtoInType", dtoIn);

    let uuAppErrorMap = {};
    uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      uuAppErrorMap,
      WARNINGS.List.UnsupportedKeys.code,
      Errors.List.InvalidDtoIn
    );

    let dtoOut;
    try {
      dtoOut = await this.dao.listByFilter(awid, {}, dtoIn.pageInfo, {});

    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.List.CategoryDaoListFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;

  }

  async delete(awid, session, dtoIn) {

    const validationResult = this.validator.validate("categoryIdDtoInType", dtoIn);

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
      throw new Errors.Delete.CategoryNotPresent({ uuAppErrorMap });  
    }

    // todo existing activity for this category!!!!!!!!!!!!!!!!!

    await this.dao.remove(awid, dtoIn.id);

    let dtoOut = {
        awid,
        id: dtoIn.id,
        uuAppErrorMap: uuAppErrorMap
    };

    return dtoOut;
    
  }

  async update(awid, session, dtoIn) {

    const validationResult = this.validator.validate("categoryUpdateDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Update.UnsupportedKeys.code,
      Errors.Update.InvalidDtoIn
    );

    let entity = await this.dao.get(awid, dtoIn.id);
    if (!entity){
      throw new Errors.Update.CategoryNotPresent({ uuAppErrorMap });  
    }

    let dtoOut;
    try {
      dtoIn.awid = awid;
      dtoOut = await this.dao.update(dtoIn);
    } catch (e) {
      if (e instanceof ObjectStoreError) {
        throw new Errors.Update.CategoryDaoUpdateFailed({ uuAppErrorMap }, e);
      }
      throw e;
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
    
  }

  async get(awid, session, dtoIn) {

    const validationResult = this.validator.validate("categoryIdDtoInType", dtoIn);

    let uuAppErrorMap = ValidationHelper.processValidationResult(
      dtoIn,
      validationResult,
      {},
      WARNINGS.Get.UnsupportedKeys.code,
      Errors.Get.InvalidDtoIn
    );

    let dtoOut = await this.dao.get(awid, dtoIn.id);

    if (!dtoOut) {
      throw new Errors.Get.CategoryNotPresent({ uuAppErrorMap });
    }

    dtoOut.uuAppErrorMap = uuAppErrorMap;

    return dtoOut;
    
  }

  async create(awid, session, dtoIn) {

        let validationResult = this.validator.validate("categoryCreateDtoInType", dtoIn);
        
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
            dtoOut = await this.dao.create(dtoIn);
        } catch (e) {
            if (e instanceof ObjectStoreError) {
                throw new Errors.Create.CategoryDaoCreateFailed({ uuAppErrorMap }, e)
            }
            throw e;
        }
        
        dtoOut.uuAppErrorMap = uuAppErrorMap;

        return dtoOut;
    }

}

module.exports = new CategoryAbl();