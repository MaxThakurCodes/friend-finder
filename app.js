const fs = require('fs')
const Discord = require('discord.js')
const { prefix, token } = require('./config.json')
const { deniedIds } = require('./deinedaccess.json')
const dmMessage = require('./events/dmMessage')
const blockList = require('./models/blocklist')
require('dotenv').config()

const mongoose = require('mongoose')
mongoose
  .connect(process.env.mongouri, {
    useNewUrlParser: true,
    useFindAndModify: false,
    useUnifiedTopology: true
  })
  .then(c => console.log('connected to mongodb'))
const db = mongoose.connection

const client = new Discord.Client()
client.commands = new Discord.Collection()

const commandFiles = fs
  .readdirSync('./commands')
  .filter(file => file.endsWith('.js'))

for (const file of commandFiles) {
  const command = require(`./commands/${file}`)
  client.commands.set(command.name, command)
}

client.once('ready', () => {
  console.log('Ready!')
  client.user.setActivity('with friends', { type: 'PLAYING' })
  client.user.setStatus('online')
})
db.once('open', () => {
  client.on('message', async message => {
    if (message.channel.type === 'dm') {
      dmMessage.newMessage(client, message)
    }
    if (!message.content.startsWith(prefix) || message.author.bot) return
    let user = await blockList.findOne({})
    if (user.user.uid === msg.author.id) {
      return msg.reply(
        `Your id has been added to the blocked list with the reason: \`${user.user.reason}\`, please join https://discord.gg/Ts3n43N if you believe this was a mistake.`
      )
    }
    const args = message.content
      .slice(prefix.length)
      .trim()
      .split(/ +/)
    const commandName = args.shift().toLowerCase()

    const command =
      client.commands.get(commandName) ||
      client.commands.find(
        cmd => cmd.aliases && cmd.aliases.includes(commandName)
      )

    if (!command) return
    try {
      command.execute(client, message, args)
    } catch (error) {
      console.error(error)
      message.reply('there was an error trying to execute that command!')
    }
  })
})

client.login(process.env.TOKEN)
