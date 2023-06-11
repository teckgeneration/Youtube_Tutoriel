const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType, ChannelType } = require("discord.js");
const config = require("../../config")
const Discord = require("discord.js");

module.exports = {
    name: "bot-info",
    description: "Permet de voir les informations du bot",
    owner: false,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("SendMessages"))) return interaction.reply({ content: `**❌ Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande**`, ephemeral: true }).catch(() => { });
        if(!interaction.member.permissions.has(PermissionsBitField.resolve("SendMessages"))) return interaction.reply({content: `❌ Vous n'avez pas la permissions de faire cette commande !`})
        
        try {

            const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                .setLabel('Invite Moi')
                .setStyle(ButtonStyle.Link)
                .setURL("https://discord.com/api/oauth2/authorize?client_id=1012643771575435324&permissions=8&scope=bot%20applications.commands"),

                new ButtonBuilder()
                .setLabel("Support Serveur")
                .setStyle(ButtonStyle.Link)
                .setURL("https://google.com")
            )

            const embed = new EmbedBuilder()
            .setTitle("Bot Information")
            .setDescription(`
            **__Bot Information__**
            
            > Developpeur : <@${config.ownerID}>
            > Nom : ${client.user.username}
            > Tag : ${client.user.discriminator}
            > ID : ${client.user.id}
            > Discord Version : V${Discord.version}
            > Node Version: V${process.version}
            > Temps Uptime : ${Math.round(client.uptime / (1000 * 60 * 60)) + "h " + (Math.round(client.uptime / (1000 * 60)) % 60) + "m " + (Math.round(client.uptime / 1000) % 60) + "s "}
            `)

            return interaction.reply({embeds: [embed], components: [row]})
          
        } catch (error) {
            console.log('Une erreur est survenue sur la commande bot-info', error)
        }
    }
}