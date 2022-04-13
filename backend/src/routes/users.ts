import express from 'express';
import userCtrl from '../controllers/users/user';
import auth from '../middleware/auth';
import multer from '../middleware/multer';

const router = express.Router();

router.get('/', auth, userCtrl.getAllUsers);
router.get('/:id', auth, userCtrl.getOneUser);
router.delete('/:id', auth, userCtrl.deleteUser);
router.put('/:id', auth, multer, userCtrl.updateUser);
router.post('/register', multer, userCtrl.registerUser);
router.post('/login', userCtrl.loginUser);

export default router;