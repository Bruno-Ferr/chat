import { connection as knex } from '../database';

class ChatsServices {
  
  async getChats(userId) {
    const chats = await knex('chatusers').where('userId', `${userId}`);

    return chats;
  }

  async getChatsUsers(id, chatId) {
    const chats = await knex('chatusers').where({userId: id, chatId});

    return chats;
  }

  async getAllChatsLastMessage(userId) {
    const unordered_all_chats = [];

    const Chats = await knex('chatusers').where('userId', `${userId}`);

    for(let i = 0; i < Chats.length; i++) {
      const message = await knex('messages').where('chatId', Chats[i].chatId).orderBy('sendedAt', 'desc' ).first()
      const chatUsers = await knex('chatusers').where({userId, chatId: Chats[i].chatId});
      
      const chatName = chatUsers[0].chatName;
      
      unordered_all_chats[i] =  {message, chatName}
    }

    const all_chats = unordered_all_chats
    
    return all_chats;
  }

  async createChat(chatId, chatUsers, chatName) {
    await knex('chats').insert({ Id: chatId });

    for(let i = 0; i < chatUsers.length; i++) {

      let getUserId = await knex.select('Id').from('users').where('email', `${chatUsers[i]}`);

      const { Id } = getUserId[0];

      await knex('chatUsers').insert({
        chatId,
        userId: Id,
        chatName
      });
    }
  }
}

export { ChatsServices }