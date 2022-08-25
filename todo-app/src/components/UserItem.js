import React, { useState } from "react"
import { useMutation } from '@apollo/client';
import { DELETE_USER, GET_USERS } from "../utils/queries";

export default function UserItem(props) {

    const [deleteUser, { data, loading, error }] = useMutation(DELETE_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });

    const [isEdit, setIsEdit] = useState(false)
    const [user, setUser] = useState({
        name: props.user.name,
        address: props.user.address
    })

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setUser({
            ...user,
            [name]: value
        });
    }

    const handleUpdate = () => {
        setIsEdit(false)
    }

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;

    if (isEdit) {
        return (
            <tr>
                <td>{props.no}</td>
                <td>
                    <input type="text" name="name" value={user.name} className="form-control" onChange={handleInputChange} />
                </td>
                <td>
                    <textarea name="address" value={user.address} className="form-control" onChange={handleInputChange} />
                </td>
                <td>
                    <button type="button" className='btn btn-primary' onClick={handleUpdate}>save</button>
                    <button type="button" className='btn btn-warning' onClick={() => setIsEdit(false)}>cancel</button>
                </td>
            </tr >
        )
    } else {
        return (
            <tr>
                <td>{props.no}</td>
                <td>{props.user.email}</td>
                <td>{props.user.name}</td>
                <td>{props.user.address}</td>
                <td>
                    <button type="button" className="btn btn-success" onClick={() => setIsEdit(true)}>edit</button>
                    <button type="button" className="btn btn-danger" onClick={() => deleteUser({ variables: { id: props.user._id } }) }>delete</button>
                </td>
            </tr >
        )
    }


}