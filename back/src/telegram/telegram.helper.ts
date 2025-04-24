import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config({ path: 'datos.env' });

const TELEGRAM_TOKEN = process.env.TELEGRAM_BOT_TOKEN;
const CHAT_ID = process.env.TELEGRAM_CHAT_ID;

export async function sendTelegramMessage(message: string) {
  if (!TELEGRAM_TOKEN || !CHAT_ID) {
    console.error('No se configuró TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID en datos.env');
    return;
  }

  const url = `https://api.telegram.org/bot${TELEGRAM_TOKEN}/sendMessage`;

  try {
    await axios.post(url, {
      chat_id: CHAT_ID,
      text: message,
      parse_mode: 'Markdown'
    });
    console.log('Mensaje enviado por Telegram');
  } catch (error) {
    console.error('Error al enviar mensaje por Telegram:', error.message);
  }
}
