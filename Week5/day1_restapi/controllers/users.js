import { v4 as uuid } from 'uuid';
import { validationResult } from 'express-validator';

let users = [];

export const getUsers = (req, res) => {

    res.send(users);
}

export const createUser = (req, res) => {
    // Check for validation errors below
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ message: false, errors: errors.array() });
    }
    const user = req.body;

    users.push({ ...user, id: uuid() });

    res.send({ message: true, users })
};

export const getSingleUser = (req, res) => {
    const { id } = req.params;

    let founduser = users.find((user) => user.id === id);
    res.send({ message: true, user: founduser })
};

export const deleteUser = (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id !== id);

    res.send({ message: true, users })
};

export const updateUser = (req, res) => {
    // Check for validation errors below
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.json({ message: false, errors: errors.array() });
    }
    const { id } = req.params;
    const { name, age } = req.body;

    const founduser = users.find((user) => user.id === id);

    if (name) {
        founduser.name = name;
    }
    if (age) {
        founduser.age = age;
    }

    res.send({ message: true, users })
};