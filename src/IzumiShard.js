const app = require("express")()
app.get("/", (req, res) => {
    res.send("Ok")
})

app.listen(3000, "0.0.0.0")
const Manager = require("./system/cluster/ClusterManager");
let {token} = require("./handlers/config");
const manager = new Manager(`${__dirname}/Izumi.js`,{
    totalShards: 3,
    totalClusters: 2, 
    mode: "process",
    token: token
})

manager.on('clusterCreate', cluster => console.log(`Launched Cluster ${cluster.id}`));
manager.spawn(undefined, undefined, -1)