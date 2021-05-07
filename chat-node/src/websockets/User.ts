import { connection as knex } from '../database';
import { io } from "../http";

io.on("connect", (socket) => {
  const id = socket.handshake.query.id;
  socket.join(id);

  socket.on("send-message", async ({ chatUsers, text, userId }) => {
    // Salvar a mensagem no banco
    await knex('messages').insert({
      author: userId,
      messageBody: text,
      chatId: chatUsers
    })

    // Usar o chatUsers para pegar todos os usuários do chat
    const recipients = await knex('chatusers').where('chatId', chatUsers).whereNot('userId', userId)

    const params = {
      text,
      author: userId,
      chatId: chatUsers
    }

    //Enviar a mensagem para todos users
    recipients.forEach(recipient => {
      socket.broadcast.to(recipient.userId).emit('receive-message', params)
    })
  });

  socket.on("saw-message", async({ chatId, userId }) => {
    // Salvar a alteração no banco
    await knex('messages').where('chatId', chatId).update('seen', 1)

    socket.broadcast.to(userId).emit("seen-message");
  })
});