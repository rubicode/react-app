import React from 'react'
import UserForm from './UserForm'
import UserList from './UserList'
import { graphqlClient } from '../utils/api'
import { ApolloProvider } from '@apollo/client'

export default function UserBox(props) {

    return (
        <ApolloProvider client={graphqlClient}>
            <div className='container'>
                <div className='card'>
                    <div className='card-header text-center'>
                        <h1>Daftar User</h1>
                    </div>
                    <div className='card-body'>
                        <UserForm />
                    </div>
                    <hr />
                    <UserList />
                    <div className='card-footer'>
                    </div>
                </div>
            </div>
        </ApolloProvider>
    )

}