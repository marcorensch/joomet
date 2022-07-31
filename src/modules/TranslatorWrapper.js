import {Row} from './Row.mjs'
import FileHelper from "@/modules/FileHelper.mjs";
import {ipcMain} from "electron";

export default class TranslatorWrapper {
    constructor(translator) {
        this.translator = translator;
    }
    async translateFile(sourceLanguage, targetLanguage, filePath, window){
        let fh = new FileHelper();
        let rows = fh.readFileSync(filePath);
        let contentRows = fh.prepareRowData(rows);

        // sourceLanguage = sourceLanguage === 'EN' ? "EN-GB": sourceLanguage;
        // targetLanguage = targetLanguage === 'EN' ? "EN-GB": targetLanguage;
        let cancelled = false;

        console.log(sourceLanguage, targetLanguage);
        ipcMain.on('CANCEL_TRANSLATION', (event, arg) => {
            console.log('Translation cancel Event')
            cancelled = true;
        });

        for (const row of contentRows) {
            if(cancelled){
                return {
                    success: false,
                    notification:{
                        title: "Translation aborted",
                        message: "",
                    },
                    rows: contentRows
                }
            }
            if (row instanceof Row && row.value_orig !== "") {
                try {
                    row.value_translated = await this.translateRow(row.value_orig, sourceLanguage === 'AUTO' ? null : sourceLanguage, targetLanguage);
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

    async translateRow(value, sourceLang, targetLang) {
        const result = await this.translator.translateText(value, sourceLang, targetLang);
        if(!result.text.endsWith('"')) {
            result.text += '"';
        }
        if(!result.text.startsWith('"')) {
            result.text = '"'+result.text;
        }
        return result.text
    }
}