const baseUrl = "https://node2.hostingbot.net:4083/index.php" // Virtualizor's API, just hosted under Hostingbot's domain.

/**
 * The main hub for interacting with the HostingBot API, and the starting point for any interaction with the API.
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
            this.args = args;
    }
  }
  /**
 * Creates a new HostingBot VPS Thingy
 * @extends {Client}
 */
class VPS extends Client {
    constructor(args) {
      super(args);
      this.name = 'HostingBot';

      if (this.args.cache === true) { // Whether or not to do this function.
          fetch(`${baseUrl}?act=bandwidth&svs=${this.args.svs}&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`)
          .catch(() => null)
           .then(res => res.json())
             .then(json => {
              this.bandwidth = {
                bandwidth: { // We're gonna yoink the object HostingBot gives for Bandwidth and transform it into something that isn't for Canvas.
                  limit: json.bandwidth.limit_gb, 
                  used: json.bandwidth.used_gb,
                  bytesLimit: json.bandwidth.limit,
                  bytesUsed: json.bandwidth.used,
                },
                month: {
                  yr: json.month.yr,
                  month: json.month.month,
                  mth_txt: json.month.mth_txt.replace(/<[^>]*>?/gm, '\n'), //The months for Bandwidth.
                  days: json.month.days,
                }
              }
             });
        setInterval(function(){ 
          fetch(`${baseUrl}?act=bandwidth&svs=${this.args.svs}&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`)
          .catch(() => null)
           .then(res => res.json())
             .then(json => {
              this.bandwidth = {
                bandwidth: { // We're gonna yoink the object HostingBot gives for Bandwidth and transform it into something that isn't for Canvas.
                  limit: json.bandwidth.limit_gb, 
                  used: json.bandwidth.used_gb,
                  bytesLimit: json.bandwidth.limit,
                  bytesUsed: json.bandwidth.used,
                },
                month: {
                  yr: json.month.yr,
                  month: json.month.month,
                  mth_txt: json.month.mth_txt.replace(/<[^>]*>?/gm, '\n'), //The months for Bandwidth.
                  days: json.month.days,
                }
              }
             });
        }, 3000);
      }
    }
        /**
     * Get the RAW bandwidth object from the hostingbot.net API.
     * @returns {Object} Bandwidth (Object)
     */
     getRawBandwidth() {
      return new Promise((resolve, reject) => {
      //Try to fetch the data from HostingBot, if there is a error it'll throw one.
       fetch(`${baseUrl}?act=bandwidth&svs=${this.args.svs}&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`)
       .catch(reject)
        .then(res => res.json())
          .then(json => {
            resolve({
              bandwidth: { // We're gonna yoink the object HostingBot gives for Bandwidth and transform it into something that isn't for Canvas.
                limit: json.bandwidth.limit_gb, 
                used: json.bandwidth.used_gb,
                bytesLimit: json.bandwidth.limit,
                bytesUsed: json.bandwidth.used,
              },
              month: {
                yr: json.month.yr,
                month: json.month.month,
                mth_txt: json.month.mth_txt.replace(/<[^>]*>?/gm, '\n'), //The months for Bandwidth.
                days: json.month.days,
              }

            })
          });
        })
  }
          /**
     * Get the RAW bandwidth object from the hostingbot.net API.
     * @returns {Object} Bandwidth (Object)
     */
    getBandwidth() {
      return new Promise((resolve, reject) => {
      if (!this.bandwidth) {
        this.getRawBandwidth().then(resolve).catch(reject)
      }
      else {
        try {
          resolve(this.bandwidth)
        }
        catch(e) {
          reject(e)
        }
      }
    })
    }
  }
  /**
 * Account API stuff from HostingBot's API.
 * @extends {Client}
 */
class Account extends Client {
    constructor(args) {
      super(args);
           this.name = 'HostingBot';
    }
    getAccount() {
      return new Promise((resolve, reject) => {
        //Try to fetch the profile from HostingBot, if there is a error it'll throw one.
         fetch(`${baseUrl}?act=profile&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`) //For this we can always DIRECTLY fetch from HostingBot's API without cache, due to it's give a fast response.
         .catch(reject)
          .then(res => res.json())
            .then(json => {
              resolve({
                  fname: json.preferences.fname,
                  lname: json.preferences.fname,
                  language: json.preferences.language,
                  uid: json.uid
              })
            });
          })
    }
  }
  
 




  module.exports = Client;