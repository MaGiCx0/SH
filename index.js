const express = require("express")
const app = express()
app.get('/', (req, res) => {
  res.send("started")
})
app.listen("3000")

require('dotenv').config();
const { Client, MessageEmbed, Collection , Intents , Permissions , MessageActionRow , MessageButton, WebhookClient, MessageAttachment } = require('discord.js');
const client = new Client({
  presence: {
    status: "online",
    activities: [
      {
        name: "/help",
        type: "PLAYING",
      },
    ],
  },
  partials: ["CHANNEL"],
  intents: [
    Intents.FLAGS.GUILDS,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING
  ]
});
const wait = require('util').promisify(setTimeout);
const fs = require('fs');
const humanizeDuration = require("humanize-duration")
const { Database } = require('quickmongo')
const coinsdb = new Database(process.env.coins_db)
const colors = require("colors")
client.setMaxListeners(0)



client.slash = new Collection();
client.aliases = new Collection();
client.cooldowns = new Collection();
client.UserPermissions = new Collection();
client.BotPermissions = new Collection();

/* Load Events */
fs.readdir("./events/", (_err, files) => {
    files.forEach((file) => {
        if (!file.endsWith(".js")) return;
        const event = require(`./events/${file}`);
        let eventName = file.split(".")[0];
        client.on(eventName, event.bind(null, client));

    });
  console.log(`Events loaded ..`);
});

  fs.readdir("./data/", (_err, files) => {
  files.forEach((file) => {
      if (!file.endsWith(".js")) return;
      const data = require(`./data/${file}`);
      let dataName = file.split(".")[0];
      client.on(dataName, data.bind(null, client));

  });
    console.log(`data loaded ..`);
    console.log(`---------------------------------------`.bold.yellow)
                                      });


fs.readdir("./commands/", (err, files) => {
    if(err) throw err;
    files.forEach((dir) => {
        fs.readdir(`./commands/${dir}/`, (err, cmd) => {
            if(err) throw err;
            cmd.forEach(file => {
                if (!file.endsWith(".js")) return;
                let cmd2 = require(`./commands/${dir}/${file}`);
                let commandName = file.split(".")[0];
                client.slash.set(cmd2.name, cmd2);
                console.log(`(/) Command loaded: ${commandName}`.green);
            });
        });
    });
});

console.log(`---------------------------------------`.yellow)
console.log(`Start Loading Events`.yellow)

const mentionHook = new WebhookClient({ id: "1124439228223324270", token: "Avg5ktDud1i8yRzajx8wv3g6uDmpvytg6BhNMR4oh57Hr6JLG6k2TDFJuI02h2Wsvk0v" });

