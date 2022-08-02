class Row{
    constructor(rowNum, string) {
        this.rowNum = rowNum
        this.string = string
        this.checks = {}
        this.value_translated = ""
        this.buildKeyValue(string.trim())
    }

    buildKeyValue(string){
        if(!string.length || string === 'undefined' || string.startsWith(";") || !string.includes("=")){
            return [null,null, string]
        }else{
            const [key, ...rest] = string.split('=')
            let value = rest.join('=').trim()
            // Added for SEM2-42
            // Stripe out doublequotes on start / end of string because could lead to translation form errors
            this.value = value
            this.value_orig = value.replace(/^"(.*)"$/, '$1')
            this.key = key
        }
    }
}

class RowCheck {
    constructor(generalChecks, keyChecks, valueChecks) {
        this.generalChecks = generalChecks;
        this.valueChecks = valueChecks;
        this.keyChecks = keyChecks;
    }
}

export { Row, RowCheck }