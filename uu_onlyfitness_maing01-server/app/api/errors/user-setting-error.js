"use strict";

const OnlyfitnessMainUseCaseError = require("./onlyfitness-main-use-case-error.js");
const USER_SETTING_ERROR_PREFIX = `${OnlyfitnessMainUseCaseError.ERROR_PREFIX}userSetting/`;

const Test = {
  UC_CODE: `${USER_SETTING_ERROR_PREFIX}test/`,
  
};

module.exports = {
  Test
};
