const Command = require("../Command")

module.exports = class EvalCommand extends Command {
    constructor(client) {
        super({
            name: "eval",
            description: "Execute um codigo JavaScript",
            aliases: ["e", "evl"],
            dirname: __dirname,
            subcommands: [],
            cooldown: 0,
            explaples: ["<code>"],
            requires: {
                owner: true
            }
        }, client)
    }

    async run(message, args, player) {
        let conteudo = args.join(" ").replace(/```js|```/g, "")
        const start = Date.now()
        try {
            let result = await eval(conteudo)

            if (result instanceof Promise) {
                await result
            }

            if (typeof result !== 'string') result = await require('util').inspect(result, { depth: 0 })
            let end = (Date.now() - start)

            resultado(this.client, message, result)
        } catch (e) {
            resultado(this.client, message, e)
        }
    } 
}

async function resultado(client, message, result) {
    message.quote(`${result}`.replace(client.token, "No9-iu8w0Jha9US9H-aJplkdsj.jshuss9DsAShsahp989Sf4k3fd/").slice(0, 1990), {code: "js"})
}