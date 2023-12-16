const fs = require('node:fs');
const path = require('node:path');
const {Client, Collection, Events, GatewayIntentBits, ActivityType} = require('discord.js');

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildModeration,
    ]
});

// Login Process
const dotenv = require('dotenv');
dotenv.config();
client.login(process.env.DISCORD_TOKEN);

client.on("ready", () => {
    console.log("Bot Is Running");
})

client.once('ready', () => {
    client.user.setStatus('dnd'),
    client.user.setPresence({
        activities: [{name: "meatmeatmeatmeatmeatmeatmeatmeatmeatmeatmeatmeatmeat", type: ActivityType.Playing}]
    });
});



/////////////////////////////////
///           MEAT            /// // Responsible for bullying any users who have been put in the servers time-out text channel.
/////////////////////////////////

const MeatImages = []; // Array of funny meat images
    MeatImages[0]= "https://64.media.tumblr.com/ee15586dab162e6455a8bd17e46de6db/8aa6ec497162d87b-8b/s400x600/f88a55fe902938b6479f577e74278914f26bc08c.jpg"
    MeatImages[1]= "https://pbs.twimg.com/media/CytPbY-WIAUZB4p.jpg"
    MeatImages[2]= "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS4STh_yCnhb0vT_FnO1FCCRMFErJT0_7BNwA&usqp=CAU"
    MeatImages[3]= "https://preview.redd.it/1sjigqqb8lm71.jpg?auto=webp&s=6791891682cf6ffbd62e2d52d9a2c0d7febfd031"
    MeatImages[4]= "https://i.redd.it/q7qxei1mg7551.jpg"
    MeatImages[5]= "https://64.media.tumblr.com/be4939d459a2a6861f5f2bf3b937ffa0/f84bc62933c25b3e-32/s500x750/b5ea47885311d467cd0f1be333dfc05b65855921.png"
    MeatImages[6]= "https://images3.memedroid.com/images/UPLOADED356/6099d93f10711.jpeg"
    MeatImages[7]= "https://media.tenor.com/oIkyh_1Dw2MAAAAM/salt-bae-nusret-g%C3%B6k%C3%A7e.gif"
    MeatImages[8]= "https://media.discordapp.net/attachments/836537253030526998/897164628767932486/image0.jpg?width=683&height=683"
    MeatImages[9]= "https://media.tenor.com/C8MpzwDxl40AAAAM/ltg-low-tier-god.gif"
    MeatImages[10]= "https://i.kym-cdn.com/photos/images/original/002/339/616/255.jpg"
    MeatImages[11]= "https://images3.memedroid.com/images/UPLOADED434/6122284256a69.jpeg"
    MeatImages[12]= "https://i.redd.it/wzj02fns78s21.jpg"

const MeatPuns = []; // Array of shitty ChatGPT meat puns from Camina
    MeatPuns[0]= "Why did the steak get arrested? It was caught *grill-ty* as charged!"
    MeatPuns[1]= "The steak couldn't escape its fate; it was *sirloin* behind bars!"
    MeatPuns[2]= "What did the steak say to the chef in prison? *I'm done, well-done, that is!*"
    MeatPuns[3]= "Why did the steak refuse to escape from jail? It didn't want to *t-bone* a fugitive!"
    MeatPuns[4]= "Did you hear about the steak that became a jailbird? It got involved in some *prime rib*ery!"
    MeatPuns[5]= "The steak tried to break out of prison but got caught in a *meat-lock*."
    MeatPuns[6]= "What did the steak say to its fellow inmates? *We're all in this porter-house together!*"
    MeatPuns[7]= "*grill*ty as charged"

