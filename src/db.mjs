import Database from 'better-sqlite3';
import path from 'path';

class DBLayer {
    constructor(pathTo) {
        this.db = new Database(path.join(pathTo,'data.db'));
    }
    createTable(tableName, columns) {
        console.log('Create Tables')
    }
}

export default DBLayer;