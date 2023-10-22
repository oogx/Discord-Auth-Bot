const { SlashCommandBuilder } = require('discord.js')
const { Owner } = require('../../Misc/Roles.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('unblacklist')
		.setDescription('UnBlacklists a key')
        .addStringOption(option =>
            option.setName('key')
                .setDescription('Key You Want To UnBlacklist')
                .setRequired(true)
        ),
	async execute(interaction,client) {
        if (interaction.member.roles.cache.has(Owner)) {
            let Key = interaction.options.getString('key')
            client.MongoSchema.find().then((index) => {
                index.forEach(async (data) => {
                    if ( data.Key == Key ) {
                        data.Blacklisted = "false"
                        data.save().catch(err => console.log(err));
                        interaction.reply({content: "UnBlacklisted Selected Key.", ephemeral : true})                    
                    } else {
                        interaction.reply({ content: "Invalid Key", ephemeral: true })
                    }
                })
            })
        } else {
            interaction.reply({ content: "You do not have permission to use this command", ephemeral: true })
        }
    }
}