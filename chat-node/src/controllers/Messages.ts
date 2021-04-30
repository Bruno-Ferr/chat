import { Request, Response } from 'express';
import { connection as knex } from '../database';

async function saveMessages(req: Request, res: Response) {
  const { Id, message, chatId } = req.body;

  await knex('messages').insert({
    author: Id,
    messageBody: message,
    chatId
  });

  return res.json('gravada');
}

async function getLastMessages(req: Request, res: Response) {
  const { chatId } = req.body;

  const lastMessages = [];

  for(let i = 0; i < chatId.length; i++) {
    const lastMessage = await knex('messages').where('chatId', chatId[i]).orderBy('sendedAt', 'desc' ).first()

    lastMessages[i] = { messageBody: lastMessage.messageBody, chatId: lastMessage.chatId }
  }

  return res.json(lastMessages)
}

export { saveMessages, getLastMessages };