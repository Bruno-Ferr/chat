import { connection as knex } from '../database';

class ChatsServices {
  
  async getChats(userId) {
    const chats = await knex('chatusers').where('userId', `${userId}`);

    return chats;
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