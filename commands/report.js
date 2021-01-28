const Discord = require("discord.js"),
  convo = require("../models/convo"),
  config = require("../config.json");

module.exports = {
  name: "report",
  aliases: ["r"],
  description: "report a person who is breaking the rules.",
  async execute(client, message, args) {
    if(config.mainGuild === "MainGuildIDHere") return console.log("Yo check config.json");
    if(config.reportChannel === "ReportChannelIDHere") return console.log("Yo check config.json");
    if (!args[0]) {
      return sendexample(
        "(id)",
        "(The file name that was provided)",
        "(reason)"
      );
    } else if(/^\d+$/.test(args[1]) === false) {
      return sendexample(
        "(id)",
        "(The file name that was provided)",
        "(reason)"
      );
    }
    if (!args[1]) {
      return sendexample(
        args[0],
        "(The file name that was provided)",
        "(reason)"
      );
    }
    if (!args[2]) {
      return sendexample(args[0], args[1], "(reason)");
    }
    let uid = args[0];
    let pfn = args[1];
    let preason = args.slice(2).join(" ");
    report(uid, pfn, preason);
    message.reply("Reported sucessfully!");
    function sendexample(id, fn1, ureason) {
      return message.reply(
        `Trying doing it this way: \`=report ${id} ${fn1} ${ureason}\``
      );
    }
    async function report(id, fn, reason) {
      let reportChannel = client.guilds.cache
        .get(config.mainGuild)
        .channels.cache.get(config.reportChannel);
      let t = id;
      if(id.includes("<@!")){
        t = await t.replace("<@!", "");
        
      } else if(id.includes("<@")) {
        t = await t.replace("<@", "");
      }
      if(id.includes(">")) {
        t = await t.replace(">", "");
      }
      let reportedUser = await client.users.fetch(t);
      if (reportedUser === null) {
        return message.reply("I can't seem to find a user with that id.");
      }
      let rembed = new Discord.MessageEmbed()
        .setTitle("Report")
        .addField("Filename:", fn)
        .setColor("#E74C3C")
        .addField("User Reporting:", "‎")
        .addField("Id:", message.author.id)
        .addField("Username: ", message.author.username, true)
        .addField("Tag:", message.author.discriminator, true)
        .addField("User Being Reported:", "‎")
        .addField("Id:", t, false)
        .addField("Username: ", reportedUser.username, true)
        .addField("Tag:", reportedUser.discriminator, true)
        .addField("Reason:", reason)
        .setFooter(message.author.tag, message.author.avatarURL())
        .setTimestamp();
      reportChannel.send(rembed);
    }
  },
};
