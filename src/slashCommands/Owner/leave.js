const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config")

module.exports = {
    name: "leave",
    description: "Permet de faire quitter le bot d'un serveur",
    owner: false,
    options: [
        {
            name: "identifiant",
            description: "Identifiant du serveur",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
    ],

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("Administrator"))) return interaction.reply({ content: `**❌ Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande**`, ephemeral: true }).catch(() => { });
        if(!config.ownerID.includes(interaction.user.id)) return interaction.reply({content: `❌ Vous n'avez pas la permissions de faire cette commande !`})
        
        try {

            const id = interaction.options.getString("identifiant");
            if(!id) id = interaction.guild.id;

            const guild = client.guilds.cache.get(id);
            await guild.leave().then(c => console.log(`Je viens de quitter le serveur qui as pour identifiant ${id}`)).catch((err) => { console.log(err)})

            return interaction.reply({content: `J'ai bien quitter le serveur qui a l'identifiant ${id}`, ephemeral: true})

        } catch (error) {
            console.log('Une erreur est survenue sur la commande leave', error)
        }
    }
}