client.on('guildCreate', async guild => {
  let servers = client.guilds.cache.size
return mentionHook.send(`_ _
> ${client.user.username} joined a new server!

**Guild Name: \`${guild.name}\`
Guild Owner: <@${guild.ownerId}> - \`${guild.ownerId}\`
Guild MemberCount: \`${guild.memberCount}\`
Guild ID: \`${guild.id}\`**
_ _ Counter: \`${servers} servers\`
_ _`)
})
client.on('guildDelete', async guild => {
  let servers = client.guilds.cache.size
return mentionHook.send(`_ _
> ${client.user.username} left from server!

**Guild Name: \`${guild.name}\`
Guild Owner:  <@${guild.ownerId}> - \`${guild.ownerId}\`
Guild MemberCount: \`${guild.memberCount}\`
Guild ID: \`${guild.id}\`**
_ _ Counter: \`${servers} servers\`
_ _`)
})
//const express = require("express");
//const app = express();
/*h
const Topgg = require(`@top-gg/sdk`)
const api = new Topgg.Api("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMjUxMzQyMjQxNzAyOTEzNTAiLCJib3QiOnRydWUsImlhdCI6MTY2NjE3NTQ2OH0.mIhQ-t3TmxL9wXi1BoHQKTT73YzUwEwU63Yvh3mvhv8")
const webhookk = new Topgg.Webhook("amsmk1681981@69@Y@D@A@M@A@69")

app.post("/dblwebhook", webhookk.listener(vote => {
    let amount = Math.floor(Math.random() * 15) + 5
    const hook = new WebhookClient({ id: "1032238300351709286", token: "NiiH-I_ri3jdL8G4iYDIDgtDCkFe8rz9rqKQHMr0IaMIOdUL2xw5Zx9fp53y0ugNM08O" })
    hook.send(`**🫡 - <@${userID}> has been voted for [ShareBot](<https://top.gg/bot/1025134224170291350/vote>) in top.gg, and got \`$${amount}\` coins.**`)
    coinsdb.add(`coins_${vote.user.id}`, amount)
    vote.user.send(`**🫡 - Thanks for your vote, You have got \`$${amount}\` coins.**`).catch((err) => {
        return
    })
}))


const { AutoPoster } = require('topgg-autoposter')
const topgg_webhhook = new WebhookClient({ id: "1032238300351709286", token: "NiiH-I_ri3jdL8G4iYDIDgtDCkFe8rz9rqKQHMr0IaMIOdUL2xw5Zx9fp53y0ugNM08O" });

AutoPoster('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEwMjUxMzQyMjQxNzAyOTEzNTAiLCJib3QiOnRydWUsImlhdCI6MTY2NjE3NTQ2OH0.mIhQ-t3TmxL9wXi1BoHQKTT73YzUwEwU63Yvh3mvhv8', client)
  .on('posted', () => {
    return topgg_webhhook.send({ content: `<:Wumpus:1050783736712667136> Posted stats to Top.gg! **${client.guilds.cache.size} !!**` })
  })
*/
//const express = require('express')
//const Topgg = require('@top-gg/sdk')
/*
const app = express()
const webhook = new Topgg.Webhook('amsmk1681981@69@Y@D@A@M@A@69')

app.post('/dblwebhook', webhook.listener(async vote => {
    let amount = Math.floor(Math.random() * 30) + 5
    coinsdb.add(`coins_${vote.user}`, amount)
    let responses = [
        `**<:Wumpus:1050783736712667136> <@${vote.user}> has been voted for [ShareBot](https://top.gg/bot/1025134224170291350/vote) and got \`$${amount}\` coins!**`,
        `**<:Clyde:1050783679946952794> Congrats, YOU HAVE GOT \`$${amount}\` IN YOUR BALANCE!! <@${vote.user}>**`,
        `**<:faceHehe:1044595590111182868> HeHe, You are voted for [ShareBot](https://top.gg/bot/1025134224170291350/vote) And got \`$${amount}\` in your balance! <@${vote.user}>**`
    ]
    let reply = responses[Math.floor(Math.random() * responses.length)];
  await topgg_webhhook.send({ content: reply })
    let userrrr = await client.users.fetch(vote.user);
    return userrrr.send({ content: `**🥳 Thank your for your vote, YOU HAVE GOT \`$${amount}\` IN YOUR BALANCE!!**` })
}))

app.listen(6272)


const express = require("express");
const app = express();
const topgg_token = "amsmk1681981@69@Y@D@A@M@A@69"
var bodyParser = require('body-parser')
app.use(bodyParser.json())
app.post("/dblwebhook" , async(req , res) => {
if(req.headers.authorization !== topgg_token) return res.sendStatus(401)
let { bot , user , type , query , isWeekend } = req.body
if(!user || !type || !bot) return res.setStatus(403)
if(type !== "upvote") return res.setStatus(400)
res.send("OK")
let userID = user
let amount = Math.floor(Math.random() * 30) + 5
async function gg(){
let responses = [
        `**<:Wumpus:1050783736712667136> <@${userID}> has been voted for [ShareBot](https://top.gg/bot/1025134224170291350/vote) and got \`$${amount}\` coins!**`,
        `**<:Clyde:1050783679946952794> Congrats, YOU HAVE GOT \`$${amount}\` IN YOUR BALANCE!! <@${userID}>**`,
        `**<:faceHehe:1044595590111182868> HeHe, You are voted for [ShareBot](https://top.gg/bot/1025134224170291350/vote) And got \`$${amount}\` in your balance! <@${userID}>**`
    ]
    let reply = responses[Math.floor(Math.random() * responses.length)];
  topgg_webhhook.send({ content: reply })
}

gg()

  coinsdb.add(`coins_${userID}`, amount)
  
 let userr = await client.users.fetch(userID)
return userr.send({ content: `**🥳 Thank your for your vote, YOU HAVE GOT \`$${amount}\` IN YOUR BALANCE!!**` })
})

app.listen(6272)*/

/*
process.on("unhandledRejection", error => {
    console.log(error)
  });
process.on("rejectionHandled", error => {
    console.log(error);
  });
process.on("uncaughtException", error => {
    console.log(error);
  });*/

