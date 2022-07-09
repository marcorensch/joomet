import {KeyChecker, ValueChecker, CheckResult} from './Checks.mjs'
import {Row, RowCheck} from './Row.mjs'

class Checker {
    /**
     * @description Einstiegspunkt zur Überprüfung einer Zeile,
     * erstellt ein Row Objekt pro Zeile und ruft weitere Checks auf.
     *
     * @param rows  Array von Strings
     * @return  Array von { Row, RowChecks }
     * @author Marco
     */
    static checkRows(rows) {
        // Checker Result only contains ROW items of rows with errors
        let checkerResults = []
        let rowNum = 1
        for (const rowString of rows) {
            let rowObj = new Row(rowNum, rowString)
            rowObj.checks = this.checkRow(rowObj)
            // Push if errors found
            let arrOfErrors = this.getFails(rowObj.checks, rowNum);
            if (arrOfErrors.length > 0) {
                checkerResults = checkerResults.concat(arrOfErrors)
            }
            rowNum++
        }
        return {count: rows.length, checkerResults}
    }

    /**
     * @description Einstiegspunkt zur überprüfung eines Row Objekts
     *
     * @param   row     Row Object
     * @author Marco, John
     */
    static checkRow(row) {
        let keyChecks, valueChecks, formatChecks;
        formatChecks = {
            string: row.string,
            checks: {
                lineFormatting: {status: true, message: '', hint: ''}
            }
        }
        if (!row.string.length || /^;/.test(row.string)) {
            // Empty or comment row
            return new RowCheck(null, null, null)
        }
        // Line with key and value e.g. not a comment or empty row:
        if (!row.string.includes('=')) {
            formatChecks = {
                string: row.string,
                checks: {
                    formatting: new CheckResult(false, 'line', 'Line formatting incorrect', 'Incorrectly formatted line, possibly missing a ";" character to mark the line as a comment.')
                }
            }
        } else {

            keyChecks = {
                string: row.key, // SCHLUESSEL
                checks: {
                    allUpper: KeyChecker.allUppercase(row.key),
                    validChars: KeyChecker.validCharacters(row.key)
                }
            };
            valueChecks = {
                string: row.value, // "Ich bin der Text = oder?"
                checks: {
                    encapsulated: ValueChecker.encapsulated(row.value),
                    lastCharIsNotEscaped: ValueChecker.lastCharIsNotEscaped(row.value),
                    doubleQuotesEscaped: ValueChecker.doubleQuotesEscaped(row.value),
                    balancedHtmlTags: ValueChecker.balancedHtmlTags(row.value)
                }
            }
        }
        return new RowCheck(formatChecks, keyChecks, valueChecks)
    }

    static getFails(rowChecks, rowNum) {
        let arrayOfErrors = []
        // Loop over Objects and build overal status
        for (const checkGroup of Object.values(rowChecks)) {
            if (checkGroup) {
                for (const check of Object.values(checkGroup.checks)) {
                    if (check && !check.status) {
                        arrayOfErrors.push({
                            rowNum: rowNum,
                            string: checkGroup.string,
                            check: check
                        })
                    }
                }
            }
        }
        return arrayOfErrors
    }
}

export {Checker}