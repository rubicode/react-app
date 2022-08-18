import React, { Component } from "react"

export default class TodoItem extends Component {

    constructor(props) {
        super(props)
        this.state = {
            isEdit: false,
            title: props.todo.title,
            complete: props.todo.complete
        }
    }

    handleInputChange = (event) => {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    handleUpdate = () => {
        this.props.update(this.state.title, this.state.complete)
        this.setState({isEdit: false})
    }

    render() {
        if (this.state.isEdit) {
            return (
                <tr>
                    <td>{this.props.no}</td>
                    <td>
                        <input type="text" name="title" value={this.state.title} className="form-control" onChange={this.handleInputChange} />
                    </td>
                    <td>
                        <select name="complete" value={this.state.complete} className="form-control" onChange={this.handleInputChange} >
                            <option value={true}>sudah</option>
                            <option value={false}>belum</option>
                        </select>
                    </td>
                    <td>
                        <button type="button" className='btn btn-primary' onClick={this.handleUpdate}>save</button>
                        <button type="button" className='btn btn-warning' onClick={() => this.setState({ isEdit: false })}>cancel</button>
                    </td>
                </tr >
            )
        } else {
            return (
                <tr>
                    <td>{this.props.no}</td>
                    <td>{this.props.todo.title}</td>
                    <td>{this.props.todo.complete ? 'sudah' : 'belum'}</td>
                    <td>
                        <button type="button" className="btn btn-success" onClick={() => this.setState({ isEdit: true })}>edit</button>
                        <button type="button" className={this.props.todo.sent ? 'btn btn-danger' : 'btn btn-warning'} onClick={this.props.todo.sent ? this.props.remove : this.props.resend}>{this.props.todo.sent ? 'hapus' : 'kirim ulang'}</button>
                    </td>
                </tr >
            )
        }

    }
}