exports = module.exports = class ModelBuilder {
    static initialize() {
        const low = require('lowdb');
        const FileSync = require('lowdb/adapters/FileSync');
        const adapter = new FileSync('db.json');
        this.db = low(adapter);
        return this;
    }
    static getModel(m) {
        try {
            return require(`./${m}`)(this.db);
        } catch(e) {
            console.log(e);
        }
    }
}