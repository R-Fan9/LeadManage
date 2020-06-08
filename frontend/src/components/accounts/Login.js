import React, { Component } from 'react';
import { Link, Redirect } from "react-router-dom";
import { login } from "../../actions/auth";
import { connect } from "react-redux";
import PropTypes from "prop-types"

export class Login extends Component {
    state = {
        username: '',
        password: '',
    }

    static propTypes = {
        login: PropTypes.func.isRequired,
        isAuthenticated: PropTypes.bool
    }

    onChange = e => this.setState({ [e.target.name]: e.target.value });

    onSubmit = e => {
        const { username, password } = this.state
        e.preventDefault();
        this.props.login(username, password)
    };
    
    render() {
        if (this.props.isAuthenticated) {
            return <Redirect to="/" />;
        }
        const { username, password } = this.state;
        return (
            <div className="col-md-6 m-auto">
                <div className="card card-body mt-5">
                    <h2 className="text-center">Login</h2>
                        <form onSubmit={ this.onSubmit }>
                            <div className="form-group">
                                <label>Username</label>
                                <input className="form-control" type="text" name="username" onChange={this.onChange} value={username} />
                            </div>
                            <div className="form-group">
                                <label>Password</label>
                                <input className="form-control" type="password" name="password" onChange={this.onChange} value={password} />
                            </div>
                            <div className='form-group'>
                                <button type="submit" className="btn btn-primary">Login</button>
                            </div>
                            <p>
                                Do not have an account? <Link to='/register'>Register</Link>
                            </p>
                        </form>
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => ({
    isAuthenticated: state.auth.isAuthenticated
})

export default connect(mapStateToProps, { login })(Login);
