const { EmbedBuilder,SlashCommandBuilder } = require('discord.js')
const { Name } = require('../../Misc/Bot.json');
const { Owner } = require('../../Misc/Roles.json');
const { GenerateKey } = require('../../Utility/Functions.js');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('generate')
		.setDescription('Generates a key which can be redeemed by a user'),
	async execute(interaction,client) {
        if (interaction.member.roles.cache.has(Owner)) {
            const GeneratedKey = GenerateKey()
            const Data = new client.MongoSchema({
                DiscordUsername: null,
                DiscordId: null,
                Key: GeneratedKey,
                Blacklisted: "false",
                Hwid: null,
            })
            const GeneratedKeyEmbed = new EmbedBuilder()
			    .setTitle(Name)
			    .setDescription(`Key Generated: ${GeneratedKey}`)
			    .setTimestamp();
            Data.save().catch(err => console.log(err));
		    await interaction.reply({ embeds: [GeneratedKeyEmbed],ephemeral : true });
        } else {
            interaction.reply({ content: "You do not have permission to use this command", ephemeral: true })
        }
    }
}