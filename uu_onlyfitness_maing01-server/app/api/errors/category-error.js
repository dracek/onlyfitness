"use strict";

const OnlyfitnessMainUseCaseError = require("./onlyfitness-main-use-case-error");
const Create = {
    UC_CODE: `${OnlyfitnessMainUseCaseError.ERROR_PREFIX}category/create`,

    invalidDtoIn: class extends OnlyfitnessMainUseCaseError {
        constructor() {
            super(...arguments);
            this.code = `${Create.UC_CODE}/invalidDtoIn`;
            this.messeage = `DtoIn is not valid.`
        }
    }
}

module.exports = {
    Create
}