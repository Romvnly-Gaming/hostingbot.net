const Client = require('../structures/client.js');
const HostingBotUtils = require('../utils');
const Utils = new HostingBotUtils();
/**
 * Creates a new HostingBot VPS Thingy
 */
class VPS extends Client {
    constructor(args) {
        super(args)
        if (!this.args || !this) throw new Error("Arguments unavailable to the client.");
        if (!this.args.svs) throw new Error("No Virtual Private Server ID provided.");
        this.name = 'HostingBot';
        if (this.args.cache === true) { // Whether or not to do this function.
            fetch(`${this.baseUrl}?act=bandwidth&svs=${this.args.svs}&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`)
                .catch(() => null)
                .then(res => res.text())
                .then(json => {
                    if (typeof json !== "string") return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad VPS information or something else related to virtualizor.`);
                    if (!Utils.IsJsonString(json)) return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad VPS information or something else related to virtualizor.`);
                    json = JSON.parse(json)

                    this.bandwidth = {
                        bandwidth: { // We're gonna yoink the object HostingBot gives for Bandwidth and transform it into something that isn't for Canvas.
                            limit: json.bandwidth.limit_gb,
                            used: json.bandwidth.used_gb
                        },
                        month: {
                            yr: json.month.yr,
                            month: json.month.month,
                            mth_txt: json.month.mth_txt.replace(/<[^>]*>?/gm, '\n'), //The months for Bandwidth.
                            days: json.month.days
                        }
                    }
                });
            //Try to fetch the data from HostingBot, if there is a error it'll throw one.
            fetch(`${this.baseUrl}?act=ram&svs=${this.args.svs}&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`)
                .catch(() => null)
                .then(res => res.text())
                .then(json => {
                    if (typeof json !== "string") return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad VPS information or something else related to virtualizor.`);
                    if (!Utils.IsJsonString(json)) return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad VPS information or something else related to virtualizor.`);
                    json = JSON.parse(json)

                    this.ram = {
                        used: json.ram.used,
                        limit: json.ram.guaranteed,
                        usedPercent: json.ram.percent,
                        freePercent: json.ram.percent_free
                    }
                });
            setInterval(function() {
                fetch(`${this.baseUrl}?act=bandwidth&svs=${this.args.svs}&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`)
                    .catch(() => null)
                    .then(res => res.text())
                    .then(json => {
                        if (typeof json !== "string") return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad VPS information or something else related to virtualizor.`);
                        if (!Utils.IsJsonString(json)) return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad VPS information or something else related to virtualizor.`);
                        json = JSON.parse(json)

                        this.bandwidth = {
                            bandwidth: { // We're gonna yoink the object HostingBot gives for Bandwidth and transform it into something that isn't for Canvas.
                                limit: json.bandwidth.limit_gb,
                                used: json.bandwidth.used_gb
                            },
                            month: {
                                yr: json.month.yr,
                                month: json.month.month,
                                mth_txt: json.month.mth_txt.replace(/<[^>]*>?/gm, '\n'), //The months for Bandwidth.
                                days: json.month.days
                            }
                        }
                    });
                fetch(`${this.baseUrl}?act=ram&svs=${this.args.svs}&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`)
                    .catch(() => null)
                    .then(res => res.text())
                    .then(json => {
                        if (typeof json !== "string") return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad VPS information or something else related to virtualizor.`);
                        if (!Utils.IsJsonString(json)) return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad VPS information or something else related to virtualizor.`);
                        json = JSON.parse(json)

                        this.ram = {
                            used: json.ram.used,
                            limit: json.ram.guaranteed,
                            usedPercent: json.ram.percent,
                            freePercent: json.ram.percent_free
                        }
                    });
            }, 3000);
        }
    }
    /**
     * Get the RAW bandwidth object from the hostingbot.net API.
     * @returns {Promise<Object>} Bandwidth 
     */
    getRawBandwidth() {
        return new Promise((resolve, reject) => {
            //Try to fetch the data from HostingBot, if there is a error it'll throw one.
            fetch(`${this.baseUrl}?act=bandwidth&svs=${this.args.svs}&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`)
                .catch(err => {
                    throw new Error("The provided credentials did not match the provided login information. The API returned this response: ", err)
                })
                .then(res => res.text())
                .then(json => {
                    if (typeof json !== "string") return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad VPS information or something else related to virtualizor.`);
                    if (!Utils.IsJsonString(json)) return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad VPS information or something else related to virtualizor.`);
                    json = JSON.parse(json)

                    resolve({
                        bandwidth: { // We're gonna yoink the object HostingBot gives for Bandwidth and transform it into something that isn't for Canvas.
                            limit: json.bandwidth.limit_gb,
                            used: json.bandwidth.used_gb
                        },
                        month: {
                            yr: json.month.yr,
                            month: json.month.month,
                            mth_txt: json.month.mth_txt.replace(/<[^>]*>?/gm, '\n'), //The months for Bandwidth.
                            days: json.month.days
                        }

                    })
                });
        })
    }
    /**
     * Get the cached bandwidth object from the cache.
     * @returns {Promise<Object>} Bandwidth 
     */
    getBandwidth() {
        return new Promise((resolve, reject) => {
            if (!this.bandwidth) {
                this.getRawBandwidth().then(resolve).catch(reject)
            } else {
                try {
                    resolve(this.bandwidth)
                } catch (e) {
                    reject(e)
                }
            }
        })
    }
    /**
     * Get the general information on the authorized VPS from the hostingbot.net API.
     * @returns {Promise<Object>} VPS Information 
     */
    fetch() {

    }
    /**
     * Get the general information on the authorized VPS from the hostingbot.net API.
     * @returns {Promise<Object>} VPS Ram, right now virtualizor seems to only have the VPS' total ram.
     */
    getRawRam() {
        return new Promise((resolve, reject) => {
            //Try to fetch the data from HostingBot, if there is a error it'll throw one.
            fetch(`${this.baseUrl}?act=ram&svs=${this.args.svs}&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`)
                .catch(err => {
                    reject(new Error("The provided credentials did not match the provided login information. The API returned this response:\n", err))
                })
                .then(res => res.text())
                .then(json => {
                    if (typeof json !== "string") return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad VPS information or something else related to virtualizor.`);
                    if (!Utils.IsJsonString(json)) return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad VPS information or something else related to virtualizor.`);
                    json = JSON.parse(json)

                    resolve({
                        used: json.ram.used,
                        limit: json.ram.guaranteed,
                        usedPercent: json.ram.percent,
                        freePercent: json.ram.percent_free
                    })
                });
        });
    }
    getRam() {
        return new Promise((resolve, reject) => {
            if (!this.ram) {
                this.getRawRam().then(resolve).catch(reject)
            } else {
                try {
                    resolve(this.ram)
                } catch (e) {
                    reject(e)
                }
            }
        })
    }
    /**
     * Change the VPS's Hostname, changes after a reboot
     * @returns {Promise<Object>} Some request information and whether the change succeeded or not.
     */
    changeHostname() {

    }
    /**
     * Get the VPS Logs from the cache.
     * @returns {Promise<Object>} Logs 
     */
    getVPSLogs() {

    }
    /**
     * Get the VPS Logs from the cache.
     * @returns {Promise<Object>} Logs 
     */
    reboot() {

    }
    /**
     * Destroy the cache and make the args unavailable to the client.
     * @returns {Boolean} Whether or not there was a error. 
     */
    destroy() {
        this.args = undefined;
    }
    /**
     * Schedule a shutdown.
     * @returns {Promise<Object>} Some request information and whether the change succeeded or not. 
     */
    scheduleShutdown() {

    }


};
module.exports = VPS;