
[![Module License](https://badgen.net/github/license/Romvnly-Gaming/hostingbot.net)](https://npmjs.com/hostingbot.net)
[![Module Version](https://badge.fury.io/js/hostingbot.net.svg)](https://npmjs.com/hostingbot.net)
[![HostingBot Logo](https://github.com/Romvnly-Gaming/hostingbot.net/blob/main/images/hostingbot.png)](https://clients.hostingbot.net/aff.php?aff=8)
# HostingBot.net API Wrapper

## Installation

```bash
npm install hostingbot.net --save
```

## Why use this module?
Personally I've been a customer of hostingbot.net for awhile now and I've seen how people love to integrate APIs with their bot. Using their hosting provider's API allows for rich information to be easily accessed. 
### Speed
I've done my best to try and optimize this module for speed. Currently, the HostingBot API is not the fastest so I've done some nice tricks to get past that and deliver content secure and fast.


## Usage

```js
const HostingBot = require("hostingbot.net"); // REQUIRE THE MODULE
const credentials = { // Don't be like me, have these values in a protected file.
      apiKey: "hostingbot-apiKey", // API Key from hostingbot.net
      apiPass: "hostingbot-apiPass", // API pass from hostingbot.net
      svs: 69, // Secure Virtual Server ID from hostingbot.net
      cache: true // Whether or not to cache responds from HostingBot's API for speed, defaults to true 
};
const VPS = new HostingBot.VPS(credentials); // Used for general VPS Actions.
const Statistics = VPS.getBandwidth(); // Returns a promise object
console.log(Statistics); 
// {
//   bandwidth: {
//     limit: 4000,
//     used: 23.14
//   },
//   month: {
//     yr: '2020',
//     month: '10',
//     mth_txt: '20 Oct 2020\n19 Nov 2020',
//     days: '31'
//   }
// }
const Account = new HostingBot.Account(credentials); // Used for general account actions. 
const myAccount = Account.fetch(); // Fetches directly from the HostingBot API due to a acceptable speed. Returns {Promise<Object>}
console.log(myAccount)
// {
//    "fname":"Romvnly",
//    "lname":"Gaming",
//    "language":"english",
//    "email":"romvnlybusiness@gmail.com",
//    "uid":24
// }
```
## Get API Information

Go to the Client Area in hostingbot.net 
[![HostingBot Client Area](https://github.com/Romvnly-Gaming/hostingbot.net/blob/main/images/client-area.png)](https://clients.hostingbot.net/aff.php?aff=8)

And then from the virtualizor dashboard, get your Virtual Private Server's ID. This is your 'svs' that we use to fetch from the HostingBot API.
[![HostingBot Virtualizor](https://github.com/Romvnly-Gaming/hostingbot.net/blob/main/images/dashboard.png)](https://clients.hostingbot.net/aff.php?aff=8)

Now, you need to create a API key pair as they're not generated by HostingBot.net automatically for security.
[![HostingBot Virtualizor Area](https://github.com/Romvnly-Gaming/hostingbot.net/blob/main/images/credentials.png)](https://clients.hostingbot.net/aff.php?aff=8) 
And boom, you've created a API user! Please make sure to keep all your credentials safe, if you ever lose them, you should REVOKE them from the virtualizor dashboard. 

## Important
This is a API Wrapper for hostingbot.net from an customer for fellow customers. In no way does Hostingbot, LLC have any involvement in the development of this module besides just providing API endpoints for their customers. Use at your own risk.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.
## Donating

Sadly, there is no way of directly donating to me. This module was made to help HostingBot customers and the README.md uses copyrighted HostingBot assets so out of respect I won't be providing a donation method besides using my HostingBot [Affiliate Link](https://clients.hostingbot.net/aff.php?aff=8) and purchasing services from HostingBot. 

## License
[MIT](https://choosealicense.com/licenses/mit/)