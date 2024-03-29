class FilenameChecker{
    static checkFilenameFormat(filename){
        if(!filename){
            return new CheckResult(false,'filename', 'Filename not checked','The filename could not be checked!')
        }
        let s = /([a-z]{2}-[A-Z]{2}.)?(plg|mod|com)_[a-z_]+(.sys)?.ini/.test(filename);
        let m = s? "": "filename looks invalid";
        let h = s? "": 'The correct format for language files as noted in the documentations has this format: <code>lng-LNG</code>.<code>plg|mod|com</code>_<code>extension_name</code>_<code>(.sys)</code>.ini<br>examples:<br><code>en-GB.mod_extension.ini</code><br><code>fr-FR.plg_extension_name.sys.ini</code><br>or without language tag: <code>mod_extension_name.ini</code>';
        return new CheckResult(s,'filename', m,h)
    }
}

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
        let h = s ? '':`Key Values needs to be all in uppercase<br>Good: <code>KEY_FOR_STRING</code><br>Bad: <code>Key_for_String</code>`
        return new CheckResult(s,'key',m,h, true)
    }

    /**
     * checks if the given string contains only characters (a-zA-Z0-9) and _
     * (https://regex101.com/r/ZksJD1/1)
     * @param string
     * Note: valide mit Small letters damit dieser Fehler hier nicht matched!
     */
    static validCharacters(string){
        let s = /^[_A-Z\d]+$/i.test(string)
        let m = s ? '':"Invalid characters found"
        let h = s ? '':'Key values may only contain the characters A-Z 0-9 or _ (underscore), Spaces are not allowed'
        return new CheckResult(s,'key',m,h, true)
    }

    static checkDuplicates(keyToCheck, row, keysArr){
        // Cleanup
        keyToCheck = keyToCheck.trim();
        let checkResult = new CheckResult(true,'key','','')
        for(let item of keysArr){
            if(item.key === keyToCheck){
                checkResult = new CheckResult(false,'key','Key already exists','Key already exists in row '+item.row);
                break;
            }
        }
        keysArr.push({row: row, key: keyToCheck})
        return [checkResult, keysArr]
    }
}

class ValueChecker{
    static encapsulated(string){
        string = string.trim()
        let s = string[string.length-1] === '"' && string[0] === '"'
        let m = s ? '' : 'Value is not correctly encapsulated by "'
        let h = s ? '' : `Double quotes in value strings must be escaped by backslashes.<br>Good: <code>&lt;div class=&#92;&quot;foo&#92;&quot;&gt;foo&lt;/div&gt;</code><br>Bad:<code>&lt;div class=&quot;foo&quot;&gt;foo&lt;/div&gt;</code>`
        return new CheckResult(s,'value',m,h)
    }
    static lastCharIsNotEscaped(string){
        string = string.trim()
        let s = !/\\"$/.test(string)
        let m = s ? '' : 'Last character in String is a backslash (\\)'
        let h = s ? '' : 'no backslash may be used in the last position of the string'
        return new CheckResult(s,'value',m,h)
    }

    static doubleQuotesEscaped(string) {
        string = string.trim()
        let s = !/(?<!\\)"/.test(string.slice(1, -1));
        let m = s ? '':'Unescaped Double Quotes found'
        let h = s ? '':`Double quotes in value strings must be escaped by backslashes<br>Good: <code>&lt;div class=\\"foo\\"&gt;foo&lt;/div&gt;</code><br>Bad: <code>&lt;div class="foo"&gt;foo&lt;/div&gt;</code>`
        return new CheckResult(s,'value',m,h)
    }

    static balancedHtmlTags(string){
        const searchFor = ['div','p','span','h1','h2','h3','h4','h5','h6','article','post','code','pre','blockquote','ul','ol','li','table','tr','td','th','thead','tbody','tfoot','a','b','i','u','strong','em','link','meta','title','header','footer','section','nav','aside','main','figure','figcaption','video','audio','iframe','canvas','svg','map','area','time','meter','progress','form','fieldset','legend','label','button','select','option','textarea','datalist','output','details','summary']
        let s = true
        let tagHintsText = ''
        let tagHints = []
        for(const tag of searchFor) {
            if(string.includes(`<${tag}`) || string.includes(`</${tag}>`)) {

                let regExpStartTag = new RegExp(`<${tag}(\\s|>)`, 'g')
                let regExpEndTag = new RegExp(`<\/${tag}\\s?>`, 'g')
                let matchesStart = string.match(regExpStartTag)||[]
                let matchesEnd = string.match(regExpEndTag)||[]

                if(matchesStart.length !== matchesEnd.length) {
                    s = false;
                    tagHints.push(`<b>${tag} Tag</b> is not balanced.`)
                }
            }
        }
        for (const tagHint of tagHints) {
            tagHintsText += `<li>${tagHint}</li>`;
        }
        let m = s ? '':'Unbalanced HTML Tag(s) found'
        let h = s ? '':`HTML Tags in value strings should be balanced.<ul class="uk-list uk-list-collapse uk-list-striped uk-margin-remove-bottom uk-margin-small-top">${tagHintsText}</ul>`
        return new CheckResult(s,'value',m,h)
    }
}

/**
 * Wrapper Klasse als zukünftiger Layer für Modularisierung
 */
class CheckResult {
    constructor(status, type, message, help, html = false, ) {
        this.renderHtml = html
        this.status = status;
        this.type = type;
        this.message = message;
        this.help = help;
    }
}

export {KeyChecker, ValueChecker, FilenameChecker, CheckResult}
