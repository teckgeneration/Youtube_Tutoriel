const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType } = require("discord.js");
const config = require("../../config")
const { default: axios } = require("axios");

module.exports = {
    name: "emoji-add",
    description: "Permet d'ajouter un émoji sur le serveur",
    owner: false,
    options: [
        {
            name: "emoji",
            description: "Quel est l'émoji ?",
            required: true,
            type: ApplicationCommandOptionType.String,
        },
        {
            name: "nom",
            description: "Quel est le nom ?",
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
        if(!interaction.member.permissions.has(PermissionsBitField.resolve("Administrator"))) return interaction.reply({content: `❌ Vous n'avez pas la permissions de faire cette commande !`})
        
        try {

            let emoji = interaction.options.getString("emoji")?.trim();
            let name = interaction.options.getString("nom");

            if(emoji.startsWith("<") && emoji.endsWith(">")){
                const id = emoji.match(/\d{15,}/g)[0];

                const type = await axios.get(`https://cdn.discordapp.com/emojis/${id}.gif`).then(image => {
                    if(image) return "gif"
                    else return "png"
                }).catch(err => {
                    return "png"
                });

                emoji = `https://cdn.discordapp.com/emojis/${id}.${type}?quality=lossless`
            }

            await interaction.guild.emojis.create({attachment: emoji, name: name}).then(emoji => {
                interaction.reply({content: `Nouveaux émoji ajouter sur le serveur ${emoji.toString()} avec le nom ${emoji.name}`})
            });
            
        } catch (error) {
            console.log('Une erreur est survenue sur la commande emoji-add', error)
        }
    }
}