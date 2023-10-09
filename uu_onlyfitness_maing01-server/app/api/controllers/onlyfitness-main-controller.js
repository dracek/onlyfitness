"use strict";
const OnlyfitnessMainAbl = require("../../abl/onlyfitness-main-abl.js");

class OnlyfitnessMainController {
  init(ucEnv) {
    return OnlyfitnessMainAbl.init(ucEnv.getUri(), ucEnv.getDtoIn(), ucEnv.getSession());
  }

  load(ucEnv) {
    return OnlyfitnessMainAbl.load(ucEnv.getUri(), ucEnv.getSession());
  }

  loadBasicData(ucEnv) {
    return OnlyfitnessMainAbl.loadBasicData(ucEnv.getUri(), ucEnv.getSession());
  }
}

module.exports = new OnlyfitnessMainController();
