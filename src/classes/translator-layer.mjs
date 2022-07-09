import * as deepl from 'deepl-node';
import {Row} from './Row.mjs';

class TranslatorLayer {
    /**
     * Übersetzt den übergebenen Wert in die gewählte Zielsprache mit Hilfe der Deepl-API.
     * Für die Deepl-API braucht es einen gültigen Key.
     * Link zur Anmeldung bei Deepl: https://www.deepl.com/pro-api?cta=header-pro-api
     * @param value {String}
     * @param authKey {String}
     * @param sourceLang {String}
     * @param targetLang {String}
     * @returns {Promise<string>}
     * @author Claudia
     */
    static async translate(authKey, value, sourceLang, targetLang) {
        // const translator = new deepl.TranslatorLayer(authKey);
        // const result = await translator.translateText(value, sourceLang, targetLang);
        // // Added for SEM2-42
        // if(!result.text.endsWith('"')) {
        //     result.text += '"';
        // }
        // if(!result.text.startsWith('"')) {
        //     result.text = '"'+result.text;
        // }
        // return result.text
    }

    /**
     * Das gemappte Array wird durchlaufen und bei Row Objekten die einen String Inhalt haben in der Eigenschaft value_orig,
     * wird dieser String der Deepl API inkl. authKey, source Language und target Language mit Hilfe der translate Funktion zur Übersetzung übergeben.
     * Der übersetze String wird nun dem Row Objekt mit der Eigenschaft value_translated zugewiesen.
     * @param mapped {String, Object []}
     * @param authKey {String}
     * @param srcLng {String}
     * @param trgLng {String}
     * @param io {Object}
     * @returns {Promise<*>}
     * @author Claudia
     */
    static async translation(mapped, authKey, srcLng, trgLng, io) {
        // let rowNum = 1;
        //
        // for (const row of mapped) {
        //     if (row instanceof Row && row.value_orig !== "") {
        //         try {
        //             row.value_translated = await this.translate(authKey, row.value_orig, srcLng, trgLng)
        //         } catch (err) {
        //             console.log('TranslatorLayer-Error',err)
        //             io.emit('translator-error', err)
        //             break;
        //         }
        //     }
        //     io.emit('translator-status', {done: rowNum, rows: mapped.length})
        //     rowNum++
        // }
        // return mapped
    }

    /**
     * Überprüft mittels deepl-node den bisherigen Verbrauch des Authkeys.
     * @param authKey{String}
     * @returns {Promise<>}
     * @autor Claudia
     */
    static async getUsage(authKey) {
        // let info = {
        //     message: "",
        //     status: 0,
        //     usage: false,
        // }
        // try {
        //     const translator = new deepl.TranslatorLayer(authKey);
        //     info.usage = await translator.getUsage();
        //
        //     if (info.usage.anyLimitReached()) {
        //         info.message = 'Translation limit exceeded.'
        //         info.status = 0
        //     }
        //     if (info.usage.character) {
        //         info.message = `Characters: ${info.usage.character.count} of ${info.usage.character.limit}`
        //         info.status = 1
        //     }
        // } catch (err) {
        //     info.message = err.toString();
        //     info.status = 0
        // }
        //
        // return info

    }

    /**
     * Abfrage an Deepl-API welche Sprachen als Quell/ZielSprachen Supportet werden.
     * @param authKey{String}
     * @returns {Promise<{srcLng: *[], trgLng: *[]}>}
     * @author Claudia
     */
    static async getLanguages(authKey) {
        try{
            const translator = new deepl.Translator('foo')
        } catch (err) {
            console.log('TranslatorLayer-Error',err)
        }
        // try {
        //     const translator = new deepl.TranslatorLayer(authKey);
        //     let languages = {
        //         srcLng: [],
        //         trgLng: []
        //     }
        //     languages.srcLng = await translator.getSourceLanguages()
        //     languages.trgLng = await translator.getTargetLanguages()
        //     return languages
        // } catch (err) {
        //     console.log(err)
        // }
    }
}

export { TranslatorLayer };