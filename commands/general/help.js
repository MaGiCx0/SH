const { MessageEmbed , MessageButton , MessageActionRow , Permissions } = require("discord.js")

module.exports = {
	name: 'help',
  cooldown: 3,
	UserPermission: ["SEND_MESSAGES"],
  BotPermission: ["EMBED_LINKS"],
	async execute(client, interaction) {
    
    let prefix;
    prefix = "/"
  const inv = new MessageButton()
	.setLabel(`Invite ThunderShare`)
	.setStyle('LINK')
	.setURL(client.generateInvite({ scopes: ['bot' , 'applications.commands'], permissions: [Permissions.FLAGS.ADMINISTRATOR] }))

		const sup = new MessageButton()
	.setLabel(`Support Server`)
	.setStyle('LINK')
	.setURL(`https://discord.gg/DNqzGrEYTn`)

const row = new MessageActionRow()
			.addComponents(inv)
			.addComponents(sup)
    
        let embed1 = new MessageEmbed()
          .setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
        .setThumbnail(interaction.user.avatarURL({ dynamic:true }))
        .addField(`🗂️ General:`, `>>> **</help:1176278633866870795>,</ping:1176278633866870794>,</bot:1176278633866870796>,</user:1176278634219176060>**`)
        .addField(`🔮 Bumping:`,`>>> **</channel:1176278633866870797>,</desc:1176278633866870798>,</Magic:1176278633866870799>,</preview:1176278633866870800>**`)
        .addField(`<a:emoji_22:1124362661371596882> Coins:`,`>>> **</coins:1176278633866870801>,</daily:1176278633866870803>,</leaderboard:1176278633866870802>**`)
        .addField(`:gem: Prime:`, `>>> **</prime preview:1176278634219176058>,</prime move:1176278634219176058>,</prime subscribe:1176278634219176058>,</embed banner:1176278634219176061>**`)
        .setColor("#36393f")
        return interaction.editReply({embeds : [embed1] , components : [row]})
    }
}