client.on("messageCreate", message => { // When lockered person sends msg in Meatlocker, will send a meat image and meat pun into the locker, reply @'ing them
    if(message.channel.id === "1047425498734678097"){
        if(message.member.roles.cache.has("876619639323525190")){
            var MeatImgRNG = Math.floor(Math.random() * 12);
            var MeatPunRNG = Math.floor(Math.random() * 7);
            //console.log(MeatImgRNG) // Debug line
            //console.log(MeatPunRNG) // Debug line
            message.reply(MeatImages[MeatImgRNG]);
            message.reply(MeatPuns[MeatPunRNG]);
        }
    }
});

/////////////////////////////////
///    PINGRESPONSE MODULE    /// // Responsible for bullying any users that ping the bot. Because why the fuck not.
/////////////////////////////////

const PingResponses = []; // Array of responses for if the bot is pinged.
    PingResponses[0]= "Don't fucking ping me, creature."
    PingResponses[1]= "You should've died at birth."
    PingResponses[2]= "Get a Job."
    PingResponses[3]= "You will never feel the Holy Light of Allah upon your soul."
    PingResponses[4]= "https://media.tenor.com/C8MpzwDxl40AAAAM/ltg-low-tier-god.gif"
    PingResponses[5]= "https://media1.tenor.com/m/HW1HwFzU3HEAAAAd/kill-people.gif"

client.on("messageCreate", message => { // When bot is pinged, check if user has lobotomized role, and send specific response if true. Else will send random insult response and have a chance to timeout.
    if (message.mentions.has(client.user)){
        if (message.member.roles.cache.has("1003685931754209490")){
            message.member.timeout(5 * 60 * 1000, 'Timed out for pinging the bot while lobotomized'); // People with Lobotomite role always get timed out.
            message.reply("This Lobotomite got timed out lmao.");
        } else {
            var ResponseRNG = Math.floor(Math.random() * 5);
            message.reply(PingResponses[ResponseRNG]);

            var TimeoutChance = Math.floor(Math.random() * 4); // One in Five chance of being timed out per ping.
            if (TimeoutChance == 2){
                message.member.timeout(5 * 60 * 1000);
                message.reply("Dumb egg got timed out.");
            }
        }
    }
})

/////////////////////////////////
///JOIN / LEAVE LOGGING MODULE/// // Responsible for welcoming or saying goodbye to users who join/leave the server. Also logs joins/leaves in the admin channels.
/////////////////////////////////

client.on("guildMemberAdd", member => { // Detects a member joining the server and reports it in the Moderator section // UPDATE // Also adds the member role
    const ReportChannel = member.guild.channels.cache.get("947646342191271966");
    const MemberUsername = member.user.username
    const MemberID = member.user.id
    const MemberRole = member.guild.roles.cache.get("849230824863170571");
    ReportChannel.send(":arrow_forward: <@" + MemberID + "> joined the server. Username is " + MemberUsername);
    member.roles.add(MemberRole);

    // Sends a random funi welcome message to #general_public
    const GenPubChannel = member.guild.channels.cache.get("1136582618008277092");
    const JoinMessages = [];
        JoinMessages[0]= ":arrow_forward: Welcome to the Aryx Madhouse, <@" + MemberID + ">. Good luck."
        JoinMessages[1]= ":arrow_forward: <@" + MemberID + "> joined the Madhouse, L"
        JoinMessages[2]= ":arrow_forward: Welcome to the Squamhouse, <@" + MemberID + ">, we've got fun and games..."
        JoinMessages[3]= ":arrow_forward: <@" + MemberID + "> joined the fray. Ignore ikkle, we all do."
        JoinMessages[4]= ":arrow_forward: Welcome to the Talyn Modhouse, citizen <@" + MemberID + ">, sign up for the Slugga role today!"
        JoinMessages[5]= ":arrow_forward: <@" + MemberID + "> has joined the cesspit. Pay homage to <@295950633184526337>, the Lord of Cheese."
        JoinMessages[6]= ":arrow_forward: Welcome to the Aryx Modhouse, <@" + MemberID + ">. (Hint: Use the /alucard command!!!!!)"
        JoinMessages[7]= ":arrow_forward: Hello <@" + MemberID + ">, welcome to the worst server on Discord."
        JoinMessages[8]= ":arrow_forward: Hello Comrade <@" + MemberID + ">, welcome to Best Korea."
        JoinMessages[9]= ":arrow_forward: Look at this mf <@" + MemberID + ">, goofy ahh joined this server of all servers..."
        JoinMessages[10]= ":arrow_forward: Welcome to the modhouse, <@" + MemberID + ">. Please note, it is mandatory to send the staff team pizzas upon being doxxed."

    var JoinMessageRNG = Math.floor(Math.random() * 10);

    GenPubChannel.send(JoinMessages[JoinMessageRNG]);

    if (member.user.id == "96680642787446784") { // Informs the server to bully Captain Jack if he joins the discord server :wholesome:
        GenPubChannel.send("Captain Jack just joined the server lmao, crease his jordans.");
    };
})

