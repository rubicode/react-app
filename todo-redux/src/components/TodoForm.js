import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { createTodo } from '../features/todo/todoSlice'

export default function TodoForm() {

    const dispatch = useDispatch();
    
    const [value, setValue] = useState('')

    const handleChange = (event) => {
        setValue(event.target.value);
    }

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(createTodo(value))
        setValue('')
    }


    return (
        <form onSubmit={handleSubmit}>

            <div className="row mb-3">
                <label htmlFor="title" className="col-sm-2 col-form-label">Kerjaan</label>
                <div className="col-sm-10">
                    <input type="text" className="form-control" id="title" value={value} onChange={handleChange} />
                </div>
            </div>

            <button type="submit" className="btn btn-primary">Tambah</button>
        </form>
    );

}