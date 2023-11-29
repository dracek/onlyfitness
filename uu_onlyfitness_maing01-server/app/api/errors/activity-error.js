"use strict";
const ActivityMainUseCaseError = require("./activity-main-use-case-error");

const Create = {
  UC_CODE: `${ActivityMainUseCaseError.ERROR_PREFIX}activity/create/`,

  InvalidDtoIn: class extends ActivityMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
}

module.exports = {
  Create,
};