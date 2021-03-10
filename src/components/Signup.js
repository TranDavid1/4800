import React, { Component } from "react";
import Navbar from "./Navbar";
import "./css/Signup.css";
import {
  createMuiTheme,
  ThemeProvider,
  Button,
  TextField,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Form } from "reactstrap";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#06C167",
    },
    secondary: {
      main: "#06C167",
    },
  },
});

class Signup extends Component {
  constructor() {
    super();
    this.state = {
      firstname: "",
      lastname: "",
      email: "",
      phone: "",
    };

    this.register = this.register.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(event) {
    this.setState({ 
      [event.target.name]: event.target.value
    });
  }

  register(event) {
    const { firstname, lastname, email, phone } = this.state;
    fetch('/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
          firstname: firstname,
          lastname: lastname,
          email: email,
          phone: phone
      })
    }).then((Response) => Response.json())
      .then((Results) => {
        if (Results.Status == "Success")
            this.props.history.push("/Dashboard");
        else
            alert("Invalid user")
    })
  }

  render() {
    return (
      <div className="signupContainer">
        <Form>
          <ThemeProvider theme={theme}>
            <div>
              <Navbar />
            </div>
            <div className="heading">
              <h1>Create your Growceries account here!</h1>
            </div>
            <TextField
              required
              variant="standard"
              type="firstname"
              value={this.state.firstname}
              color="primary"
              style={style}
              label="First Name"
              onChange={this.handleChange}
            ></TextField>
            <TextField
              required
              variant="standard"
              type="lastname"
              value={this.state.lastname}
              color="primary"
              style={style}
              label="Last Name"
              onChange={this.handleChange}
            ></TextField>
            <br />
            <TextField
              required
              variant="standard"
              type="email"
              value={this.state.email}
              color="primary"
              style={style}
              label="Email"
              onChange={this.handleChange}
            ></TextField>
            <br />
            <TextField
              required
              variant="standard"
              type="phone"
              value={this.state.phone}
              color="primary"
              style={style}
              label="Phone Number"
              onChange={this.handleChange}
            ></TextField>
            <br />
            <Button
              type="submit"
              onClick={this.register}
              variant="contained"
              color="primary"
              style={style}
            >
              Sign up
            </Button>
            <div>
              <h3>Already have an account?</h3>
            </div>
            <Button
              component={Link}
              to="/"
              variant="contained"
              color="primary"
              style={style}
            >
              Log in here
            </Button>
            <br />
          </ThemeProvider>
        </Form>
      </div>
    );
  }
}

const style = {
  margin: 5,
};

export default Signup;