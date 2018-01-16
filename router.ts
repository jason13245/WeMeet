import { Router, Request, Response } from 'express';
import { ExampleController } from './controllers/example-controller'

const _router: Router = Router();

const exampleController = new ExampleController();

_router.get('/greeting', (req: Request, res: Response) => {
    exampleController.greeting(req, res);
});

export const router: Router = _router;
