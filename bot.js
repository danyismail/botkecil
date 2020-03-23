const express = require('express')
const app = express()
const env = require('dotenv').config()
const TeleBot = require('telebot');
const bot = new TeleBot(process.env.BOT_KEY)
const axios = require('axios');
const cheerio = require('cheerio');

const siteUrl = process.env.SITE_URL;
arrResult = []
dataGLobal = []
dataLokal = []
valDataGLobal = []
valDataLokal = []
info = ''
let source = `Sumber data berasal dari situs ${process.env.SITE_URL}`

axios(siteUrl)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        $('p').each(function(){
          arrResult.push($(this).text())
        })
        dataGLobal = arrResult[5].split(' ')
        console.log(dataGLobal)
        dataLokal = arrResult[6].split(' ')
        valDataGLobal.push(dataGLobal[4])
        valDataGLobal.push(dataGLobal[7])
        valDataGLobal.push(dataGLobal[9])
        valDataGLobal.push(dataGLobal[11])
        valDataLokal.push(dataLokal[2])
        valDataLokal.push(dataLokal[4])
        valDataLokal.push(dataLokal[6])
        info = `
        Global
        Negara / Kawasan : ${valDataGLobal[0]}
        Kasus Terkonfirmasi : ${valDataGLobal[1]}
        Kesembuhan : ${valDataGLobal[2]}
        Kematian : ${valDataGLobal[3]}

Indonesia
        Positif : ${valDataLokal[0]}
        Sembuh : ${valDataLokal[1]}
        Meninggal : ${valDataLokal[2]}
        `
        console.log(info)
      })
      .catch(console.error);
bot.on('/covid19', (msg) => msg.reply.text(info + '\n' + source));

bot.start();

var http = require('http'); //importing http

function startKeepAlive() {
    setInterval(function() {
        var options = {
            host: 'botkecil.herokuapp.com',
            port: 80,
            path: '/'
        };
        http.get(options, function(res) {
            res.on('data', function(chunk) {
                try {
                    // optional logging... disable after it's working
                    console.log("HEROKU RESPONSE: " + chunk);
                } catch (err) {
                    console.log(err.message);
                }
            });
        }).on('error', function(err) {
            console.log("Error: " + err.message);
        });
    }, 20 * 60 * 1000); // load every 20 minutes
}

startKeepAlive();

app.get('/', (request, response) => response.send('Bot kecil aktif'))

app.listen(process.env.PORT || 5000, () => console.log(`botkecil listening on port ${process.env.PORT}!`))
