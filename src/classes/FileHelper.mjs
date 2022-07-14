import fs from 'fs';

export default class FileHelper {
    readFileSync(filePath) {
        try {
            const fileContent = fs.readFileSync(filePath, "utf-8");
            return fileContent.trim().split(/\r?\n/);
        } catch (err) {
            console.log(err);
        }
    }

    getFileDetails(fileContentArray){
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
        return {
            rows: fileContentArray.length,
            translations: rowsCount,
            comments: commentsCount,
        }
    }
}