import { Request, Response, NextFunction } from 'express';

// Not Found Route Middleware
const notFoundRoute = (req: Request, res: Response, next: NextFunction) => {
  res.status(404).json({
    success: false,
    message: "Route not found",
  });
  next()
};


export default notFoundRoute;