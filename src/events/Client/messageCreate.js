const { EmbedBuilder, Message, Client, PermissionsBitField, ChannelType } = require("discord.js");

module.exports = {
    name: "messageCreate",
    /**
     * 
     * @param {Client} client 
     * @param {Message} message 
     * @returns 
     */
    run: async (client, message) => {
        if (message.author.bot) return;

}};