const user = require("../models/user");
const convo = require("../models/convo");
const { prefix } = require("../config.json");
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
      if (i.u1 === message.author.id) {
        incall = true;
      } else if (i.u2 === message.author.id) {
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
      try {
        user1.send(
          `You've been connected with \`${user2.tag}\`; Their id is: \`${user2.id}\`, please be nice. If you would like to report anyone please join the discord: https://discord.gg/hBfmxVt and report their id to the Co-Owner or higher.`
        );
        user2.send(
          `You've been connected with \`${user1.tag}\`; Their id is: \`${user1.id}\`, please be nice! If you would like to report anyone please join the discord: https://discord.gg/hBfmxVt and report their id to the Co-Owner or higher.`
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
