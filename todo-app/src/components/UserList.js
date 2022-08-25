import UserItem from "./UserItem";
import { useQuery } from '@apollo/client';
import { GET_USERS } from '../utils/queries';

export default function UserList(props) {

    const { loading, error, data } = useQuery(GET_USERS);

    if (loading) return <p>Loading...</p>;
    if (error) return `Error! ${error.message}`;

    return (
        <table className="table table-striped">
            <thead>
                <tr>
                    <th>No.</th>
                    <th>email</th>
                    <th>name</th>
                    <th>Address</th>
                    <th>Actions</th>
                </tr>
            </thead>
            <tbody>
                {data.getUsers.map((item, index) => <UserItem
                    key={item._id}
                    user={item} no={index + 1}
                />)}
            </tbody>
        </table>
    )
}