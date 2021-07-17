const client = require("../Izumi")
const Discord = require("discord.js")

client.on("message", async message => {
  //client.messages.set(`${message.id}_${message.channel.id}`, message)
  if(message.author.bot || message.channel.type == "dm" || message.webhookID) return;

  const perms = message.channel.permissionsFor(message.client.user);
if(!perms.has("SEND_MESSAGES")) return;

  if(!perms.has("EMBED_LINKS")) return message.quote(`> Eu preciso de permissão de \`Enviar Links\``)
  if(!perms.has("USE_EXTERNAL_EMOJIS")) return message.quote(`> Eu preciso de permissão de \`Usar Emojis Externos\``)
  if(!perms.has("ADD_REACTIONS")) return message.quote(`> Eu preciso de permissão de \`Adicionar Reações\``)
  if(!perms.has("ATTACH_FILES")) return message.quote(`> Eu preciso de permissão de \`Anexar arquivos\``)

  let prefixo
  let mentions = [`<@${client.user.id}> `, `<@${client.user.id}>`, `<@!${client.user.id}> `, `<@!${client.user.id}>`, client.config.prefix]
  for (let i of mentions) {
    if(message.content.startsWith(i.toLowerCase())) {
      prefixo = i
      break;
    }
  }
  if(!prefixo) return;
  if(!message.content.startsWith(prefixo.toLowerCase())) return;

  const args = message.content.trim().slice(prefixo.length).split(/ +/g);
  let command = args.shift().toLowerCase();
  if(!command) return;
  command = client.commands.find(c => c.name == command || (c.aliases && c.aliases.includes(command)))
  if(!command) return;

  let dataPerm = command.verifyPerms(message.member, message.guild.me)
  if(!dataPerm.member.has) {
    if(dataPerm.member.type == "owner") return message.quote(new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("**Apenas meus desenvolvedores podem usar este comando!**")
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
    )
  }

  let player = client.music.players.get(message.guild.id)

  if(command.requires.memberVoiceChannel) {
    if(!client.music.idealNodes[0]) return message.quote(new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("**Estou sem conexão com meus nodes! Tente novamente depois.**")
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
    )
    const channel = message.member.voice.channel
    if(!channel) return message.quote(new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("**Você precisa estar em um canal de voz!**")
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
    )
    if(player && message.guild.me.voice.channel && message.guild.me.voice.channel.id !== channel.id) return message.quote(new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("**Você precisa estar no mesmo canal de voz que o meu!**")
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
    )
    if(!channel.permissionsFor(client.user.id).has(1048576)) return message.quote(new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("**Eu não tenho permissão para conectar no seu canal de voz!**")
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
    )
    if(!channel.permissionsFor(client.user.id).has(2097152)) return message.quote(new Discord.MessageEmbed()
      .setColor("RED")
      .setDescription("**Eu não tenho permissão para falar no seu canal de voz!**")
      .setFooter(message.author.tag, message.author.displayAvatarURL({dynamic: true}))
      .setTimestamp()
    )
  }

  try {
    command.run(message, args, player);
  } catch (_) {};
})