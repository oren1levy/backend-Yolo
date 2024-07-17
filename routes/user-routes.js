import express from 'express';
import usersController from '../controllers/users-controller.js';

const router = express.Router();

router.route('/auth/register')
    .post(usersController.registerController)
router.route('/auth/login')
    .post(usersController.loginController)

export default router;