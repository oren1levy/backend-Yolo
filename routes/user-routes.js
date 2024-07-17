import express from 'express';
import usersController from '../controllers/users-controller.js';

const router = express.Router();

router.route('/auth/register')
    .post(usersController.registerController)
router.route('/auth/login')
    .post(usersController.loginController)
router.route('/auth/updateUser/:userId')
    .put(usersController.updateUserController)
router.route('/auth/deleteUser/:userId')
    .delete(usersController.deleteUserController);

export default router;