client.on("guildMemberRemove", member => { // Detects a member leaving the server and reports it in the Moderator section
    const ReportChannel = member.guild.channels.cache.get("947646342191271966");
    const MemberUsername = member.user.username
    const MemberID = member.user.id
    ReportChannel.send(":arrow_backward: <@" + MemberID + "> left the server. Username is " + MemberUsername);

    // Sends a random funi "member left" message to #general_public
    const GenPubChannel = member.guild.channels.cache.get("1136582618008277092");
    const LeaveMessages = [];
        LeaveMessages[0]= ":arrow_backward: <@" + MemberID + "> left the server. Probably a good decision tbh."
        LeaveMessages[1]= ":arrow_backward: <@" + MemberID + "> couldn't handle the Modhouse Style. Later slugga..."
        LeaveMessages[2]= ":arrow_backward: <@" + MemberID + "> was NOT built for these fields."
        LeaveMessages[3]= ":arrow_backward: <@" + MemberID + "> left the Modhouse. They probably went to Captain Jacks..."
        LeaveMessages[4]= ":arrow_backward: <@" + MemberID + "> left the Modhouse. Laugh at this user."
        LeaveMessages[5]= ":arrow_backward: <@" + MemberID + "> Exploded."
        LeaveMessages[6]= ":arrow_backward: <@" + MemberID + "> was obliterated by Mitthrawn (collateral damage)."
        LeaveMessages[7]= ":arrow_backward: <@" + MemberID + "> was vaporised by <@295950633184526337> for not being a Cheddar Connoisseur"
        LeaveMessages[8]= ":arrow_backward: <@" + MemberID + "> was exploded by <@565261827789815808> for using Cilit Bang instead."
        LeaveMessages[9]= ":arrow_backward: ذهب الله لأنه <@" + MemberID +">."
        LeaveMessages[10]= ":arrow_backward: <@" + MemberID + "> had their Jordans creased."

    var LeaveMessageRNG = Math.floor(Math.random() * 10);
    
    GenPubChannel.send(LeaveMessages[LeaveMessageRNG]);
})

/////////////////////////////////
///         COMMANDS          /// // Code to enable commands in the server.
/////////////////////////////////

client.commands = new Collection();

const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    if ('data' in command && 'execute' in command) {
        client.commands.set(command.data.name, command);
    } else {
        console.log(` // WARNING // The command at ${filepath} is missing a required "data" or "execute" property.`);
    }
}

client.on(Events.InteractionCreate, interaction => {
    if (!interaction.isChatInputCommand()) return;
    console.log(`Command used: (${interaction.commandName})`);
})

client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = interaction.client.commands.get(interaction.commandName);

    if (!command) {
        console.error(`No command matching ${interaction.commandName} was found.`);
        return;
    }

    try {
        await command.execute(interaction);
    } catch (error) {
        console.error(error);
        if (interaction.replied || interaction.deferred) {
            await interaction.followUp({ content: 'There was an error while executing this command!', ephemeral: true});
        } else {
            await interaction.reply({ conent: 'There was an error while executing this command!', ephemeral: true});
        }
    }

    
});