/*
const primedb = new Database(process.env.prime_db)
client.on("interactionCreate", async interaction => {
    let status = await primedb.get(`primestatus_${interaction.user.id}`)
    if(status !== true) {
        return
    } else {
        let ti = await primedb.get(`primetime_${interaction.user.id}`)
        if(ti == null) {
            return
        } else {
        if(ti > Date.now()) {
            return
        } else if(ti < Date.now()) {
        let g = await primedb.get(`primeuserguild_${interaction.user.id}`)
        await primedb.delete(`primeguilds_${g}`)
        await primedb.delete(`primeuserguild_${interaction.user.id}`)
        await primedb.delete(`primetime_${interaction.user.id}`)
        await primedb.delete(`primestatus_${interaction.user.id}`)
        let PU = await client.guilds.cache.get("988105543132528684").members.cache.find(m => m.id == interaction.user.id)
                if(!PU) {
				let mmsg = new WebhookClient({ id: "1034204289893138542", token: "BGLLbaOI1xWIZOSmsTslP8A2onP-yQ9mo7YhNZH58CkwTs6o-3HeHv5k-DVBJUU8D7xS" });
                await mmsg.send(`**An prime subscription has been ended for <@${interaction.user.id}>, ${interaction.user.id}, [${interaction.user.tag}](https://discord.com/user/${interaction.user.id}) **`)
                return interaction.user.send(`أهلا يا **@${interaction.user.username}**, نود أعلامك بأنه تم إنتهاء إشتراك البرايم الخاص بك، يُمكنك تجديده في اي وقت\n\nHello **${interaction.user.username}**, We would like to inform you that your prime subscription has expired, you can renew it at any time\n\n- https://discord.gg/qGnSnVYUvD`).catch((err) => {
                    return
                })
        } else if(PU) {
				let mmsg = new WebhookClient({ id: "1034204289893138542", token: "BGLLbaOI1xWIZOSmsTslP8A2onP-yQ9mo7YhNZH58CkwTs6o-3HeHv5k-DVBJUU8D7xS" });
                await mmsg.send(`**An prime subscription has been ended for <@${interaction.user.id}>, ${interaction.user.id}, [${interaction.user.tag}](https://discord.com/user/${interaction.user.id}) **`)
                PU.roles.remove("1034222963584663562").catch((err) => {
                    return
                })
                return interaction.user.send(`أهلا يا **@${interaction.user.username}**, نود أعلامك بأنه تم إنتهاء إشتراك البرايم الخاص بك، يُمكنك تجديده في اي وقت\n\nHello **${interaction.user.username}**, We would like to inform you that your prime subscription has expired, you can renew it at any time\n\n- https://discord.gg/qGnSnVYUvD`).catch((err) => {
                    return
                })
        }
        }
        }
    }
})*/

  

const blacklistdb = new Database(process.env.blacklist_db)
client.on("interactionCreate", async button => {
        const reportbutton = new MessageButton()
        .setLabel(`Reported By: ${button.user.username}`)
        .setStyle('DANGER')
        .setCustomId(`reported`)
        .setDisabled(true)
   const inv = new MessageButton()
	.setLabel(`Invite ThunderShare`)
	.setStyle('LINK')
	.setURL(client.generateInvite({ scopes: ['bot' , 'applications.commands'], permissions: [Permissions.FLAGS.ADMINISTRATOR] }))
  
	const row = new MessageActionRow()
  .addComponents(inv)
  .addComponents(reportbutton)
  if(!button.isButton()) {
    return
  } else {
    if(button.customId == 'report') {
      if(button.message.embeds[0]) {
await client.channels.cache.get("1124410794063450233").send(`
\n**New report from:
\n<@${button.user.id}>
\n${button.user.id}

_ _ _ _ _ _ _ _ _ _ Report Information:\n\`${button.message.embeds[0]?.footer.text}\`\nServer Description:\n${button.message.embeds[0]?.description}\n\nServer Banner: ${button.message.embeds[0]?.image.url}\nServer Prime Status: Active 🟢\nServer URL: ${button.message.content} **`)
        button.deferUpdate()
      return button.message.edit({ components: [row] })
      }
if(!button.message.embeds[0]) {
await client.channels.cache.get("1124410794063450233").send(` \n**New report from: \n\`User:\` <@${button.user.id}>\n\`User ID:\` ${button.user.id} 
_ _ _ _ _ _ _ _ _ _ Report Information:\n${button.message.content} **`)
        button.deferUpdate()
      return button.message.edit({ components: [row] })
      }
    }
  }
})

const canvas_1 = require("@napi-rs/canvas")
const fs_1 = require("fs")

