import Database from 'better-sqlite3';
import path from 'path';
import log from "electron-log";

class DBLayer {
    constructor(pathTo) {
        this.db = new Database(path.join(pathTo,'statistics.veltd'));
    }
    createTables() {
        const stat_check_query = "CREATE TABLE IF NOT EXISTS stat_check('id' INTEGER PRIMARY KEY, 'timestamp' INTEGER, 'filename' TEXT, 'rows_checked' INTEGER, 'problems_found' INTEGER);"
        const stat_translation_query = "CREATE TABLE IF NOT EXISTS stat_translation('id' INTEGER PRIMARY KEY, 'timestamp' INTEGER, 'filename' TEXT, 'rows' INTEGER, 'source_language' TEXT, 'target_language' TEXT);"
        try{
            this.db.prepare(stat_check_query).run();
            this.db.prepare(stat_translation_query).run();
        }catch (e) {
            log.error("Could not create database table: " + e );
        }
    }
    insertFileCheckStats(stats, filename){
        const time = Math.floor(Date.now()/1000);
        const stat_check_query = "INSERT INTO stat_check(timestamp, filename, rows_checked, problems_found) VALUES(?,?,?,?);"
        try{
            this.db.prepare(stat_check_query).run(time, filename, stats.rows, stats.problems);
        }catch (e) {
            log.error("Could not insert into database: " + e );
            throw e;
        }
    }
}

export default DBLayer;