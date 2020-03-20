const express = require('express')
const app = express()
const env = require('dotenv').config()
const TeleBot = require('telebot');
const bot = new TeleBot(process.env.BOT_KEY)
const axios = require('axios');
const cheerio = require('cheerio');

const siteUrl = process.env.SITE_URL;

let result = ''
let arrResult = []
let foreignTitle = ''
let localTitle = ''
let foreignData = ''
let localData = ''
let source = `Sumber data berasal dari situs ${process.env.SITE_URL}`
axios(siteUrl)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        result = $('.fusion-text p').each(function(){
          arrResult.push($(this).text())
        })
        foreignTitle =  arrResult[0].substring(0,23) + ' : ' + '\n'
        foreignData =  arrResult[0].substring(24) + '\n'
        localTitle =  arrResult[1].substring(0,10) + ' : ' + '\n'
        localData =  arrResult[1].substring(10) + '\n'
      })
      .catch(console.error);

bot.on('/covid19', (msg) => msg.reply.text(foreignTitle + foreignData + localTitle + localData + source));

bot.start();

app.get('/', (req, res) => res.send('Bot kecil aktif'))

app.listen(process.env.PORT || 5000, () => console.log(`botkecil listening on port ${process.env.PORT}!`))