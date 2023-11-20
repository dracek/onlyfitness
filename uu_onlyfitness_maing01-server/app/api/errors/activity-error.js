"use strict";

const OnlyfitnessMainUseCaseError = require("./onlyfitness-main-use-case-error.js");
const ACTIVITY_ERROR_PREFIX = `${OnlyfitnessMainUseCaseError.ERROR_PREFIX}activity/`;

const Get = {
  UC_CODE: `${ACTIVITY_ERROR_PREFIX}get/`,
  
};

const Create = {
  UC_CODE: `${ACTIVITY_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  
  InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ActivityDaoCreateFailed: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}settingsDaoCreateFailed`;
      this.message = "Create failed.";
    }
  },
  
};

module.exports = {
  Create,
  Get
};
