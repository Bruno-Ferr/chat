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
    let ordered_all_chats = [];

    const Chats = await knex('chatusers').where('userId', `${userId}`);

    for(let i = 0; i < Chats.length; i++) {
      const message = await knex('messages').where('chatId', Chats[i].chatId).orderBy('sendedAt', 'desc' ).first()
      const chatUsers = await knex('chatusers').where({userId, chatId: Chats[i].chatId});
      
      const chatUser = chatUsers[0]
      
      ordered_all_chats[i] =  {message, chatUser}
    }

    
    if(ordered_all_chats !== []) {
      ordered_all_chats = ordered_all_chats.sort((a, b) => b.message?.sendedAt - a.message?.sendedAt);
    }

    return ordered_all_chats;
  }

  async createChat(chatId, selectedFriend, chatName) {
    await knex('chats').insert({ Id: chatId });

    for(let i = 0; i < selectedFriend.length; i++) {

      let getUserId = await knex.select('Id').from('users').where('email', `${selectedFriend[i]}`);

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