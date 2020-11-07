const Client = require('../structures/client.js');
const HostingBotUtils = require('../utils');
const Utils = new HostingBotUtils();
/**
 * Account API stuff from HostingBot's API.
 * @extends {Client}
 */
class Account extends Client {
    constructor(args) {
        super(args)
        if (!this.args) throw new Error("Arguments unavailable to the client.");
        this.name = 'HostingBot';
        if (this.args.cache === true) { // Whether or not to do this function.
            fetch(`${this.baseUrl}?act=productdetails&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`) //For this we can always DIRECTLY fetch from HostingBot's API without cache, due to it's give a fast response.
            .catch(() => null)
            .then(res => res.text())
            .then(json => {
                if (typeof json !== "string") return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad Account information or something else related to virtualizor.`);
                if (!Utils.IsJsonString(json)) return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad Account information or something else related to virtualizor.`);
                json = JSON.parse(json)
                if (!json.username) return reject(`HostingBot virtualizor sent back a response stating that the credentials failed. This could be because of bad Account information or something else related to virtualizor.`);
                const vpsArray = [];
    
                for (const [key, value] of Object.entries(json.status)) {
                    const vps = json.vs[`${key}`]
                    const sanitizedIPs = []
                    for (const [randomKey, ip] of Object.entries(vps.ips)) {
                        sanitizedIPs.push(ip)
                    }
                    vpsArray.push({ // Getting the important information from virtualizor.
                        vpsid: parseInt(vps.vpsid),
                        planID: parseInt(vps.plid), //Plan ID, like for example 
                        hostname: vps.hostname,
                        os: vps.os_distro,
                        ram: parseInt(vps.ram),
                        cores: parseInt(vps.cores),
                        region: vps.region,
                        ips: sanitizedIPs,
                        type: vps.virt,
                        status: vps.status == 1 ? "Online" : "Offline"
                    })
                }
                this.vpsList = vpsArray
            });
            setInterval(function() {
                fetch(`${this.baseUrl}?act=listvs&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`) //For this we can always DIRECTLY fetch from HostingBot's API without cache, due to it's give a fast response.
                .catch(() => null)
                .then(res => res.text())
                .then(json => {
                    if (typeof json !== "string") return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad Account information or something else related to virtualizor.`);
                    if (!Utils.IsJsonString(json)) return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad Account information or something else related to virtualizor.`);
                    json = JSON.parse(json)
                    if (!json.username) return reject(`HostingBot virtualizor sent back a response stating that the credentials failed. This could be because of bad Account information or something else related to virtualizor.`);

                    const vpsArray = [];
        
                    for (const [key, value] of Object.entries(json.status)) {
                        const vps = json.vs[`${key}`]
                        const sanitizedIPs = []
                        for (const [randomKey, ip] of Object.entries(vps.ips)) {
                            sanitizedIPs.push(ip)
                        }
                        vpsArray.push({ // Getting the important information from virtualizor.
                            vpsid: parseInt(vps.vpsid),
                            planID: parseInt(vps.plid), //Plan ID, like for example 
                            hostname: vps.hostname,
                            os: vps.os_distro,
                            ram: parseInt(vps.ram),
                            cores: parseInt(vps.cores),
                            region: vps.region,
                            ips: sanitizedIPs,
                            type: vps.virt,
                            status: vps.status == 1 ? "Online" : "Offline"
                        })
                    }
                    this.vpsList = vpsArray
                });
            }, 3000);
        }
    }
    /**
     * Get the currently authorized account.
     * @returns {Promise<Object>} Account
     */
    fetch() {
        return new Promise((resolve, reject) => {
            //  Try to fetch the profile from HostingBot, if there is a error it'll throw one.
            fetch(`${this.baseUrl}?act=profile&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`) //For this we can always DIRECTLY fetch from HostingBot's API without cache, due to it's give a fast response.
                .catch(reject)
                .then(res => res.text())
                .then(json => {
                    if (typeof json !== "string") return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad Account information or something else related to virtualizor.`);
                    if (!Utils.IsJsonString(json)) return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad Account information or something else related to virtualizor.`);
                    json = JSON.parse(json)
                    if (!json.username) return reject(`HostingBot virtualizor sent back a response stating that the credentials failed. This could be because of bad Account information or something else related to virtualizor.`);

                    resolve({
                        fname: json.preferences.fname, // First Name
                        lname: json.preferences.lname, // Last Name
                        email: json.username, // Email
                        language: json.preferences.language, // Language
                        uid: parseInt(json.uid) // User ID (I don't think any regular users can do something with this for now, but hey, they have it for the future!)
                    })
                });
        });
    }
    getRawVPSList() {
        return new Promise((resolve, reject) => {
            fetch(`${this.baseUrl}?act=listvs&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`) //For this we can always DIRECTLY fetch from HostingBot's API without cache, due to it's give a fast response.
                .catch(reject)
                .then(res => res.text())
                .then(json => {
                    if (typeof json !== "string") return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad Account information or something else related to virtualizor.`);
                    if (!Utils.IsJsonString(json)) return reject(`HostingBot virtualizor sent back a invalid response stating: ${json}\nThis could be because of bad Account information or something else related to virtualizor.`);
                    json = JSON.parse(json)
                    if (!json.username) return reject(`HostingBot virtualizor sent back a response stating that the credentials failed. This could be because of bad Account information or something else related to virtualizor.`);
                    const vpsArray = [];
        
                    for (const [key, value] of Object.entries(json.status)) {
                        const vps = json.vs[`${key}`]
                        const sanitizedIPs = []
                        for (const [randomKey, ip] of Object.entries(vps.ips)) {
                            sanitizedIPs.push(ip)
                        }
                        vpsArray.push({ // Getting the important information from virtualizor.
                            vpsid: parseInt(vps.vpsid),
                            planID: parseInt(vps.plid), //Plan ID, like for example 
                            hostname: vps.hostname,
                            os: vps.os_distro,
                            ram: parseInt(vps.ram),
                            cores: parseInt(vps.cores),
                            region: vps.region,
                            ips: sanitizedIPs,
                            type: vps.virt,
                            status: vps.status == 1 ? "Online" : "Offline"
                        })
                    }
                    resolve(vpsArray)
                });
        })
    }
    getVPSList() {
        return new Promise((resolve, reject) => {
            if (!this.vpsList) {
                this.getRawVPSList().then(resolve).catch(reject)
            } else {
                try {
                    resolve(this.vpsList)
                } catch (e) {
                    reject(e)
                }
            }
        })
    }

};
module.exports = Account;