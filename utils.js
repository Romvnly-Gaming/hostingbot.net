/**
 * Creates a new Utils Class.
 */
class Utils  {
    constructor(args) {
        this.name = "HostingBot"
    }
        /**
     * Is it a JSON?
     * @returns {Boolean} 
     */
    IsJsonString(args) {
        if (!args) return false;
        try{JSON.parse(args)}catch(args){return!1}return!0;
    }
}

module.exports = Utils;