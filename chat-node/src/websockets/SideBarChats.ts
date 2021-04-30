import { connection as knex } from '../database';
import { io } from "../http";

io.on("connect", (socket) => {
  socket.on("user_sidebar", async (params) => {
    const { userId } = params;

    const allChats = [];

    const Chats = await knex('chatusers').where('userId', `${userId}`);

    for(let i = 0; i < Chats.length; i++) {
      const message = await knex('messages').where('chatId', Chats[i].chatId).orderBy('sendedAt', 'desc' ).first()

      allChats[i] = { message }
    }

    socket.emit("all_chats", { allChats });
  });
});