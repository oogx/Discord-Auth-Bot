const { REST,Routes } = require('discord.js')
const { Id, Server, Token } = require('../Misc/Bot.json');
module.exports = {
	name: 'interactionCreate',
	once: false,
	async execute(interaction, client) {
		const commandArray = []
        const rest = new REST().setToken(Token);
	        (async () => {
		        try {
			        await rest.put(
				        Routes.applicationGuildCommands(Id, Server),
				        { body: commandArray },
			        );
		        } catch (error) {
			        console.log(error)
		        }
	        })();
		if (interaction.isCommand()) {
			const slashCommand = client.SlashCommands.get(interaction.commandName)
			if (!slashCommand) {
				return interaction.reply({
					content: '`An error has occurred.`',
					ephemeral: true,
				})
			}
			if (slashCommand.permissions && slashCommand.permissions.length) {
				if (permissions(interaction, slashCommand)) {
					return
				}
			}
			try {
				await slashCommand.execute(interaction, client)
			} catch (error) {
				console.log(error)
				await interaction.reply({
					content: '`An error has occurred while executing this command.`',
					ephemeral: true,
				})
			} 
		}
	},
}
