const { readdirSync } = require("fs")

module.exports = (client) => {
  client.commands = []

  let pastas = readdirSync(__dirname + "/../commands").filter(x => x != "Command.js");
  for(let pasta of pastas) {
    let commands = readdirSync(__dirname + "/../commands/" + pasta).filter(file => file.split(".").pop() == "js");
    for (command of commands) {
      let base = require(__dirname + `/../commands/${pasta}/${command}`)
      if(typeof base == "function") {
        let cmd = new base(client)
        client.commands.push(cmd)
      }
    }
  }
}