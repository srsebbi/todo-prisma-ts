import { Request, Response } from 'express';
import config from 'config';
import { createSession, findSessions } from '../services/session.service';
import { validatePassword } from '../services/user.service';
import { signJwt } from '../utils/jwt.utils';
import { db } from '../utils/db.server';

export const createUserSessionHandler = async (req: Request, res: Response) => {
  // Validate users password
  const user = await validatePassword(req.body);

  if (!user) {
    return res.status(401).send('Invalid username or password');
  }
  // Create a session
  const session = await createSession(user.id);
  // Create an access token
  const accessToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: config.get('accessTokenTtl') } // 15minutes
  );

  // Create a refresh token
  const refreshToken = signJwt(
    { ...user, session: session.id },
    { expiresIn: config.get('refreshTokenTtl') } // 1 year
  );
  // Return access and refresh tokens

  return res.send({ accessToken, refreshToken });
};

export const getUserSessionsHandler = async (req: Request, res: Response) => {
  const user = res.locals.user.id;

  const sessions = await findSessions({ userId: user, valid: true });

  return res.send(sessions);
};