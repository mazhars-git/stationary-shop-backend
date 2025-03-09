import { NextFunction, Request, Response } from 'express';

const textToJson = () => {
  return (req: Request, res: Response, next: NextFunction) => {
    req.body = JSON.parse(req.body.data);
    next()
  };
};

export default textToJson;
