const { EmbedBuilder,SlashCommandBuilder,codeBlock } = require('discord.js')
const { Name } = require('../../Misc/Bot.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('redeem')
		.setDescription('Redeems a generated key')
        .addStringOption(option =>
            option.setName('key')
                .setDescription('Key You Want To Redeem')
                .setRequired(true)
        ),
	async execute(interaction,client) {
        let Key = interaction.options.getString('key')
        client.MongoSchema.find().then((index) => {
            index.forEach(async (data) => {
                if ( data.Key == Key ) {
                    if ( data.DiscordId == null ) {
                        data.DiscordUsername = interaction.user.tag
                        data.DiscordId = interaction.user.id
                        const RedeemedKeyEmbed = new EmbedBuilder()
                            .setColor(0x0099FF)
							.setTitle(Name)
							.addFields(
                                { name: 'Script', value: codeBlock("lua",`Auth_Key = ${data.Key}\nloadstring(game:HttpGet('Loadstring Here'))()`)}
                            )
							.setTimestamp();
                        data.save().catch(err => console.log(err));
                        interaction.reply({content: "Check Your Dms.", ephemeral : true})
                        interaction.user.send({ embeds: [RedeemedKeyEmbed] })
                    } else {
                        interaction.reply({ content: "Already Redeemed Key", ephemeral: true })
                    }
                } else {
                    interaction.reply({ content: "Invalid Key", ephemeral: true })
                }
            })
        })
    }
}