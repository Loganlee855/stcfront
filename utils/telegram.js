const axios = require('axios');
const { GameList } = require("../models");
const chatId = '-1002527332074';
const token = '7587542526:AAHyOc-bWJz_nrEX1m_EMmZ0WpZmhcSuEPQ';
const telegramApiUrl = `https://api.telegram.org/bot${token}/`;
const path = require('path');
const { v4: uuidv4 } = require('uuid');
const mime = require('mime-types');
require('dotenv').config();

async function sendError(error,message,route) {
  try {
    const stackTrace = error.stack.split('\n')[1];
    const filePath = stackTrace.match(/\((.*):\d+:\d+\)/);
    const fileName = filePath ? filePath[1].split('/').pop() : 'Unknown file';
    const line = stackTrace.match(/:(\d+):\d+/);
    const lineNumber = line ? line[1] : 'Unknown line';

    const formattedMessage = `
      <b>⚠️ ERROR ALERT ⚠️</b>
      <pre><b>Date</b>: ${new Date().toLocaleString()}

<b>Message</b>: ${message}

<b>Error Messsage</b>: ${error.message}

<b>Route</b>: ${route}

<b>File Path</b>: ${fileName}

<b>Line</b>: ${lineNumber}</pre>
Please check boss....`;

    await axios.post(`${telegramApiUrl}sendMessage`, {
      chat_id: chatId,
      text: formattedMessage,
      parse_mode: 'HTML',
    });
  } catch (error) {
    console.error('Error sending message:', error);
  }
}

async function updateGameImages() {
  try {
    const games = await GameList.findAll();

    if (games.length === 0) {
      console.log(`No games found for`);
      return;
    }

    console.log(`Found ${games.length} games`);

    let msgs = [];
    const today = new Date().toLocaleString('en-US', {
      timeZone: 'Asia/Jakarta',
    }).split(',')[0];
    for (const game of games) {
      const { game_code, provider_code ,updatedAt} = game;
      const gameUpdatedDate = new Date(updatedAt).toLocaleString('en-US', {
        timeZone: 'Asia/Jakarta',
      }).split(',')[0];
      if (gameUpdatedDate === today) {
        continue;
      }
      let url = `${game.game_image}`;
      const data = await uploadFileFromUrlToS3(url, `game_pic/i`, '');
      await game.update({ game_image: data });

      msgs.push(`${game.game_name}: ${data}`);
    }
    let fullMessage = msgs.join('\n');
    async function sendMessageInChunks(message) {
      while (message.length > 4096) {
        let chunk = message.slice(0, 4096);
        await sendTelegramMessage(chunk);
        message = message.slice(4096);
      }

      if (message.length > 0) {
        await sendTelegramMessage(message);
      }
    }

    async function sendTelegramMessage(message) {
      try {
        await axios.post(`${telegramApiUrl}sendMessage`, {
          chat_id: chatId,
          text: message,
          parse_mode: 'HTML',
        });
        console.log("Message sent successfully");
      } catch (err) {
        console.error("Error sending message:", err);
      }
    }
    await sendMessageInChunks(fullMessage);
  } catch (err) {
    console.error('Error updating images:', err);
    const msg = `Error updating images: ${err}`;
    await axios.post(`${telegramApiUrl}sendMessage`, {
      chat_id: chatId,
      text: msg,
      parse_mode: 'HTML',
    });
  }
}


async function uploadFileFromUrlToS3(fileUrl,dest,name) {
  try {
    const folderPath = dest || `game_pic/i`;

    const result = await axios.post(`${process.env.AWS_URL}api/image/v2/upload`, {
      accessKey: process.env.AWS_ACCESS_KEY_ID,
      secretKey: process.env.AWS_SECRET_ACCESS_KEY,
      file: fileUrl.replace(/([?&])v=[^&]*/g, ''),
      folder: folderPath,
    });
    return `${result.data.data.url}`;
  } catch (err) {
    console.error('Error uploading file to S3:', err.message);
  }
}

module.exports = { sendError, updateGameImages, uploadFileFromUrlToS3 };
