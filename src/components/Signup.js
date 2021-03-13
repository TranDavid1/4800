import React, { Component } from "react";
import Navbar from "./Navbar";
import "./css/Signup.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import render from "@testing-library/react";
import {
  createMuiTheme,
  ThemeProvider,
  Button,
  TextField,
} from "@material-ui/core";
import { Link } from "react-router-dom";
import { Form } from "reactstrap";
import Login from "./Login";

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
      item: [],
      isLoaded: false,
    };

    this.register = this.register.bind(this);
    this.getData = this.getData.bind(this);
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
        // 'Accept': 'application/json',
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        firstname: firstname,
        lastname: lastname,
        email: email,
        phone: phone,
      }),
    }).then((Response) => Response.json())
      .then((Results) => {
        if (Results.Status == "Success") 
          this.props.history.push("/Dashboard");
        else 
          alert("Invalid user");
      });
  }

  getData(event) {
    fetch('/data', {
      method: 'POST',
      headers: {
        // 'Accept': 'application/json',
        "Content-Type": 'application/json',
      },
      body: JSON.stringify({

      }),
    }).then((Response) => Response.json()).then((json) => {
        this.setState({
          items: json,
          isLoaded: true,
        });
      });
  }

  /* Testing
  handleClick = () => {
    console.log(this.state.firstname)
    console.log(this.state.lastname)
    console.log(this.state.email)
    console.log(this.state.phone)
  }
  */

  render() {
    const { isLoaded, items } = this.state;

    if (!isLoaded) {
      return (
        <div className="signupContainer">
          <form onSubmit={this.register}>
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
                name="firstname"
                color="primary"
                style={style}
                label="First Name"
                value={this.state.firstname}
                onChange={this.handleChange}
              ></TextField>
              <TextField
                required
                variant="standard"
                type="lastname"
                name="lastname"
                color="primary"
                style={style}
                label="Last Name"
                value={this.state.lastname}
                onChange={this.handleChange}
              ></TextField>
              <br />
              <TextField
                required
                variant="standard"
                type="email"
                name="email"
                color="primary"
                style={style}
                label="Email"
                value={this.state.email}
                onChange={this.handleChange}
              ></TextField>
              <br />
              <TextField
                required
                variant="standard"
                type="phone"
                name="phone"
                color="primary"
                style={style}
                label="Phone Number"
                value={this.state.phone}
                onChange={this.handleChange}
              ></TextField>
              <br />
              <Button
                type="submit"
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
              <Button 
                onClick={this.getData} 
                variant="contained"
                style={style} 
                color="primary"
              >
                Database dump
              </Button>
            </ThemeProvider>
          </form>
        </div>
      );
    } else {
      return (
        <div className="App">
          <ul>
            {items.map(item => (
              <li key={item.id}>
                Name: {item.firstName} {item.lastName}, Phone: {item.phone}, Email: {item.email}
              </li>
            ))}
          </ul>
        </div>
      );
    }
  }
}

const style = {
  margin: 5,
};

export default Signup;
