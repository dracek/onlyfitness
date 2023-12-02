
const {Validator} = require("uu_appg01_server").Validation;
const {ValidationHelper} = require("uu_appg01_server").AppServer;

const Errors = require("../api/errors/category-error.js");

const WARNINGS = {
    createUnsupportedKeys: {
        code: `${Errors.Create.UC_CODE}unsupportedKeys`
    }
};

class CategoryAbl {
    constructor() {
        this.validator = Validator.load();
    }

create(awid, dtoIn) {
    let validationResult = this.validator.validate("categoryCreateDtoInType", dtoIn);
    let uuAppErrorMap = ValidationHelper.processValidationResult(dtoIn, validationResult, WARNINGS.createUnsupportedKeys.code, Errors.Create.invalidDtoIn)

    let dtoOut = { ...dtoIn, awid, uuAppErrorMap }
    return dtoOut;
}

}

module.exports = new CategoryAbl();