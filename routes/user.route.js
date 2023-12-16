import { Router } from 'express';
const router = Router();

import { loginValidator } from '../utils/validators/user.validator.js';
import {
  login,
  signup
} from '../controller/user.controller.js';



router.post('/login', loginValidator, login);
router.post('/signup',signup);

export default router;