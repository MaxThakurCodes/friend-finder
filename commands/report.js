const Discord = require("discord.js"),
  convo = require("../models/convo");

module.exports = {
  name: "report",
  aliases: ["r"],
  description: "report a dumb bitch",
  async execute(client, message, args) {
    let curConvo = await convo.find({});
    let ruser;
    for (let i = 0; i < curConvo.length; i++) {
      if (curConvo[i].u1 === message.author.id) {
        ruser = curConvo[i].u2;
      }
      if (curConvo[i].u2 === message.author.id) {
        ruser = curConvo[i].u1;
      }
      var filename = `DMu1${curConvo[i].u1}u2${curConvo[i].u2}.txt`;
    }
    if (!args[0]) {
      return sendexample("(reason)");
    }
    let uid = ruser;
    let reason = args.join(" ");
    report(uid, filename, reason);
    message.reply("Reported sucessfully!");
    function sendexample(reason) {
      return message.reply(`Trying doing it this way: \`=report ${reason}\``);
    }
    async function report(id, fn, reason) {
      let reportChannel = client.guilds.cache
        .get("721974664628535317")
        .channels.cache.get("739399301372968990");
      let reportedUser = client.users.cache.get(id);
      if (reportedUser === null) {
        return message.reply("I can't seem to find a user with that id.");
      }
      let rembed = new Discord.MessageEmbed()
        .setTitle("Report")
        .addField("Filename:", fn)
        .setColor("#E74C3C")
        .addField("User Reporting:", "‎")
        .addField("Id:", message.author.id, true)
        .addField("Tag:", `<@${message.author.id}>`, true)
        .addField("User Being Reported:", "‎")
        .addField("Id:", id, true)
        .addField("Tag:", `<@${id}>`, true)
        .addField("Reason:", reason)
        .setFooter(message.author.tag, message.author.avatarURL())
        .setTimestamp();
      reportChannel.send(rembed);
    }
  },
};
