import express from 'express';
import { getUser, getUsers, insertUser, patchUserRoles, deleteUser, getUsersByRoles} from '../controller/user-controller.js';

export const router = express.Router()

router.get('/', getUsers);  

router.get('/role', getUsersByRoles); 

router.get('/:username', getUser); 

router.post('/', insertUser);

router.patch('/:username', patchUserRoles);

router.delete('/:username', deleteUser);

export default router;