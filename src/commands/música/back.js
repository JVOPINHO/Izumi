const Command = require("../Command")
const Discord = require("discord.js")

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super({
            name: "back",
            description: "Volte a música anterior",
            aliases: ["voltar"],
            dirname: __dirname,
            cooldown: 3000,
            requires: {
                memberVoiceChannel: true,
                player: true
            }
        }, client)
    }

    async run(message, args, player) {
        if(!player.queue[player.queueIndex - 1]) return
        player.back()
        message.react('⏮')
    }
}