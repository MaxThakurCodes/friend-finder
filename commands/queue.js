const users = require("../models/user");
const Discord = require("discord.js");
module.exports = {
  name: "queue",
  aliases: ["q"],
  description: "Check the queue",
  async execute(client, message, args) {
    let embed = new Discord.MessageEmbed()
      .setTitle("The current queue")
      .setColor([
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
        Math.floor(Math.random() * 256),
      ])
      .setFooter(message.author.tag, message.author.avatarURL());
    let curQueue = await users.find({});
    embed.addField("Current queue length:", curQueue.length);
    for (let i = 0; i < curQueue.length; i++) {
      if (curQueue[i].uid === message.author.id) {
        embed.addField(
          "Your place in the queue:",
          `You are in \`${i + 1}\` out of \`${curQueue.length}\``
        );
      }
    }
    message.channel.send(embed);
  },
};
