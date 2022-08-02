import {Row} from './Row.mjs'
import FileHelper from "@/modules/FileHelper.mjs";
import {ipcMain} from "electron";

export default class TranslatorWrapper {
    constructor(translator) {
        this.translator = translator;
    }
    async translateFile(sourceLanguage, targetLanguage, filePath, formality, window){
        let fh = new FileHelper();
        let rows = fh.readFileSync(filePath);
        let contentRows = fh.prepareRowData(rows);
        let cancelled = false;

        ipcMain.on('CANCEL_TRANSLATION', (event, arg) => {
            console.log('Translation cancel Event')
            cancelled = true;
        });

        for (const row of contentRows) {
            if(cancelled){
                return {
                    status: false,
                    notification:{
                        title: "Translation aborted",
                        message: "",
                    },
                    rows: contentRows
                }
            }
            if (row instanceof Row && row.value_orig !== "") {
                try {
                    row.value_translated = await this.translateRow(row.value_orig, sourceLanguage === 'AUTO' ? null : sourceLanguage, targetLanguage, formality);
                } catch (error) {
                    console.log('Translator-Error', error)
                    return {
                        status: false,
                        notification:{
                            title: "Translation Error",
                            message: error
                        },
                        rows: contentRows
                    };
                }
            }
            window.webContents.send('TRANSLATOR-PROGRESS', {
                index: contentRows.indexOf(row),
                total: contentRows.length,
                message: `Translating ${row.value_orig}`,
                currentString: row.value_orig,
            });
        }
        return {status: true, notification: null, rows: contentRows};
    }

    async translateRow(value, sourceLang, targetLang, formality) {

        const result = await this.translator.translateText(value, sourceLang, targetLang, {formality});

        if(result.text.endsWith('"')) {
            result.text = result.text.slice(-1);
        }
        if(result.text.startsWith('"')) {
            result.text = result.text.slice(1);
        }

        // DoubleQuotes needs to be escaped by \
        if(!/(?<!\\)"/.test(result.text)){
            result.text =  result.text.replace(/(?<!\\)"/g, '\\"');
        }


        return `"${result.text}"`;
    }
}