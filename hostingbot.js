const baseUrl = "https://node2.hostingbot.net:4083/index.php"; // Virtualizor's API, just hosted under Hostingbot's domain.

  module.exports = {
    VPS: require('./structures/vps'),
    Account: require('./structures/account'),
    baseUrl: baseUrl
  };