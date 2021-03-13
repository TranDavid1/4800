import React, { Component } from "react";
import {
  createMuiTheme,
  ThemeProvider,
  Button,
  TextField,
} from "@material-ui/core";
import "./css/Login.css";
import { Link } from "react-router-dom";
import Navbar from "./Navbar";

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

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: "",
    };
  }

  render() {
    return (
      <div className="loginContainer">
        <Navbar />
        <div>
          <h1 className="heading">
            Fresh groceries, delivered right to your door
          </h1>
        </div>
        <div className="row">
          <div className="leftColumn">

          </div>
          <div className="rightColumn">
            <div>
              <h2 className="signInHeading">
                Please sign in to continue
              </h2>
            </div>
            <ThemeProvider theme={theme}>
              <div classname="signInFields">
                <TextField
                  variant="standard"
                  type="email"
                  label="Email"
                  color="primary"
                  onChange = {(event, newValue) => this.setState({username:newValue})}
                ></TextField>
              </div>
              <br />
              <div classname="signInFields">
                <TextField
                  variant="standard"
                  type="password"
                  label="Password"
                  color="primary"
                  onChange = {(event, newValue) => this.setState({password:newValue})}
                ></TextField>
              </div>
              <br />
              <div classname="signInFields">
                <Button component={Link} to="/Home" variant="contained" type="submit" color="primary" style={style}>
                  Sign In
                </Button>
              </div>
              <div>
                <h3>
                  New to Growceries?
                  <Button component={Link} to="/Signup" variant="contained" color="primary" style={style}>
                    Sign up here
                </Button>
                </h3>
              </div>
            </ThemeProvider>
          </div>
        </div>
        <div className="row">
          <div className="leftColumn2">
            <div className="leftColumnHeading">
                Why choose Growceries?
            </div>
            <div className="leftColumnBody">
              <div>
                Growceries delivers in as little as an hour from local grocery stores.
                Get the best products for the best prices delivered right to your doostep.
              </div>
            </div>
          </div>
          <div className="rightColumn2">

          </div>
        </div>
      </div>
    );
  }
}

const style = {
  margin: 10,
};

export default Login;
