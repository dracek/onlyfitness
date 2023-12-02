
const {Validator} = require("uu_appg01_server").Validation;
const {ValidationHelper} = require("uu_appg01_server").AppServer;
const {DaoFactory, ObjectStoreError} = require("uu_appg01_server").ObjectStore;

const Errors = require("../api/errors/category-error.js");

const WARNINGS = {
    createUnsupportedKeys: {
        code: `${Errors.Create.UC_CODE}unsupportedKeys`
    }
};

class CategoryAbl {
    constructor() {
        this.validator = Validator.load();
        this.dao = DaoFactory.getDao("category");
    }

async create(awid, dtoIn) {
    let validationResult = this.validator.validate("categoryCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, WARNINGS.createUnsupportedKeys.code, Errors.Create.invalidDtoIn)


dtoIn.awid = awid;    
let dtoOut;
try {
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