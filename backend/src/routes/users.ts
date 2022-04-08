import express from 'express';
import userCtrl from '../controllers/users/user';
import auth from '../middleware/auth';

const router = express.Router();

router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);
router.delete('/:id', auth, userCtrl.deleteUser);
router.put('/:id', auth, userCtrl.updateUser);
router.post('/register', userCtrl.registerUser);
router.post('/login', userCtrl.loginUser);

export default router;