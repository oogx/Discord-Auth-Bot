const { REST,Routes } = require('discord.js')
const { getFiles } = require('../Utility/Functions.js')
const { Id, Token } = require('../Misc/Bot.json');
const commandArray = []
module.exports = (client) => {
	const slashCommandFiles = getFiles('./Commands/')
	for (const slashCommand of slashCommandFiles) {
		const slashCommandFile = require(slashCommand)
		client.SlashCommands.set(slashCommandFile.data.name, slashCommandFile)
		commandArray.push(slashCommandFile.data.toJSON())
		console.log(`\x1b[36m[Slash] \x1b[32m${slashCommandFile.data.name}\x1b[0m has been loaded`)
	}
    const rest = new REST().setToken(Token);
    (async () => {
        try {
            await rest.put(
                Routes.applicationCommands(Id),
                { body: commandArray },
            );
        } catch (error) {
            console.log(error)
        }
    })();
}
