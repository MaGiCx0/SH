const { MessageEmbed, MessageActionRow, MessageButton } = require('discord.js')

module.exports = {
	name: 'ping',
  cooldown: 3,
	UserPermission: ["SEND_MESSAGES"],
  BotPermission: ["EMBED_LINKS"],
	async execute(client, interaction) {
        const supp = new MessageButton()
    .setLabel(`Support Server`)
    .setStyle('LINK')
    .setURL(`https://discord.gg/DNqzGrEYTn`)

    const roww = new MessageActionRow()
    .addComponents(supp)

   const msg = await interaction.reply({ content: `${client.ws.ping} ms`, fetchReply: true });

		const embed = new MessageEmbed()
			embed.setAuthor({ name: interaction.user.username, iconURL: interaction.user.displayAvatarURL({ dynamic: true })})
			let pinging = Math.floor(msg.createdTimestamp - interaction.createdTimestamp)
    if(pinging >= 0) {
      embed.setColor("#00FF00")
      if(pinging >= 150) {
      embed.setColor("#FFFF00")
        if(pinging >= 250) {
      embed.setColor("#FF0000")
    }
    } 
    } 
			embed.setTimestamp()
			embed.setDescription(
				`**Time:** ${Math.floor(msg.createdTimestamp - interaction.createdTimestamp)} ms\n**API Ping:** ${
					client.ws.ping
				} ms`,
			);
		return interaction.reply({ embeds: [embed], content: `<@${interaction.user.id}>` });
	}
};