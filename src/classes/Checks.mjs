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
        return Result.create(s,m, h)
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
        let h = s ? '':'Key values may only contain the characters A-Z 0-9 or _'
        return Result.create(s,m,h)
    }
}

class ValueChecker{
    static encapsulated(string){
        string = string.trim()
        let s = string[string.length-1] === '"' && string[0] === '"'
        let m = s ? '' : 'Value is not correctly encapsulated by "'
        let h = s ? '' : `Value Strings needs to be encapsulated by double quotes ":<br>Good: "My value String"<br>Bad: My value String<br>Bad: 'My value String'`
        return Result.create(s,m,h)
    }
    static lastCharIsNotEscaped(string){
        string = string.trim()
        let s = !/\\"$/.test(string)
        let m = s ? '' : 'Last sign in String is a \\'
        let h = s ? '' : 'no backslash may be used in the last position of the string'
        return Result.create(s,m,h)
    }

    static doubleQuotesEscaped(string) {
        string = string.trim()
        let s = !/(?<!\\)"/.test(string.slice(1, -1));
        let m = s ? '':'Unescaped Double Quotes found'
        let h = s ? '':`Double quotes in value strings must be escaped by backslashs<br>Good:<div class=\\"foo\\">foo</div><br>Bad: <div class="foo">foo</div>`
        return Result.create(s,m,h)
    }

    static balancedHtmlTags(string){
        const searchFor = ['div','p','span','h1','h2','h3','h4','h5','h6','article','post','code','pre','blockquote','ul','ol','li','table','tr','td','th','thead','tbody','tfoot','img','a','b','i','u','strong','em','link','meta','title','header','footer','section','nav','aside','main','figure','figcaption','video','audio','iframe','canvas','svg','map','area','time','meter','progress','form','fieldset','legend','label','button','select','option','textarea','datalist','output','details','summary']
        let s = true
        let tagHintText = ''
        for(const tag of searchFor) {
            if(!s) break;
            let count = 0;
            if(string.includes(`<${tag}>`)) {
                let regExp = new RegExp(`(<([\/?${tag}>]+)>)`, 'g')
                count = string.match(regExp || []).length;
                if(count%2 > 0) {
                    s = false
                    tagHintText = `${tag} is not balanced`
                }
            }
        }
        let m = s ? '':'Unbalanced HTML Tags found'
        let h = s ? '':`HTML Tags in value strings must be balanced.<br>${tagHintText}`
        return Result.create(s,m,h)
    }
}

class Result{
    static create(status, message, help){
        return {status, message, help}
    }
}

export {KeyChecker, ValueChecker}