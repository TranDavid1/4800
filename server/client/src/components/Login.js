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
import { Result } from "express-validator";
import Img from "./images/GroceryStore.jpg";
import Img2 from "./images/cartoondelivery.jpg";
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
      accesstoken: "",
      // message: ""
    };

    this.handleChange = this.handleChange.bind(this);
    this.signin = this.signin.bind(this);
  }
  handleChange(event) {
    this.setState({
      [event.target.name]: event.target.value
    });
  }
  // Testing
  signin = () => {
    const { email, password } = this.state;
    fetch('/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email,
        password: password,
      }),
    }).then((Response) => Response.json())
      .then((json) => {
        if (json.message) {
          console.log(json.message);
          alert("User does not exist");
        } else {
          this.setState({
            accesstoken: "Bearer " + json.accesstoken
          })
          console.log(this.state.accesstoken);
          localStorage.setItem("user", JSON.stringify(json));
          this.props.history.push("/home/stores");
        }
      })
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
              <div className="signInFields">
                <TextField
                  variant="standard"
                  type="email"
                  name="email"
                  label="Email"
                  color="primary"
                  value={this.state.email}
                  onChange={this.handleChange}
                ></TextField>
              </div>
              <br />
              <div className="signInFields">
                <TextField
                  variant="standard"
                  type="password"
                  name="password"
                  label="Password"
                  color="primary"
                  value={this.state.password}
                  onChange={this.handleChange}
                ></TextField>
              </div>
              <br />
              <div className="signInFields">
                <Button
                  onClick={this.signin}
                  /*component={Link} to="/Stores"*/
                  variant="contained"
                  type="submit"
                  color="primary"
                  style={style}>
                  Sign In
                </Button>
              </div>
              <div>
                <h3>
                  New to Growceries?
                  <Button
                    component={Link}
                    to="/Signup"
                    variant="contained"
                    color="primary"
                    style={style}>
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
        // add new here
        <div className="row">
          <div className="leftColumn3">
            <h2 className="localStoresHeading">
              Support Local Grocery Stores
                        </h2>
            <div className="localStoresBody">
              <div>
                Shopping local helps local businesses and it also means your groceries
                arrive in a timely manner.
                            </div>
              <img src={Img} alt="groceryStore" width="auto" height="150" />
            </div>
          </div>
          <div className="rightColumn3">
            <h2 className="driversHeading">
              Great Delivery Drivers
                        </h2>
            <div className="driversBody">
              Our delivery drivers are carefully selected in order to ensure great service.
                        </div>
            <img src={Img2} alt="deliverydriver" width="auto" height="150" />
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
