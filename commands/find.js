const user = require("../models/user");
const convo = require("../models/convo");
const { prefix } = require("../config.json");
const fs = require("fs");
module.exports = {
  name: "find",
  aliases: ["f", "ff"],
  description: "find a friend!",
  async execute(client, message, args) {
    let notFound = true;
    let dbUser = await user.find({});
    let curConvos = await convo.find({});
    let inqueue = false;
    let incall = false;
    let errored = false;
    dbUser.forEach((input) => {
      if (input.uid === message.author.id) {
        inqueue = true;
      }
    });
    curConvos.forEach((i) => {
      if (i.u1 === message.author.id || i.u2 === message.author.id) {
        incall = true;
      }
    });
    if (inqueue === true) {
      return message.reply(
        `You're already in the queue, run \`${prefix}leave\` to leave the queue.`
      );
    } else if (incall === true) {
      return message.reply(
        `You're already in a call. Please run \`${prefix}hangup\` to end the call.`
      );
    }
    if (notFound === true) {
      let userObject = new user({
        uid: message.author.id,
        username: message.author.username,
      });
      await message.author.send("I added you to the queue!").catch((err) => {
        if (err.message === "Cannot send messages to this user") {
          message.reply(
            "It appears you're DMs are off. Please turn them on, and then retry the command."
          );
          return (errored = true);
        }
      });
      if (errored !== true) {
        await userObject.save();
      }
    }
    let dbuser = await user.find({});
    if (dbuser.length >= 2) {
      let convoObject = convo({
        u1: dbuser[0].uid,
        u2: dbuser[1].uid,
      });
      let user1 = client.users.cache.get(dbuser[0].uid);
      let user2 = client.users.cache.get(dbuser[1].uid);
      let today = new Date();
      let date =
        today.getFullYear() +
        "-" +
        (today.getMonth() + 1) +
        "-" +
        today.getDate();
      let time =
        today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
      let dateTime = date + " " + time;
      let data = `\nDate: ${dateTime}\n----------------------------------------------------------------------------------------------------------------\n`;
      try {
        fs.appendFile(
          `./logs/DMu1${user1.id}u2${user2.id}.txt`,
          data,
          (err) => {
            if (err) {
              console.log(err);
            }
          }
        );
        user1.send(
          `You've been connected with \`${user2.tag}\`; If think they broke a rule please use this command to report them. \`=report ${user2.id} DMu1${user1.id}u2${user2.id}.txt (The reason why you reported them)\`*NOTE: You're messages are logged then deleted after 12 hours if there is no report for any of your messages*`
        );
        user2.send(
          `You've been connected with \`${user1.tag}\`; If think they broke a rule please use this command to report them. \`=report ${user1.id} DMu1${user1.id}u2${user2.id}.txt (The reason why you reported them)\` *NOTE: You're messages are logged then deleted after 12 hours if there is no report for any of your messages*`
        );
      } catch {
        message.reply("There was an error please try again.");
      }
      await convoObject.save();
      dbuser.forEach((f) => {
        user.findOneAndDelete({ uid: f.uid }, (err) => {
          if (err) {
            console.log(err);
          }
        });
      });
    }
  },
};
