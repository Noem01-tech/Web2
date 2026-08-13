export interface Etudiant {
  id: string;
  nom: string;
  prenom: string;
  email: string;
}
import { type Request, type Response,type NextFunction } from 'express';


export function errorHandler(
  err: any,
  req: Request,
  res: Response,
  next: NextFunction
) {
  const status = err.status || 500;
  const message = err.message || 'Erreur interne du serveur';

  console.log('Erreur attrapée :', message);

  res.status(status).json({ error: message });
}