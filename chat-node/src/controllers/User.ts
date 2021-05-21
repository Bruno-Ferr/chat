import { Request, Response } from 'express';
import { connection as knex } from '../database';

import { v4 as uuid } from 'uuid';

async function createUserOnLogIn(req: Request, res: Response) {
  const { email } = req.params
  const id = uuid();

  const userExists = await knex('users').where('email', `${email}`);

  if(userExists.length === 0) {

    await knex('users').insert({
      email,
      id
    });

    const newUserSee = await knex('users').where('email', `${email}`);
    
    return res.json(newUserSee);
  } else {
    
    return res.json(userExists);
  }
}

async function getUser(req: Request, res: Response)  {
  const { email }  = req.params

  const users = await knex('users').where('Email', email);

  return res.json(users);
}


export { createUserOnLogIn, getUser }