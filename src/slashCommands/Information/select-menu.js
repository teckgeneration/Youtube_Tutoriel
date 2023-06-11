const { CommandInteraction, PermissionsBitField, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, Client, SelectMenuBuilder } = require("discord.js");
const config = require("../../config")

module.exports = {
    name: "selectmenu",
    description: "Permet renvoyer un SelectMenu",
    owner: false,

    /**
     * @param {Client} client
     * @param {CommandInteraction} interaction
     */

    run: async (client, interaction, prefix) => {
        if (!interaction.guild.members.me.permissions.has(PermissionsBitField.resolve("SendMessages"))) return interaction.reply({ content: `**❌ Les autorisations actuelles sur ce serveur ne me permettent pas d'utiliser cette commande**`, ephemeral: true }).catch(() => { });

        const Menu = new EmbedBuilder()
        .setTitle("SelectMenu YouTube")
        .setColor("Red")
        .addFields(
            {name: `Youtube`, value: `Renvoie l'embed de Youtube`}
        )
        .setTimestamp()
        .setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`})

        const Youtube = new EmbedBuilder()
        .setTitle("Youtube")
        .setColor("Blue")
        .addFields(
            {name: `Testing Youtubeur`, value: `Je vous invite a rejoindre mon Discord.`}
        )
        .setTimestamp()
        .setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`})

        const Discord = new EmbedBuilder()
        .setTitle("Discord")
        .setColor("Blue")
        .addFields(
            {name: `Discord`, value: `Discord Testeur.`}
        )
        .setTimestamp()
        .setFooter({text: `Demandé par ${interaction.user.username}`, iconURL: `${interaction.user.displayAvatarURL({dynamic: true})}`})

        const componentsMenu = (select) => [
            new ActionRowBuilder().addComponents(
                new SelectMenuBuilder()
                .setCustomId("help-select")
                .setPlaceholder("Merci de selectionner votre choix")
                .setDisabled(select)
                .addOptions([
                    {
                        label: 'Youtube',
                        value: `youtube`,
                        description: 'Permet de renvoyer l\'embed YouTube',
                    },
                    {
                        label: 'Discord',
                        value: `discord`,
                        description: 'Permet de renvoyer le Discord',
                    },
                ])
            )
        ]


        const message = await interaction.reply({embeds: [Menu], components: componentsMenu(false), fetchReply: true})

        const collector = message.createMessageComponentCollector({
            filter: (u) => {
                if(u.user.id === interaction.user.id) return true;
            else{
                return false;
            }
        },
        errors: ["TIME"]
    });

    collector.on("collect", (cld) => {
        if(cld.values[0] === "youtube"){
            cld.update({embeds: [Youtube], components: componentsMenu(false)})
        }
        if(cld.values[0] === "discord"){
            cld.update({embeds: [Discord], components: componentsMenu(false)})
        }
    });


    }
}