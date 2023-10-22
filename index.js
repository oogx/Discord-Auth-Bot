const { Client, Collection, GatewayIntentBits, Partials } = require('discord.js');
const { Token } = require('./Misc/Bot.json');
const client = new Client({
	intents: [GatewayIntentBits.Guilds,GatewayIntentBits.GuildMembers,GatewayIntentBits.GuildEmojisAndStickers,GatewayIntentBits.GuildIntegrations,GatewayIntentBits.GuildWebhooks,GatewayIntentBits.GuildInvites,GatewayIntentBits.GuildVoiceStates,GatewayIntentBits.GuildPresences,GatewayIntentBits.GuildMessages,GatewayIntentBits.GuildMessageReactions,GatewayIntentBits.GuildMessageTyping,GatewayIntentBits.DirectMessages,GatewayIntentBits.DirectMessageReactions,GatewayIntentBits.DirectMessageTyping,GatewayIntentBits.MessageContent], 
	shards: "auto", 
	partials: [Partials.Message,Partials.Channel,Partials.GuildMember,Partials.Reaction,Partials.GuildScheduledEvent,Partials.User,Partials.ThreadMember]
});
client.SlashCommands = new Collection();
client.MongoSchema = require('./Schema/Mongo.js');
["Mongo.js","Interaction.js","Event.js","Server.js"].forEach((handler) => {
	require(`./Handler/${handler}`)(client)
})
process.on('unhandledRejection', error => {
	console.log(`Unhandled promise rejection: ${error}`)
})
client.login(Token)