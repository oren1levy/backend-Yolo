import express from 'express';
import usersController from '../controllers/users-controller.js';

const router = express.Router();

router.route('/register')
    .post(usersController.registerController);
router.route('/login')
    .post(usersController.loginController);
router.route('/updateUser/:userId')
    .put(usersController.updateUserController);
router.route('/deleteUser/:userId')
    .delete(usersController.deleteUserController);

export default router;