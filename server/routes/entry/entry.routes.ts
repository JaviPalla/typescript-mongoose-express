import { Router, Request, Response } from "express";
import { Entry } from "../../models/Entry";

export class EntryRouter {

    private router: Router = Router();

    getRouter(): Router {

        /**
         * @swagger
         * /api/author:
         *   get:
         *     tags:
         *      - Author
         *     description:
         *      List of all authors registered in system.
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Authors
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
        this.router.get("/entries", async(request: Request, response: Response) => {

            const entries = await Entry.find({}).exec();
            
            response.json(entries)
        });

        /**
         * @swagger
         * /api/author:
         *   post:
         *     tags:
         *      - Author
         *     description:
         *      Create new author.
         *     produces:
         *       - application/json
         *     responses:
         *       200:
         *         description: Author
         *       400:
         *         description: Invalid request
         *       403:
         *         description: Forbidden
         */
        this.router.post("/entries", async(request: Request, response: Response) => {

            const author = await Entry.create(request.body);

            response.status(200).json(author);
        });

        return this.router;
    }
}