const baseUrl = "https://node2.hostingbot.net:4083/index.php";
/**
 * The main hub for interacting with the HostingBot API, and the starting point for any interaction with the API.
 * @returns {Object} The login information the client has handled, not really optimized for output.
 */
class Client {
    constructor(args) {
            //Make sure those fuckers give the constructor args.
            if (!args) throw new Error("No arguments provided. Please make sure you're following the tutorial.");
            if (!args.apiKey) throw new Error("No API Key provided. Make sure it is a String.");
             if (!args.apiPass) throw new Error("No API Pass provided. Make sure it is a String.");
             if (typeof args.apiKey !== "string") throw new TypeError(`Got a ${typeof args.apiKey} instead of a String from the API Key.`);
             if (typeof args.apiPass !== "string") throw new TypeError(`Got a ${typeof args.apiPass} instead of a String from the API Pass.`);
             if (args.cache && typeof args.cache !== "boolean") throw new TypeError(`Got a ${typeof args.cache} instead of a Boolean Value from the API Cache Setting.`);
             if (args.svs && typeof args.svs !== "number") throw new TypeError(`Got a ${typeof args.svs} instead of a Number from the API Virtual Private Server ID.`);
            this.baseUrl = baseUrl
            this.args = args;
    }
  };


  module.exports = Client;