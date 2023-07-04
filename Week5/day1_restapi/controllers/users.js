import { v4 as uuid } from 'uuid';

let users = [];

export const getUsers = (req, res) => {
    console.log(`Users in the database: ${users}`);

    res.send(users);
}

export const createUser = (req, res) => {
    const user = req.body;

    users.push({ ...user, id: uuid() });

    res.send(users)

    console.log(`User [${user.name}] added to the database.`);
};

export const getSingleUser = (req, res) => {
    res.send(req.params.id)
    let founduser = users.find((user) => user.id === id);
    res.send(founduser)
};

export const deleteUser = (req, res) => {
    const { id } = req.params;

    users = users.filter((user) => user.id !== req.params.id);

    res.send(users)

    console.log(`user with id ${id} has been deleted`);
};

export const updateUser = (req, res) => {
    const { id } = req.params;
    const { name, age } = req.body;

    const founduser = users.find((user) => user.id === id);

    if (name) {
        founduser.name = req.body.name;
    }
    if (age) {
        founduser.age = req.body.age;
    }

    res.send(users)

    console.log(`name has been updated to ${req.body.name}.age has been updated to ${req.body.age}`)
};