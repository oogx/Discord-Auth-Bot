const { SlashCommandBuilder } = require('discord.js')
const { Owner } = require('../../Misc/Roles.json');
module.exports = {
	data: new SlashCommandBuilder()
		.setName('blacklist')
		.setDescription('Blacklists a key')
        .addStringOption(option =>
            option.setName('key')
                .setDescription('Key You Want To Blacklist')
                .setRequired(true)
        ),
	async execute(interaction,client) {
        if (interaction.member.roles.cache.has(Owner)) {
            let Key = interaction.options.getString('key')
            client.MongoSchema.find().then((index) => {
                index.forEach(async (data) => {
                    if ( data.Key == Key ) {
                        data.Blacklisted = "true"
                        data.save().catch(err => console.log(err));
                        interaction.reply({content: "Blacklisted Selected Key.", ephemeral : true})                    
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