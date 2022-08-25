import React, { useState } from 'react'
import { useMutation } from '@apollo/client';
import { CREATE_USER, GET_USERS } from '../utils/queries';

export default function UserForm() {

    const [createUser, { data, loading, error }] = useMutation(CREATE_USER, {
        refetchQueries: [{ query: GET_USERS }],
    });

    const [user, setUser] = useState({
        email: '',
        password: '',
        name: '',
        address: ''
    })

    const handleChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setUser({
            ...user,
            [name]: value
        });
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        createUser({ variables: { user } });
        setUser({
            email: '',
            password: '',
            name: '',
            address: ''
        })
    }

    if (loading) return 'Submitting...';
    if (error) return `Submission error! ${error.message}`;


    return (
        <form onSubmit={handleSubmit}>

            <div className="row mb-3">
                <label htmlFor="email" className="col-sm-2 col-form-label">Email</label>
                <div className="col-sm-10">
                    <input type="email" className="form-control" id="email" name="email" value={user.email} onChange={handleChange} />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="password" className="col-sm-2 col-form-label">Password</label>
                <div className="col-sm-10">
                    <input type="password" className="form-control" id="password" name="password" value={user.password} onChange={handleChange} />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="name" className="col-sm-2 col-form-label">Name</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="name" name="name" value={user.name} onChange={handleChange} />
                </div>
            </div>

            <div className="row mb-3">
                <label htmlFor="address" className="col-sm-2 col-form-label">Address</label>
                <div className="col-sm-10">
                    <textarea className="form-control" id="address" name="address" value={user.address} onChange={handleChange} />
                </div>
            </div>

            <button type="submit" className="btn btn-primary">Tambah</button>
        </form>
    );

}