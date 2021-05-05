import { Request, Response } from 'express';

import { v4 as uuid } from 'uuid';
import { ChatsServices } from '../services/ChatsServices';

class ChatsController {

  async getChats(req: Request, res: Response) {
    const { id } = req.params;

    const chatsServices = new ChatsServices();

    const chats = await chatsServices.getChats(id);

    return res.json(chats);
  }

  
  async getChatsUsers(req: Request, res: Response) {
    const { id, chatId } = req.query;
    
    const chatsServices = new ChatsServices();

    const chatsUsers = await chatsServices.getChatsUsers(id, chatId);

    return res.json(chatsUsers);
  }


  async getAllChatsLastMessage(req: Request, res: Response) {
    const { userId } = req.params
    
    const chatsServices = new ChatsServices();

    const allChats = await chatsServices.getAllChatsLastMessage(userId);

    return res.json(allChats)
  }


  async createChat(req: Request, res: Response) {
    const chatId = uuid();

    const { chatName } = req.body;

    delete req.body.chatName;
    const chatUsers = Object.values(req.body);

    const chatsServices = new ChatsServices();

    await chatsServices.createChat(chatId, chatUsers, chatName);

    return res.json("Chat criado!");
  }
}

export { ChatsController }