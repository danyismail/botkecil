const express = require('express')
const app = express()
const env = require('dotenv').config()
const TeleBot = require('telebot');
const bot = new TeleBot(process.env.BOT_KEY)
const axios = require('axios');
const cheerio = require('cheerio');

const siteUrl = process.env.SITE_URL;
let arrResult = []
let info = ''
let source = `Sumber data berasal dari situs ${process.env.SITE_URL}`

app.listen(process.env.PORT || 5000, () => console.log(`botkecil listening on port ${process.env.PORT}!`))

app.get('/', (request, response) => response.send('Bot kecil aktif'))

axios(siteUrl)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);

        $('div.fusion-column-wrapper > div.fusion-text').find('strong').each(function(i){
            arrResult.push($(this).text())
          })
        info = `
        Global
        Negara / Kawasan : ${arrResult[3]}
        Kasus Terkonfirmasi : ${arrResult[4]}
        Kesembuhan : ${arrResult[5]}
        Kematian : ${arrResult[6]}

        Indonesia
        Positif : ${arrResult[8]}
        Sembuh : ${arrResult[9]}
        Meninggal : ${arrResult[10]}
        `
        //console.log(info)
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

