import React, { useState } from "react"
import { useDispatch } from 'react-redux';
import { updateTodo, removeTodo, resendTodo } from '../features/todo/todoSlice'

export default function TodoItem(props) {

    const dispatch = useDispatch();

    const [isEdit, setIsEdit] = useState(false)
    const [todo, setTodo] = useState({
        title: props.todo.title,
        complete: props.todo.complete
    })

    const handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        setTodo({
            ...todo,
            [name]: value
        });
    }

    const handleUpdate = () => {
        dispatch(updateTodo({ _id: props.todo._id, ...todo }))
        setIsEdit(false)
    }


    if (isEdit) {
        return (
            <tr>
                <td>{props.no}</td>
                <td>
                    <input type="text" name="title" value={todo.title} className="form-control" onChange={handleInputChange} />
                </td>
                <td>
                    <select name="complete" value={todo.complete} className="form-control" onChange={handleInputChange} >
                        <option value={true}>sudah</option>
                        <option value={false}>belum</option>
                    </select>
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
                <td>{props.todo.title}</td>
                <td>{props.todo.complete ? 'sudah' : 'belum'}</td>
                <td>
                    <button type="button" className="btn btn-success" onClick={() => setIsEdit(true)}>edit</button>
                    <button
                        type="button"
                        className={props.todo.sent ? 'btn btn-danger' : 'btn btn-warning'}
                        onClick={props.todo.sent ? () => dispatch(removeTodo(props.todo._id)) : () => dispatch(resendTodo(props.todo))}>
                        {props.todo.sent ? 'hapus' : 'kirim ulang'}
                    </button>
                </td>
            </tr >
        )
    }


}