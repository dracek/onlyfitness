"use strict";

const OnlyfitnessMainUseCaseError = require("./onlyfitness-main-use-case-error.js");
const USER_SETTING_ERROR_PREFIX = `${OnlyfitnessMainUseCaseError.ERROR_PREFIX}userSetting/`;

const Create = {
  UC_CODE: `${USER_SETTING_ERROR_PREFIX}create/`,
  
  InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  SettingsDaoCreateFailed: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}settingsDaoCreateFailed`;
      this.message = "Create failed.";
    }
  },
};

const Get = {
  UC_CODE: `${USER_SETTING_ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Update = {
  UC_CODE: `${USER_SETTING_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Delete = {
  UC_CODE: `${USER_SETTING_ERROR_PREFIX}delete/`,

  InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
};

const Test = {
  UC_CODE: `${USER_SETTING_ERROR_PREFIX}test/`,
  
};

module.exports = {
  Delete,
  Create,
  Update,
  Get,
  Test
};
