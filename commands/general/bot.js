const { MessageEmbed , MessageButton , MessageActionRow , Permissions} = require("discord.js")
const ms = require("humanize-duration")
const millify = require("millify")
const commaNumber = require('comma-number')

module.exports = {
	name: 'bot',
	cooldown: 3,
	UserPermission: ["SEND_MESSAGES"],
  BotPermission: ["EMBED_LINKS"],
	async execute(client, interaction) {

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

let servers = client.guilds.cache.size
let channels = client.channels.cache.size
let users = `${client.guilds.cache.reduce((a, g) => a + g.memberCount, 0)}`
    
		let embed = new MessageEmbed()
		.addField(`<a:emoji_25:1125103922663653548> Statistics:`, `- **Servers:** \`${commaNumber(servers)} servers\`\n- **Users:** \`${commaNumber(users)} user\`\n- **Channels:** \`${commaNumber(channels)} channel\``, true)
		.addField(`<a:emoji_26:1125112064948572242> Bot:`, `- **Created At:** <t:${Math.floor(client.user.createdTimestamp/1000.0)}:R>\n- **Uptime:** \`${ms(client.uptime , { round : true})}\`\n- **RAM Usage:** \`${(process.memoryUsage().rss / 1048576).toFixed()} MB\`\n- **Node Version:** \`${process.version}\`\n- **Ping:** \`${client.ws.ping}\``, true)
		.setThumbnail(client.user.displayAvatarURL({dynamic : true , format : "png"}))
		.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
		.setColor("#36393f")
    return interaction.editReply({embeds : [embed] , components : [row]})
	}
}