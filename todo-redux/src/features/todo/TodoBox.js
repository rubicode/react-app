import React, { useState } from 'react'
import TodoForm from '../../components/TodoForm'
import TodoList from '../../components/TodoList'
import { request, LoggedIn } from '../../utils/api'
import { Navigate } from "react-router-dom"
import styles from './Todo.module.css'

// react hooks
export default function TodoBox(props) {

    const [redirect, setRedirect] = useState(false)

    const logout = async () => {
        await request.get('users/signout')
        localStorage.setItem('user', '')
        setRedirect(true)
    }

    return (
        <div className={`${styles.todobox} container`}>
            <LoggedIn />
            <div className='card'>
                <div className='card-header text-center'>
                    <h1>Daftar Kerjaan</h1>
                </div>
                <div className='card-body'>
                    <TodoForm />
                </div>
                <hr />
                <TodoList/>
                <div className='card-footer'>
                    <button type='button' className='btn btn-danger' onClick={logout}>Sign Out</button>
                    {redirect && (
                        <Navigate to="/login" replace={true} />
                    )}
                </div>
            </div>
        </div>
    )

}