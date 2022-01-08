import routerx from 'express-promise-router';
import userController from '../controllers/user.controller';

const router = routerx();


router.post('/register', userController.register );
router.put('/activate', userController.activate);
router.put('/deactivate', userController.deactivate);
router.post('/log', userController.log );
router.get('/verify', userController.verify);

export default router;