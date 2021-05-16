import { Request, Response } from 'express';
import { connection as knex } from '../database';

async function getFriends(req: Request, res: Response) {
  const { id } = req.params;

  const friend = await knex('friends').where('userId', `${id}`);

  return res.json(friend);
}


async function addFriend(req: Request, res: Response) {
  const { email, userId, name } = req.body


  const isFriend = await knex('friends').where({
    Email: email, 
    userId: userId
  });

  if(isFriend.length != 0) {
    return res.json('Já é seu amigo!')
  }

  const friendExists = await knex('users').where('Email', `${email}`);
  if(friendExists.length != 0) {

    await knex('friends').insert({
      email,
      userId,
      friendName: name
    });

    return res.json('Adicionado!');
  } 

  return res.json('Esse usuário não está cadastrado!')
}

export { getFriends, addFriend }