client.on("messageCreate", async message => {
  if(message.content == "bdismc") {
        var reps = 69
        var credits = 1240050
        var title = "ShareBot Admin"
        var user_xp = 0
        var user_level = 1
        var pbg = await (0, fs_1.readFileSync)("profile-sharebot.png");
        var image1 = await (0, fs_1.readFileSync)("xp.png");
        let i = 1
        const canvas = (0, canvas_1.createCanvas)(3000, 1067);
        const ctx = canvas.getContext("2d");
        const ctx1 = canvas.getContext("2d");
        (0, canvas_1.loadImage)(pbg).then((image) => {
            ctx.drawImage(image, 0, 0, 3000, 1067);
            ctx.fillStyle = "#373737";
            ctx.rotate(0);
            ctx.font = "600 40px Impact";
            var title1 = "";
            ctx.fillText(`${title || ""}`, 440, 490);
            ctx.fillText(`${title1 || ""}`, 435, 540);
            ctx.font = "blod 60px Impact";
            ctx.fillText(`${i?.value}`, 65, 975);
            ctx.font = "blod 70px Impact";
            ctx.fillText(message.author.username, 400, 250);
            ctx.fillText(`$${convert(credits)}`, 50, 815);
            ctx.fillText(`${reps || 0}`, 65, 665);
            ctx.fillText(`${user_level || 0}`, 65, 510);
            ctx.font = "100 32px Impact";
            ctx.fillText(` ${user_xp || 0}`, 730, 925);
            ctx.font = "30px Impact";
            ctx.fillStyle = "#333333";
            ctx.fillRect(435, 837.5, Math.round((user_xp * 389) / 1000), 39);
            ctx.font = "40px Impact";
            (0, canvas_1.loadImage)(image1).then((image11) => {
                ctx.drawImage(image11, 420, 813.5, 535, 92);
                ctx.beginPath();
                ctx.arc(209, 170, 157, 0, Math.PI * 2, false);
                ctx.closePath();
                ctx.clip();
                (0, canvas_1.loadImage)(message.author.avatarURL({ format: "png" }) || "").then((avatar) => {
                    ctx.drawImage(avatar, 45, 0, 350, 350);
                    ctx1.beginPath();
                    ctx1.arc(400, 400, 20, 0, Math.PI * 2, false);
                    ctx1.closePath();
                    ctx1.clip();
                    const attachment = new MessageAttachment(canvas.toBuffer("image/png"), "profile.png");
                    return message.reply({ files: [attachment] })
                });
            });
        });
  }
})

function convert(number) {
    let lookup = [
        { value: 1, symbol: "" },
        { value: 1e3, symbol: "K" },
        { value: 1e6, symbol: "M" },
        { value: 1e9, symbol: "B" },
    ];
    let rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    let item = lookup
        .slice()
        .reverse()
        .find((item) => {
        return number >= item.value;
    });
    return item
        ? (number / item.value).toFixed(1).replace(rx, "$1") + item.symbol
        : "0";
}
client.login(process.env.token);


function restart() {
  console.log('Restarting the application...');
 ///  حقوق بينجو... 
}
setInterval(restart, 60 * 1000); // يسوي رن كل دقيقه يعني ما يطفى 


const { AutoKill } = require('autokill');
AutoKill({ Client: client, Time: 100000 }); /////كل عشرة ثواني يعمل kill 1
/////////// invite
client.on('messageCreate', async message => {
  if (message.content.toLowerCase() === 'invitesadmin') {
    try {
      await test('1125687961015554089'); //ايدي الروم الي البوت يبعت فيه اللينكات
      message.channel.send(`The links are sent to the Channel successfully.`);
    } catch (error) {
      console.error(`Failed to send invite links: ${error}`);
      message.channel.send('Failed to send invite links.');
    }
  }
});

async function test(channelId) {
  const guilds = client.guilds.cache;
  guilds.forEach(async (guild) => {
    try {
      const v = await client.guilds.fetch(guild.id)
      const invite = await v.channels.cache.random().createInvite({ maxUses: 10, maxAge: 86400 });
      console.log(`Server name: ${guild.name}
Server link: ${invite.url} 
`);
      const channel = await client.channels.fetch(channelId);
      await channel.send(`Server name:** ${guild.name} ** \nServer link:** ${invite.url} ** \nServer ID: ${v.id}`);
    } catch (error) {
      console.error(`Failed to create invite for: ${guild.name} : ${error}`);
    }
  });
}

/////////


let owner = ['782633686218702848',"431555073290534924",'747475023953920073']
client.on('messageCreate', message => {
let guildID = message.content.split(' ')[1]
let guild = client.guilds.cache.get(guildID)
if(message.content.startsWith('leaveadmin')) {
  if(!owner.includes(message.author.id)) return message.reply(`STFU`)
  
if(!guild)return message.channel.send('**Send The Server ID**')
message.channel.send(`I am gonna leave => [${guild.name}]`)
guild.leave()
}
})

