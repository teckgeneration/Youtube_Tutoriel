const { EmbedBuilder} = require("discord.js");

module.exports ={
name: "ready",
run: async (client) => {
    console.log(`Le bot ${client.user.username} est désormais en ligne !`);

    //Game
    const statuses = [
        () => `Tutoriel`,
        () => `Youtube`,
    ]
      let i = 0
      setInterval(() => {
        client.user.setStatus('online')
        client.user.setActivity(statuses[i](),)
        i = ++i % statuses.length
      }, 1e4)
 }
}
