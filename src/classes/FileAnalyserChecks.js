class KeyChecker{
    /* See https://regex101.com/ for testing regular expressions */

    /**
     * Checks if the given String is all uppercase
     * @param string
     * Related article: https://bobbyhadz.com/blog/javascript-check-if-string-is-all-uppercase
     * @author: Rensch Marco
     */
    static allUppercase(string){
        let s = string.toUpperCase() === string && string !== string.toLowerCase()
        let m = s ? '':"lowercase character(s) found"
        let h = s ? '':`Key Values needs to be all in uppercase<br>Good: KEY_FOR_STRING<br>Bad: Key_for_String`
        return CheckResult.result(s,m, h)
    }

    /**
     * checks if the given string contains only characters (A-Z) and _
     * (https://regex101.com/r/ZksJD1/1)
     * @param string
     * Note: valide mit Small letters damit dieser Fehler hier nicht matched!
     */
    static validCharacters(string){
        let s = /^[_a-zA-Z]+$/.test(string)
        let m = s ? '':"Invalid characters found"
        let h = s ? '':'Key values may only contain the characters A-Z or _'
        return CheckResult.result(s,m,h)
    }
}

class ValueChecker{
    static encapsulated(string){
        string = string.trim()
        let s = string[string.length-1] === '"' && string[0] === '"'
        let m = s ? '' : 'Value is not correctly encapsulated by "'
        let h = s ? '' : `Value Strings needs to be encapsulated by double quotes ":<br>Good: "My value String"<br>Bad: My value String<br>Bad: 'My value String'`
        return CheckResult.result(s,m,h)
    }
    static lastCharIsNotEscaped(string){
        string = string.trim()
        let s = !/\\"$/.test(string)
        let m = s ? '' : 'Last sign in String is a \\'
        let h = s ? '' : 'no backslash may be used in the last position of the string'
        return CheckResult.result(s,m,h)
    }

    static doubleQuotesEscaped(string) {
        string = string.trim()
        let s = !/(?<!\\)"/.test(string.slice(1, -1));
        let m = s ? '':'Unescaped Double Quotes found'
        let h = s ? '':`Double quotes in value strings must be escaped by backslashs<br>Good:<div class=\\"foo\\">foo</div><br>Bad: <div class="foo">foo</div>`
        return CheckResult.result(s,m,h)
    }
}

class RowHelper{
    static overallStatus(rowChecks){
        rowChecks.overallStatus = false
        return rowChecks
    }
}

class Checker{
    static checkRow(row) {
        let k,v,key,value
        let translationError = { status : true, message: ''}
        if(!row.includes('=')){
            k = v = row
            translationError.status = false
            translationError.message = 'Malformed row content'
        }else{
            [k, v] = Helper.splitRow(row);

            key = {
                string: k, // SCHLUESSEL
                checks: {
                    allUpper: KeyChecker.allUppercase(k),
                    validChars: KeyChecker.validCharacters(k)
                }
            };
            value = {
                string: v, // "Ich bin der Text = oder?"
                checks:[
                    ValueChecker.encapsulated(v),
                    ValueChecker.lastCharIsNotEscaped(v),
                    ValueChecker.doubleQuotesEscaped(v)
                ]

            }
        }

        return [key, value, translationError]
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

class CheckResult{
    static result(status, message, help){

        return {status, message, help}
    }
}

module.exports = { Checker, RowHelper }