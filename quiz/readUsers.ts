import express, { Response } from 'express';
// import all the necessary types from types
import { UserRequest } from './types';

const router = express.Router();

// a route that sends the usernames of the users to the client
router.get('/usernames', (req: UserRequest, res: Response) => {
    console.log('users:', req.users);
    let usernames = req.users?.map((user) => {
        return { id: user.id, username: user.username };
    });
    res.send(usernames);
});

router.get('/username/:name', (req: UserRequest, res: Response) => {
    let name = req.params.name;
    let users_with_name = req.users?.filter(
        function (user) {
            return user.username === name;
        }
    );

    if (users_with_name?.length === 0) {
        res.send({
            error: { message: `${name} not found`, status: 404 }
        });
    } else {
        res.send(users_with_name);
    }
});

export default router;