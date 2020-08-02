const user = require("../models/user");
module.exports = {
  name: "leave",
  aliases: ["leave"],
  description: "Leaves the queue to find a friend.",
  async execute(client, message, args) {
    let inqueue = false;
    let curUsers = await user.find({});
    for (i = 0; i <= curUsers.length; i++) {
      if (curUsers[i] !== undefined) {
        if (curUsers[i].uid === message.author.id) {
          inqueue = true;
        }
      }
    }
    if (inqueue === true) {
      await user.findOneAndDelete({ uid: message.author.id }, (err) => {
        if (err) {
          console.log(err);
        }
      });
      message.reply("removed you from the queue.");
    } else {
      message.reply("You aren't in the queue.");
    }
  },
};
