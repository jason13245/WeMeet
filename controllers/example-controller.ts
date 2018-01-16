import { Router, Request, Response } from 'express';

export class ExampleController {
    greeting(req: Request, res: Response) {
        res.json({'message': 'Welcome to WeMeet!'});
    }
}