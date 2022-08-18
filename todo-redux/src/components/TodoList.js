import React, { useEffect } from "react"
import TodoItem from "./TodoItem";
import { useSelector, useDispatch } from 'react-redux';
import { selectTodos, readTodo } from '../features/todo/todoSlice'

export default function TodoList() {
    const todos = useSelector(selectTodos);
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(readTodo())
    }, [dispatch])

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>Title</th>
                    <th>Complete</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {todos.map((item, index) => <TodoItem
                    key={item._id}
                    todo={item} 
                    no={index + 1}
                />)}
            </tbody>
        </table>
    )
}