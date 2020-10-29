const Client = require('../structures/client.js');

/**
 * Creates a new HostingBot VPS Thingy
 */
class VPS extends Client {
    constructor(args) {
        super(args)
      this.name = 'HostingBot';
      if (this.args.cache === true) { // Whether or not to do this function.
          fetch(`${this.baseUrl}?act=bandwidth&svs=${this.args.svs}&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`)
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
          fetch(`${this.baseUrl}?act=bandwidth&svs=${this.args.svs}&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`)
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
     * @returns {Object} Bandwidth 
     */
     getRawBandwidth() {
      return new Promise((resolve, reject) => {
      //Try to fetch the data from HostingBot, if there is a error it'll throw one.
       fetch(`${this.baseUrl}?act=bandwidth&svs=${this.args.svs}&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`)
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
     * @returns {Object} Bandwidth 
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
  };
  module.exports = VPS;