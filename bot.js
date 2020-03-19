const env = require('dotenv').config()
const TeleBot = require('telebot');
const bot = new TeleBot(process.env.BOT_KEY)
const axios = require('axios');
const cheerio = require('cheerio');

const siteUrl = "https://www.covid19.go.id/";

let result = ''
let arrResult = []
let foreignData = ''
let localData = ''
let source = 'Sumber data berasal dari https://www.covid19.go.id/'
axios(siteUrl)
      .then(response => {
        const html = response.data;
        const $ = cheerio.load(html);
        result = $('.fusion-text p').each(function(){
          arrResult.push($(this).text())
        })
      })
      .catch(console.error);

bot.on('/covid19', (msg) => msg.reply.text(foreignData + '\n' +  localData + '\n' + source));

bot.start();