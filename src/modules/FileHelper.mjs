import fs from 'fs';
import {Row} from "./Row.mjs";

export default class FileHelper {
    readFileSync(filePath) {
        try {
            const fileContent = fs.readFileSync(filePath, "utf-8");
            return fileContent.trim().split(/\r?\n/);
        } catch (err) {
            log.error(err);
        }
    }

    readFileAsync(filePath) {
        fs.readFile(filePath, "utf-8", (err, data) => {
            if (err) {
                log.error(err);
            } else {
                return data;
            }
        });
    }

    prepareRowData(rows) {
        return rows.map((row, index) => {
            if (row.length === 0 || row.startsWith(";")) {
                return row
            } else if (row.includes("=")) {
                return new Row(index + 1, row)
            } else{
                return `;!!!!!!!!!!!!!!!!!!!!! Ignored row, content: ${row} !!!!!!!!!!!!!!!!!!!!!`
            }
        })
    }

    getFileDetails(fileContentArray){
        return new Promise((resolve)=>{
            let commentsCount = 0;
            let rowsCount = 0;
            for(let row of fileContentArray){
                if(row.trim().length > 0){
                    if(row.startsWith(';')){
                        commentsCount++;
                    }else{
                        rowsCount++;
                    }
                }
            }
            const details = {
                rows: fileContentArray.length,
                translations: rowsCount,
                comments: commentsCount,
            }
            resolve (details)
        })

    }

    writeToFile(path, data) {
        let newLine = process.platform === 'win32' ? '\r\n' : '\n';
        try {
            //flag: a = Open file for appending. The file is created if it does not exist
            const stream = fs.createWriteStream(path, {flags: 'w', encoding: 'utf-8'});
            stream.on('ready', () => {
                data.forEach(function (line) {
                    stream.write(line + newLine);
                });
                stream.end(()=>{
                    stream.on('finish', () => {
                        console.log(`========= ${path} written successfully! =========`)
                    })
                });
            })
        } catch (err) {
            console.error("Error while write to file", err)
        }
    }

    checkIfFileExists(path){
        if(fs.existsSync(path)){
            path = path.join(path, '_translated');
            return this.checkIfFileExists(path);
        }else{
            return path;
        }
    }

    /**
     * Das übersetze Array wird wieder mapped. Wenn leere Strings oder Strings mit ";"beginnen werden sie direkt ins neue Array mapped.
     * Die Row Objekte werden so mapped, dass die Eigenschaften key und value_translated mit einem "=" zusammengesetzt werden und asl String ins neue Array gemappt werden.
     * @param translatedData{String, Object []}
     * @returns {String []}
     * @autor Claudia
     */
    prepareDataForNewFile(translatedData) {
        return translatedData.map((value) => {
            if (value.length === 0 || value[0] === ";") {
                return value
            } else {
                return value.key.concat("=" + value.value_translated)
            }
        })
    }

    /**
     * Versucht anhand der Informationen einen neuen Dateinamen für Export zu offerieren.
     * @param fileName
     * @param srcLang
     * @param trgLang
     * @returns {*}
     */
    buildNewFileName(fileName, srcLang, trgLang) {
        srcLang = srcLang === null ? 'AUTO' : srcLang;  // Should not be necessary but just in case for future changes
        let srcLanguageKey = srcLang.toLowerCase() + '-' + srcLang.toUpperCase();
        let trgLanguageKey = trgLang.toLowerCase() + '-' + trgLang.toUpperCase();
        if(srcLang === 'EN'){
            srcLanguageKey = 'en-GB';
        }
        if(trgLang === 'EN'){
            trgLanguageKey = 'en-GB';
        }

        // the basic way:
        if(fileName.includes(`${srcLanguageKey}.`)){
            return fileName.replace(`${srcLanguageKey}.`, `${trgLanguageKey}.`);
        }

        // if srcLanguageKey is not given (AUTO) / null
        const test = /[a-z][a-z]-[A-Z][A-Z]./.test(fileName);
        if(test){
            const match = /[a-z][a-z]-[A-Z][A-Z]./.exec(fileName);
            if (match) {
                return fileName.replace(match[0], trgLanguageKey+'.');
            }
        }

        return trgLanguageKey+'.'+fileName;
    }
}