const TutorielYoutube = require("./structures/Client");
const client = new TutorielYoutube();
const { GiveawaysManager } = require('discord-giveaways');

const manager = new GiveawaysManager(client, {
    storage: './giveaways.json',
    default: {
        botsCanWin: false,
        embedColor: '#FF0000',
        embedColorEnd: '#000000',
        reaction: '🎉'
    }
});
client.giveawaysManager = manager;


client.connect()
client.login(process.env.TOKEN);


module.exports = client;