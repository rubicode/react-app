import React, { Component } from 'react'
import { request } from '../utils/api'

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            user: null
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
            [name]: value
        });
    }

    async handleSubmit(event) {
        event.preventDefault();
        try {
            const { data } = await request.post('users/auth', { email: this.state.email, password: this.state.password });
            if (data.success) {
                localStorage.setItem('user', JSON.stringify(data.data))
                this.setState({user: data.data})
            } else {
                alert('gagal login')
            }
        } catch (error) {
            console.error(error);
        }
        this.setState({ username: '', password: '' })
    }

    render() {
        return (
            <div className='container'>
                <div className='card box-center'>
                    <div className='card-header text-center'>
                        <h1>Sign In</h1>
                    </div>
                    <div className='card-body'>
                        <form onSubmit={this.handleSubmit}>

                            <div className="row mb-3">
                                <label htmlFor="email" className="col-sm-2 col-form-label">email</label>
                                <div className="col-sm-10">
                                    <input type="email" className="form-control" id="email" name="email" value={this.state.value} onChange={this.handleChange} />
                                </div>
                            </div>

                            <div className="row mb-3">
                                <label htmlFor="password" className="col-sm-2 col-form-label">password</label>
                                <div className="col-sm-10">
                                    <input type="password" className="form-control" id="password" name="password" value={this.state.value} onChange={this.handleChange} />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-primary">Sign In</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}