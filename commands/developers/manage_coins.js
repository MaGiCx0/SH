let devs = ["782633686218702848","431555073290534924"];
const { Database } = require("quickmongo")
const coins = new Database(process.env.coins_db)

module.exports = {
	name: 'manage_coins',
	cooldown: 2,
 	UserPermission: ["SEND_MESSAGES"],
    BotPermission: ["SEND_MESSAGES"],
	async execute(client, interaction) {
        if(!devs.includes(interaction.user.id)) return interaction.editReply(`**:x: Developers Only.**`)
        
        let action = interaction.options.getString("action")
        let idd = interaction.options.getString("user")
        let amount = interaction.options.getString("amount")

        let u = await client.users.fetch(idd)
        if(!u) return interaction.editReply(`**:x: I can't find the user!**`)

        if(isNaN(amount)) return interaction.editReply(`**:x: NaN!**`)

        if(u && !isNaN(amount) && action == "add"){
            coins.add(`coins_${u.id}` , parseInt(amount))
            await interaction.editReply(`**💰 \`$${amount}\`, has been added to <@${u.id}>**`)
        }

        if(u && !isNaN(amount) && action == "remove"){
            coins.subtract(`coins_${u.id}` , parseInt(amount))
            await interaction.editReply(`**😕 \`$${amount}\`, has been removed from <@${u.id}>**`)
        }

    }
}