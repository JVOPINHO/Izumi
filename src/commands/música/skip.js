const Command = require("../Command")
const Discord = require("discord.js")

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super({
            name: "skip",
            description: "Pule a música que está sendo tocada",
            aliases: ["s", "pular"],
            dirname: __dirname,
            cooldown: 3000,
            requires: {
                memberVoiceChannel: true,
                player: true
            }
        }, client)
    }

    async run(message, args, player) {
        player.skip()
        message.react('⏭')
    }
}