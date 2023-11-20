"use strict";

const OnlyfitnessMainUseCaseError = require("./onlyfitness-main-use-case-error.js");
const ACTIVITY_ERROR_PREFIX = `${OnlyfitnessMainUseCaseError.ERROR_PREFIX}activity/`;

const Get = {
  UC_CODE: `${ACTIVITY_ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ActivityNotPresent: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}activityNotPresent`;
      this.message = "Cannot find activity";
    }
  },

};

const Create = {
  UC_CODE: `${ACTIVITY_ERROR_PREFIX}create/`,
  
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
