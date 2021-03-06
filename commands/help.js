const Discord = require("discord.js");

module.exports = {
  name: "help",
  aliases: ["h"],
  description: "help",
  async execute(client, message, args) {
    let embed = new Discord.MessageEmbed()
      .setColor("#7289DA")
      .setTitle("Friend Finder Commands")
      .setThumbnail(
        "https://media.discordapp.net/attachments/692939815750205440/739307988497596456/image0.png"
      )
      .addField("find", "Connect with a person and find someone to chat with!")
      .addField(
        "hangup",
        "End the chat with the person you are connected with."
      )
      .addField("info", "Information on the bot.")
      .addField("leave", "Leave the queue and find another friend.")
      .addField(
        "report",
        "Report people who are doing bad things with the bot."
      );
    message.channel.send(embed);
  },
};
