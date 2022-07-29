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
    insertTranslationStat(filename, rows, source_language, target_language) {
        const time = Math.floor(Date.now()/1000);
        let countOfRows = rows.reduce((count, row) => {
            if( typeof row === 'object') count++;
            return count;
        }, 0);
        log.info("Inserting translation stat for " + filename + " with " + countOfRows + " rows");

        const stat_translation_query = "INSERT INTO stat_translation('timestamp', 'filename', 'rows', 'source_language', 'target_language') VALUES(?,?,?,?,?);"
        try{
            this.db.prepare(stat_translation_query).run(time, filename, countOfRows, source_language, target_language);
        }catch (e) {
            log.error("Could not insert translation statistics: " + e );
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
    getFileCheckStats(){
        const stat_check_query = "SELECT * FROM stat_check;"
        try{
            return this.db.prepare(stat_check_query).all();
        }catch (e) {
            log.error("Could not get from database: " + e );
        }
    }
    getTranslationStats(){
        const stat_translation_query = "SELECT * FROM stat_translation;"
        try{
            return this.db.prepare(stat_translation_query).all();
        }catch (e) {
            log.error("Could not get from database: " + e );
        }
    }
    resetStats(){
        const stat_check_query = "DELETE FROM stat_check;"
        const stat_translation_query = "DELETE FROM stat_translation;"
        try{
            this.db.prepare(stat_check_query).run();
            this.db.prepare(stat_translation_query).run();
            return true;
        }catch (e) {
            log.error("Could not delete from database: " + e );
            return false;
        }
    }
}

export default DBLayer;