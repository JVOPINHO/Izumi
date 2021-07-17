const Manager = require("./system/cluster/ClusterManager");
let {token} = require("./handlers/config");
const manager = new Manager(`${__dirname}/Izumi.js`,{
    totalShards: 2,
    totalClusters: 2, 
    mode: "process",
    token: token
})

manager.on('clusterCreate', cluster => console.log(`Launched Cluster ${cluster.id}`));
manager.spawn(undefined, undefined, -1)