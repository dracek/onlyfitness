"use strict";

const OnlyfitnessMainUseCaseError = require("./onlyfitness-main-use-case-error.js");
const CHALLENGE_ERROR_PREFIX = `${OnlyfitnessMainUseCaseError.ERROR_PREFIX}challenge/`;

const Get = {
  UC_CODE: `${CHALLENGE_ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ChallengeNotPresent: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}challengeNotPresent`;
      this.message = "Challenge not present.";
    }
  },
  
};

const Create = {
  UC_CODE: `${CHALLENGE_ERROR_PREFIX}create/`,

  InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ChallengeDaoCreateFailed: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}challengeDaoCreateFailed`;
      this.message = "Challenge create failed.";
    }
  },
  
};

const Update = {
  UC_CODE: `${CHALLENGE_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ChallengeNotPresent: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}challengeNotPresent`;
      this.message = "Challenge not present.";
    }
  },

  ChallengeDaoUpdateFailed: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}challengeDaoUpdateFailed`;
      this.message = "Challenge DAO update failed.";
    }
  },
  
};

const Delete = {
  UC_CODE: `${CHALLENGE_ERROR_PREFIX}delete/`,
  
  InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ChallengeNotPresent: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}challengeNotPresent`;
      this.message = "Challenge not present.";
    }
  },

  NotOwner: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}notOwner`;
      this.message = "Not owner of this challenge";
    }
  },
  
};

const List = {
  UC_CODE: `${CHALLENGE_ERROR_PREFIX}list/`,
  

  InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ChallengeDaoListFailed: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}challengeDaoListFailed`;
      this.message = "Challenge list faile.";
    }
  },
  
};

module.exports = {
  List,
  Delete,
  Update,
  Create,
  Get
};
