import axios from "axios";
import React, { useState } from "react";
import { useLayoutEffect } from "react";
import { Toaster, toast } from "react-hot-toast";
import Modal from "./Modal";

const Home = () => {
    const [inputs, setInputs] = useState({
        name: "",
        age: "",
    });
    const [Users, setUsers] = useState([]);
    const [editClick, setEditClick] = useState(false);
    const [userID, setuserID] = useState("");
    const [singleUser, setSingleUser] = useState({});
    let [isOpen, setIsOpen] = useState(false)

    function closeModal() {
        setIsOpen(false)
    }

    function openModal() {
        setIsOpen(true)
    }

    const getUsers = async () => {
        let resp = await axios.get("http://localhost:5000/users")
        console.log(resp.data)
        setUsers(resp.data)
    }
    useLayoutEffect(() => {
        getUsers()
    }, [])

    const handleChange = (e) => {
        setInputs({
            ...inputs,
            [e.target.name]: e.target.value,
        });
    };
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (editClick) {
            // console.log(inputs);
            try {
                let resp = await axios.patch(`http://localhost:5000/users/${userID}`, inputs);

                if (resp.data.message) {
                    setUsers(resp.data.users)
                    toast.success("user updated")
                    setEditClick(false)
                }
            } catch (error) {
                console.log(error.message)
            }
        } else {
            try {
                let resp = await axios.post("http://localhost:5000/users/createUser", inputs);

                if (resp.data.message) {
                    setUsers(resp.data.users)
                    toast.success("user created")
                }
            } catch (error) {
                console.log(error.message)
            }
        }
        setInputs({
            name: "",
            age: ""
        })
    };

    const handleDelete = async (id) => {
        // console.log(id)
        try {
            let resp = await axios.delete(`http://localhost:5000/users/${id}`)
            if (resp.data.message) {
                toast.success("user removed")
                setUsers(resp.data.users)
            }
        } catch (error) {
            console.log(error.message)
        }
    };
    const handleEdit = async (user) => {
        setEditClick(true)
        setuserID(user.id)
        setInputs({
            name: user.name,
            age: user.age
        })
    };
    const getsingleUser = async (id) => {
        try {
            let resp = await axios.get(`http://localhost:5000/users/${id}`)
            if (resp.data.message) {
                setSingleUser(resp.data.user)
            }

            openModal(true)
        } catch (error) {
            console.log(error.message)
        }
    }
    return (
        <div className="min-h-screen bg-[#004b43]">
            <Toaster position="bottom-center" reverseOrder={false} />
            <h1 className="text-center text-white text-5xl">Crud App</h1>
            <div className="bg-[#e5e4e4] max-w-fit m-auto p-10 my-3">
                <form onSubmit={handleSubmit}>
                    <div className="flex flex-col">
                        <label>Name</label>
                        <input name="name" value={inputs.name} onChange={handleChange} required />
                    </div>
                    <div className="flex flex-col">
                        <label>Age</label>
                        <input name="age" value={inputs.age} onChange={handleChange} required />
                    </div>
                    <button type="submit" className="w-full bg-[#014d64] text-white mt-3">
                        {editClick ? "update" : "Add"}
                    </button>
                </form>
            </div>
            <div>
                <table className="w-full text-center">
                    <thead>
                        <tr className="text-white">
                            <th>Name</th>
                            <th>Age</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody className="text-white">
                        {Users.map((user, i) => (
                            <tr key={user.id}>
                                <td>{user.name}</td>
                                <td>{user.age}</td>
                                <td>
                                    <button
                                        onClick={() => handleEdit(user)}
                                        className="mr-3 text-yellow-300"
                                    >
                                        Edit
                                    </button>
                                    <button
                                        onClick={() => handleDelete(user.id)}
                                        className="mr-3 text-red-500"
                                    >
                                        Delete
                                    </button>
                                    <button
                                        onClick={() => getsingleUser(user.id)}
                                        className="text-green-500"
                                    >
                                        Details
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Modal closeModal={closeModal} openModal={openModal} isOpen={isOpen} user={singleUser} />
        </div>
    );
};

export default Home;