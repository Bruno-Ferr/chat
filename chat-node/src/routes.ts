import { Router } from 'express';

import { ChatsController } from './controllers/Chats';
import { addFriend, getFriends } from './controllers/Friends';
import { getLastMessages, saveMessages, getMessages } from './controllers/Messages';

import { createUserOnLogIn, getUser } from './controllers/User';

const routes = Router();

const chatsController = new ChatsController();

routes.get('/usersLogIn/:email', createUserOnLogIn);
routes.get('/users/:email', getUser);

routes.get('/chats/:id', chatsController.getChats);
routes.get('/getAllChatsLast/:userId', chatsController.getAllChatsLastMessage);
routes.get('/chatUsers', chatsController.getChatsUsers)
routes.post('/chats', chatsController.createChat);

routes.get('/friends/:id', getFriends);
routes.post('/friends', addFriend);

routes.post('/messages', saveMessages);
routes.get('/getMessages/:chatId', getMessages);

routes.get('/lastMessages', getLastMessages);

export { routes };