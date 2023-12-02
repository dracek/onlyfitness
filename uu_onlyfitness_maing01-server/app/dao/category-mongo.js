
"use strict";
const { UuObjectDao } = require("uu_appg01_server").ObjectStore;

class CategoryMongo extends UuObjectDao {

    async create(category) {
        return super.insertOne(category);
    }

}

module.exports = CategoryMongo;