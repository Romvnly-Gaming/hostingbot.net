const Client = require('../structures/client.js');
function formatBytes(a,b=2){if(0===a)return"0 Bytes";const c=0>b?0:b,d=Math.floor(Math.log(a)/Math.log(1024));return parseFloat((a/Math.pow(1024,d)).toFixed(c))+" "+["Bytes","KBs","MBs","GBps","TBps","PBps","EBps","ZBps","YBps"][d]} //Minified formatter, gotta keep the module speedy.
/**
 * Account API stuff from HostingBot's API.
 * @extends {Client}
 */
class Account extends Client {
    constructor(args) {
        super(args)
        this.name = 'HostingBot';
        if (this.args.cache === true) { // Whether or not to do this function.
            fetch(`${this.baseUrl}?act=listvs&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`) //For this we can always DIRECTLY fetch from HostingBot's API without cache, due to it's give a fast response.
            .catch(reject)
            .then(res => res.json())
            .then(json => {
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
                        cores: parseInt(vps.ram),
                        region: vps.region,
                        ips: sanitizedIPs,
                        type: vps.virt,
                        status: vps.status == 1 ? "Online" : "Offline",
                        networkSpeed: {
                            download: formatBytes(vps.network_speed),
                            upload: formatBytes(vps.upload_speed)
                        }
                    })
                }
                this.vpsList = vpsArray
            });
            setInterval(function() {
                fetch(`${this.baseUrl}?act=listvs&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`) //For this we can always DIRECTLY fetch from HostingBot's API without cache, due to it's give a fast response.
                .catch(reject)
                .then(res => res.json())
                .then(json => {
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
                            cores: parseInt(vps.ram),
                            region: vps.region,
                            ips: sanitizedIPs,
                            type: vps.virt,
                            status: vps.status == 1 ? "Online" : "Offline",
                            networkSpeed: {
                                download: formatBytes(vps.network_speed),
                                upload: formatBytes(vps.upload_speed)
                            }
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
            //Try to fetch the profile from HostingBot, if there is a error it'll throw one.
            fetch(`${this.baseUrl}?act=profile&api=json&apikey=${this.args.apiKey}&apipass=${this.args.apiPass}`) //For this we can always DIRECTLY fetch from HostingBot's API without cache, due to it's give a fast response.
                .catch(reject)
                .then(res => res.json())
                .then(json => {
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
                .then(res => res.json())
                .then(json => {
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
                            cores: parseInt(vps.ram),
                            region: vps.region,
                            ips: sanitizedIPs,
                            type: vps.virt,
                            status: vps.status == 1 ? "Online" : "Offline",
                            networkSpeed: {
                                download: formatBytes(vps.network_speed),
                                upload: formatBytes(vps.upload_speed)
                            }
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