import { Injectable } from '@nestjs/common';
import axios from 'axios';
import * as dotenv from 'dotenv';

dotenv.config({ path: 'datos.env' });

@Injectable()
export class TelegramService {
  private botToken = process.env.TELEGRAM_BOT_TOKEN;
  private chatId = process.env.TELEGRAM_CHAT_ID;

  async enviarMensaje(mensaje: string): Promise<void> {
    if (!this.botToken || !this.chatId) {
      console.error('TELEGRAM_BOT_TOKEN o TELEGRAM_CHAT_ID no definidos en datos.env');
      return;
    }

    const url = `https://api.telegram.org/bot${this.botToken}/sendMessage`;

    await axios.post(url, {
      chat_id: this.chatId,
      text: mensaje,
      parse_mode: 'HTML',
    });
  }
}
