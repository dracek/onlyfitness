"use strict";

const OnlyfitnessMainUseCaseError = require("./onlyfitness-main-use-case-error");
const CATEGORY_ERROR_PREFIX = `${OnlyfitnessMainUseCaseError.ERROR_PREFIX}category/`;

const Create = {
    UC_CODE: `${CATEGORY_ERROR_PREFIX}create/`,
    
    InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${Create.UC_CODE}invalidDtoIn`;
        this.message = "DtoIn is not valid.";
      }
    },
  
    CategoryDaoCreateFailed: class extends OnlyfitnessMainUseCaseError {
      constructor() {
        super(...arguments);
        this.code = `${Create.UC_CODE}categoryDaoCreateFailed`;
        this.message = "Category create failed.";
      }
    },
    
  };

const Get = {
  UC_CODE: `${CATEGORY_ERROR_PREFIX}get/`,

  InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  CategoryNotPresent: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}categoryNotPresent`;
      this.message = "Category not present.";
    }
  },
  
};

const Update = {
  UC_CODE: `${CATEGORY_ERROR_PREFIX}update/`,

  InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Get.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  CategoryNotPresent: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}categoryNotPresent`;
      this.message = "Category not present.";
    }
  },

  CategoryDaoUpdateFailed: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Create.UC_CODE}categoryDaoUpdateFailed`;
      this.message = "Category DAO update failed.";
    }
  },
  
};

const Delete = {
  UC_CODE: `${CATEGORY_ERROR_PREFIX}delete/`,

  InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },

  CategoryNotPresent: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${Delete.UC_CODE}categoryNotPresent`;
      this.message = "Category not present.";
    }
  },
  
};

const List = {
  UC_CODE: `${CATEGORY_ERROR_PREFIX}list/`,

  InvalidDtoIn: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}invalidDtoIn`;
      this.message = "DtoIn is not valid.";
    }
  },
  
  CategoryDaoListFailed: class extends OnlyfitnessMainUseCaseError {
    constructor() {
      super(...arguments);
      this.code = `${List.UC_CODE}categoryDaoListFailed`;
      this.message = "Category DAO list failed";
    }
  },

};

module.exports = {
  List,
  Delete,
  Update,
  Get,
  Create
}