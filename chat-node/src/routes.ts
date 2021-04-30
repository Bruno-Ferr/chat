import { Router } from 'express';

import { ChatsController } from './controllers/Chats';
import { addFriend, getFriends } from './controllers/Friends';
import { getLastMessages, saveMessages } from './controllers/Messages';

import { createUserOnLogIn, getUser } from './controllers/User';

const routes = Router();

const chatsController = new ChatsController();

routes.get('/usersLogIn/:email', createUserOnLogIn);
routes.get('/users/:email', getUser);

routes.get('/chats/:id', chatsController.getChats);
routes.post('/chats', chatsController.createChat);

routes.get('/friends/:id', getFriends);
routes.post('/friends', addFriend);

routes.post('/messages', saveMessages);

export { routes };