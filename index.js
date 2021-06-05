const { Client, Intents } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });

const auroMs = require('auro-ms-conversion');

require('dotenv').config();

const PREFIX = '?';

client.on('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
});

client.on('message', async (message) => {
    if (!message.content.startsWith(PREFIX) || message.author.bot) return;
    if (!client.application?.owner) await client.application?.fetch();

    const args = message.content.slice(PREFIX.length).trim().split(/ +/);
    const command = args.shift().toLowerCase();

    switch (command) {
        case 'ping':
            message.reply(`Pong! Up for ${auroMs.relativeTime(client.uptime)}`);
            break;

        case 'deploy':
            if (message.author.id !== client.application?.owner.id) return;

            const data = {
                name: 'ping',
                description: 'Replies with Pong!',
            };

            const command = await client.guilds.cache.get('752330520028774410')?.commands.create(data);
            console.log(command);

            break;
    }
});

client.on('interaction', async (interaction) => {
    if (!interaction.isCommand()) return;

    switch (interaction.commandName) {
        case 'ping':
            await interaction.reply('Pong!');
            break;
    }
});

client.login(process.env.TOKEN);
