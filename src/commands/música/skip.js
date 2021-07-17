const Command = require("../Command")
const Discord = require("discord.js")
const { URL } = require("url")
const pretty = require("pretty-ms")

module.exports = class PlayCommand extends Command {
    constructor(client) {
        super({
            name: "play",
            description: "Toque uma música",
            aliases: ["p", "tocar"],
            dirname: __dirname,
            cooldown: 3000,
            explaples: ["<Nome|URL> [--soundcloud|--ytm]"],
            requires: {
                memberVoiceChannel: true
            }
        }, client)
    }

    async run(message, args, player) {
        if(!player) player = await this.client.music.join({ 
            guild: message.guild.id, 
            channel: message.member.voice.channel.id, 
            node: this.client.music.idealNodes[0].id 
        }, { selfdeaf: true })
        player.text = message.channel

        let search
        try {
            new URL(args.join(' '))
            search = args.join(' ')
        } catch(_) {
            search = `ytsearch:${args.join(' ')}`
        }

        const results = await player.searchSongs(search, message.author)
        
        if(results.loadType == 'LOAD_FAILED') return message.quote(new Discord.MessageEmbed()
            .setColor("RED")
            .setDescription("**Aconteceu um erro ao carregar a música.**")
        )
        else if(results.loadType == 'NO_MATCHES') {
            if(player.queue.totalSize == 0) client.music.leave(message.guild.id)
            return message.quote(new Discord.MessageEmbed()
                .setColor("RED")
                .setDescription("**Não consegui achar a música.**")
            )
        }
        else if(results.loadType == 'PLAYLIST_LOADED') {
            results.tracks.map(t => player.queue.push(t));

            message.quote(new Discord.MessageEmbed()
                .setColor("#E0FFFF")
                .setDescription(`${results.playlistInfo.name} | ${results.tracks.length} Músicas`)
            )

            if(!player.queue.current) player.play()
        } else {
            player.queue.push(results.tracks[0])

            message.quote(new Discord.MessageEmbed()
                .setColor("#E0FFFF")
                .setDescription(`[\`${results.tracks[0].title}\`](${results.tracks[0].url}) - \`${!results.tracks[0].isStream ? pretty(results.tracks[0].duration, {colonNotation: true, secondsDecimalDigits: 0}) : "◉ LIVE"}\``)
                .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
            )

            if(!player.queue.current) player.play()
        }
    }
}