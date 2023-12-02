"use strict";

const CategoryAbl = require("../../abl/category-abl")

class CategoryController {

create(ucEnv) {
    let dtoIn = ucEnv.getDtoIn();
    let awid = ucEnv.getUri().getAwid();

 
     return CategoryAbl.create(awid, dtoIn)
}
}
module.exports = new CategoryController();