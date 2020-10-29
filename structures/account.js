
  const Client = require('../structures/client.js');

  /**
 * Account API stuff from HostingBot's API.
 * @extends {Client}
 */
class Account extends Client{
    constructor(args) {
            super(args)
           this.name = 'HostingBot';
    }
      /**
 * Get the currently authorized account.
 * @returns {Promise<Object>}
 */
    getAccount() {
      return new Promise((resolve, reject) => {
        //Try to fetch the profile from HostingBot, if there is a error it'll throw one.
         fetch(`${this.baseUrl}?act=profile&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`) //For this we can always DIRECTLY fetch from HostingBot's API without cache, due to it's give a fast response.
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
          });
    }
  };
  module.exports = Account;
  