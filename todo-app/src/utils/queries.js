import { gql } from '@apollo/client';

export const GET_USERS = gql`
{
    getUsers{
      _id
      email
      name
      address
    }
}
`;

export const CREATE_USER = gql`
mutation createUser($user: UserInput!){
    createUser(input: $user) {
      _id
      email
      name
      address
    }
  }
`;

export const DELETE_USER = gql`
mutation deleteUser($id: ID!){
    deleteUser(id: $id) {
      _id
      email
      name
      address
    }
  }
`;