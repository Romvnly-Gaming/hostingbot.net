[![HostingBot Logo](https://github.com/Romvnly-Gaming/hostingbot.net/blob/main/hostingbot.png)](https://clients.hostingbot.net/aff.php?aff=8)
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
const VPS = new HostingBot.VPS({
      apiKey: client.config["hostingbot-apiKey"], // API Key from hostingbot.net
      apiPass: client.config["hostingbot-apiPass"], // API pass from hostingbot.net
      svs: 56 // Secure Virtual Server ID from hostingbot.net
  });  // Class with functions.
const Statistics = VPS.getBandwidth(); // Returns a promise object
console.log(Statistics); 
// {
//   bandwidth: {
//     limit: 4000,
//     used: 23.14,
//     bytesLimit: 4096000,
//     bytesUsed: 23699.31
//   },
//   month: {
//     yr: '2020',
//     month: '10',
//     mth_txt: '20 Oct 2020\n19 Nov 2020',
//     days: '31'
//   }
// }
```
## Get API Information

Go to the Client Area in hostingbot.net 
[![HostingBot Client Area](https://github.com/Romvnly-Gaming/hostingbot.net/blob/main/client-area.png)](https://clients.hostingbot.net/aff.php?aff=8)

And then from the virtualizor dashboard, get your Virtual Private Server's ID. This is your 'svs' that we use to fetch from the HostingBot API.
[![HostingBot Client Area](https://github.com/Romvnly-Gaming/hostingbot.net/blob/main/dashboard.png)](https://clients.hostingbot.net/aff.php?aff=8)

Now, you need to create a API key pair as they're not generated by HostingBot.net automatically for security.
[![HostingBot Client Area](https://github.com/Romvnly-Gaming/hostingbot.net/blob/main/credentials.png)](https://clients.hostingbot.net/aff.php?aff=8) 
And boom, you've created a API user! Please make sure to keep all your credentials safe, if you ever lose them, you should REVOKE them from the virtualizor dashboard. 

## Important
This is a API Wrapper for hostingbot.net from a customer for fellow customers. In no way does Hostingbot, LLC have any involvement in the development of this module besides just providing API endpoints for their customers. Use at your own risk.

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)