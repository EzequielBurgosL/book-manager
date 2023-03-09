import { NextFunction, Request, Response } from "express";

export class Authentication {
  private _isUserAuthenticated: boolean = false;

  public set isUserAuthenticated(value: boolean) {
    this._isUserAuthenticated = value;
  }

  public isAuthenticated(req: Request, res: Response, next: NextFunction) {
    if (this && this._isUserAuthenticated) {
      return next();
    } else {
      return res.status(401).json({ error: 'Unauthorized' });
    }
  }
};

export function generateBookId(): number {
  return +new Date;
};