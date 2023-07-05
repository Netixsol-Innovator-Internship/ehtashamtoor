import express from 'express';
import { body } from 'express-validator';
import { getUsers, createUser, getSingleUser, deleteUser, updateUser } from '../controllers/users.js';

const router = express.Router();
const validateData = [
    body('name').notEmpty().withMessage('Name is required'),
    body('age').isNumeric().withMessage('Age is required'),
];
router.get('/', getUsers);

router.post('/createUser', validateData, createUser);

router.get('/:id', getSingleUser);

router.delete('/:id', deleteUser);

router.patch('/:id', validateData, updateUser);

export default router;