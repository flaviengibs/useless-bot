const { Client, GatewayIntentBits } = require('discord.js');
require('dotenv').config();

const keepAlive = require('./server'); // Importer le fichier server.js

const client = new Client({
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent
    ]
});

client.once('ready', () => {
    console.log(`Logged in as ${client.user.tag}!`);
    client.user.setActivity("être inutile :D");
});




var saidBonjour = false;
var saidYesBonjour = false;
var saidNoYesBonjour = false;
var saidWhyNoYesBonjour = false;
var stopParler = false;
const TARGET_CHANNEL_NAME = 'useless-bot';
client.on('messageCreate', message => {
    console.log(`Message received: ${message.content}`);
    console.log(`Message channel: ${message.channel.name}`);
    if (message.author.bot) return;
    if (message.channel.name !== TARGET_CHANNEL_NAME){
        return;
    }else{
        const content = message.content.toLowerCase();
        if (content.includes('bonjour')) {
            message.channel.send('Bonjour ! Je suis le bot le plus inutile de la planète ! Est ce que vous allez bien ?');
            saidBonjour = true;
        }else if(content.includes('oui') && saidBonjour == true) {
            message.channel.send("C'est bon à savoir !");
            saidBonjour = false;
            saidYesBonjour = true;
        }else if (content.includes ('non') && saidYesBonjour == true){
            message.channel.send("Ok, tu n'auras pas de potion magique si c'est comme ça.");
            saidYesBonjour = false;
            saidNoYesBonjour = true;
        }else if(content.includes('pourquoi') && saidNoYesBonjour == true){
            message.channel.send("Parce que tu es un vilain garçon !");
            saidNoYesBonjour = false;
            saidWhyNoYesBonjour = true;
        }else if(content.includes("c'est faux") && saidWhyNoYesBonjour == true || content.includes("non") && saidWhyNoYesBonjour == true ||content.includes("c'est pas vrai") && saidWhyNoYesBonjour == true){
            message.channel.send("Si si c'est vrai même que t'as pas de preuves ! C'est ma maman qui l'a dit et ma maman elle a toujours raison ! Et puis même que j'en ai marre de parler avec toi. Je te parle plus !")
            saidWhyNoYesBonjour = false;
            stopParler = true;
        }else if(content.includes("!reinit")){
            var saidBonjour = false;
            var saidYesBonjour = false;
            var saidNoYesBonjour = false;
            var saidWhyNoYesBonjour = false;
            var stopParler = false;
        }else if(stopParler == true) {
            message.channel.send("Je te parle plus, espèce de vilain garçon que ma maman a dit qu'il était vilain et que même elle a toujours raison !")
        
        }else {
            message.channel.send("Va voir ailleurs si j'y suis !");
            saidBonjour = false;
        }
    }
});

keepAlive(); // Garder le serveur actif
client.login(process.env.DISCORD_TOKEN);
