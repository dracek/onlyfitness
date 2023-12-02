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
      this.code = `${Create.UC_CODE}activityDaoCreateFailed`;
      this.message = "Create failed.";
    }
  },
  
};

const Delete = {
  UC_CODE: `${ACTIVITY_ERROR_PREFIX}delete/`,

  InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ActivityNotPresent: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}activityNotPresent`;
      this.message = "Cannot find activity";
    }
  },

  NotOwner: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}notOwner`;
      this.message = "Not owner of this activity";
    }
  },
  
};

const Update = {
  UC_CODE: `${ACTIVITY_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ActivityNotPresent: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}activityNotPresent`;
      this.message = "Cannot find activity";
    }
  },

  ActivityDaoUpdateFailed: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}activityDaoUpdateFailed`;
      this.message = "Cannot find activity";
    }
  },

  NotOwner: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Update.UC_CODE}notOwner`;
      this.message = "Not owner of this activity";
    }
  },
  
};

const List = {
  UC_CODE: `${ACTIVITY_ERROR_PREFIX}list/`,

  InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  ActivityDaoListFailed: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}activityDaoListFailed`;
      this.message = "DtoIn is not valid.";
    }
  },
  
};

module.exports = {
  List,
  Update,
  Delete,
  Create,
  Get
};
