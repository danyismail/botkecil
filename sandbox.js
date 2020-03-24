const TeleBot = require('telebot');
const env = require('dotenv').config()
const bot = new TeleBot(process.env.BOT_KEY)
const axios = require('axios');
const cheerio = require('cheerio');

const siteUrl = process.env.SITE_URL;

let arr =[]

axios(siteUrl)
      .then(response => {
        console.log('masuk then');
        
        const html = response.data;
        const $ = cheerio.load(html);
        $('div.fusion-column-wrapper > div.fusion-text').find('strong').each(function(i){
            console.log('masuk sini',i);
            arr.push($(this).text())
          })
          console.log(arr)
      })
      .catch(console.error);
bot.on('/covid19', (msg) => msg.reply.text(info + '\n' + source));

bot.start();