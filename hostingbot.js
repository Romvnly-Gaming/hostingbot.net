const baseUrl = "https://node2.hostingbot.net:4083/index.php"

 const HostingBot = {
  VPS: class VPS {
    constructor(args) {
      //Make sure those fuckers give the constructor args.
      if (!args) throw new Error("No arguments provided. Please make sure you're following the tutorial.")
      if (!args.apiKey) throw new Error("No API Key provided. Make sure it is a String.")
      if (!args.apiPass) throw new Error("No API Pass provided. Make sure it is a String.")
      if (!args.svs) throw new Error("No Virtual Private Server ID provided. Make sure it's a Integer/Number")
      if (typeof args.apiKey !== "string") return new TypeError(`Got a ${typeof args.apiKey} instead of a String from the API Key.`)
      if (typeof args.apiPass !== "string") return new TypeError(`Got a ${typeof args.apiPass} instead of a String from the API Pass.`)
      if (typeof args.svs !== "number") return new TypeError(`Got a ${typeof args.svs} instead of a Number from the API Pass.`)
      this.name = 'HostingBot';
      this.apiKey = args.apiKey
    }
        /**
     * Get the RAW bandwidth object from the hostingbot.net API.
     * @returns {Object} Bandwidth (Object)
     */
    async getRawBandwidth() {
      // I'm gonna do it tomorrow, mom!
      console.log(this)
  }
  }
  
 } 





  module.exports = HostingBot;