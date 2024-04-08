import { CookieOptions, NextFunction, Request, Response } from "express";

export const todoController = (req: Request, res: Response) => {
  //   console.log(req.headers.authorization);

  res.status(200).json({ todos: [res.locals.picture, "pray", "eat", "sleep"] });

  console.log(`returned: [${res.locals.picture}, "pray", "eat", "sleep"]`);
};
