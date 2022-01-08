import routerx from 'express-promise-router';
import userRouter from './user.routes'

const router = routerx();

router.use('/user', userRouter);

export default router;