import TodoItem from "./TodoItem";

export default function TodoList(props) {
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
                {props.data.map((item, index) => <TodoItem
                    key={item._id}
                    todo={item} no={index + 1}
                    update={(title, complete) => props.update(item._id, title, complete)}
                    remove={() => props.remove(item._id)}
                    resend={() => props.resend(item._id, item.title)}
                />)}
            </tbody>
        </table>
    )
}