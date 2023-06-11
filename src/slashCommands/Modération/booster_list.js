const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder, ApplicationCommandOptionType, ChannelType } = require("discord.js");

module.exports = {
    name: "booster-list",
    description: "Permet de voir la liste des boosts sur le serveur",
    owner: false,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve('SendMessages'))) return interaction.reply({ content: `**❌ Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande**`, ephemeral: true }).catch(() => { });
        if(!interaction.member.permissions.has(PermissionsBitField.resolve('SendMessages'))) return interaction.reply({content: `❌ Vous n'avez pas la permissions de faire cette commande !`})
        
        try {

            const booster = interaction.guild.members.cache.filter(member => member.premiumSince).map(m => `<@${m.user.id}>`).join("\n") || "Aucun Utilisateur";

            if(booster > 1000) return interaction.reply({content: `L'embed est trop long a renvoyer`, ephemeral: true}); 

            const embed = new EmbedBuilder()
            .setTitle("Listing des boosts")
            .setDescription(`${booster}`)
            .setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`})

            return interaction.reply({embeds: [embed]})
          
        } catch (error) {
            console.log('Une erreur est survenue sur la commande booster-list', error)
        }
    }
}