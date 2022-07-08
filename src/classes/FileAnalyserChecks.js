import {KeyChecker, ValueChecker} from './Checks.mjs'

class Checker{
    /**
     * @param {string} row
     * @returns {({checks: {allUpper, validChars}, string}|{checks: *[], string}|{message: string, status: boolean})[]}
     */
    static checkRow(row) {
        let k,v,keyChecks,valueChecks
        let info = { status : true, message: ''}
        if(!row.includes('=')){
            k = v = row
            info.status = false
            info.message = 'Malformed row content'
        }else{
            [k, v] = Helper.splitRow(row);

            keyChecks = {
                string: k, // SCHLUESSEL
                checks: {
                    allUpper: KeyChecker.allUppercase(k),
                    validChars: KeyChecker.validCharacters(k)
                }
            };
            valueChecks = {
                string: v, // "Ich bin der Text = oder?"
                checks: {
                    encapsulated: ValueChecker.encapsulated(v),
                    lastCharIsNotEscaped: ValueChecker.lastCharIsNotEscaped(v),
                    doubleQuotesEscaped: ValueChecker.doubleQuotesEscaped(v),
                    balancedHtmlTags: ValueChecker.balancedHtmlTags(v)
                }
            }
        }
        return [keyChecks, valueChecks, info]
    }
}

class Helper{
    /**
     * splits the row into key & value
     * @param row String: 'FOO="bar"'
     * @returns array [key, value]
     * Source: https://stackoverflow.com/a/64350461/4708062
     */
    static splitRow(row){
        // SCHLUESSEL="Ich bin der Value = oder?"
        const [key, ...rest] = row.split('=')
        // key = "SCHLUESSEL"
        // rest = ["Ich bin der Value ", " oder?" ]
        const value = rest.join('=')
        // value => "Ich bin der Value = oder?"
        return [key, value] // good, luck_buddy
    }
}

export { Checker }