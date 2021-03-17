import { compareSync } from 'bcryptjs';
import React, { Component } from 'react'
import AuthenticationService from './Authentication';
import "./css/Signup.css"
export class Profile extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: '',
            token: '',
        };
    }
    // componentDidMount() {
    //     const name = AuthenticationService.getCurrentUser();
    //     if (name) {

    //         this.setState({
    //             email: name.email,
    //             token: name.accesstoken
    //         });
    //     }
    // }
    logout = () => {
        AuthenticationService.signOut()
    }
    render() {
        return (
            <div>
                <div>
                    hello this is a test
                    {this.state.email}
                    {this.state.token}
                </div>
                <div>
                    <button onClick={this.logout} color="primary" ></button>
                </div>
            </div>
        )
    }
}

export default Profile
