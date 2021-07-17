const { Client } = require("discord.js");
const ClusterClient = require("./system/cluster/ClusterClient")
const client = new Client({
    shards: ClusterClient.getinfo().SHARD_LIST,
	shardCount: ClusterClient.getinfo().TOTAL_SHARDS
});
client.config = require("./handlers/config")
client.cluster = new ClusterClient(client);
module.exports = client;

require("./functions/quote");
require("./handlers/commandHandler")(client);
require("./handlers/eventHandler")(client);

client.login(client.config.token);