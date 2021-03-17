import React, { Component } from "react";
import "./App.css";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Stores from "./components/Stores"
import Profile from "./components/Profile";
import PrivateRoute from "./components/PrivateRoute";
import Footer from "./components/Footer";
class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loginPage: [],
      uploadScreen: []
    };
  }
  render() {
    return (
      <div className="page-container">
        <Router>
          <div className="content-wrap">
            <Switch>
              <Route exact path="/" component={Login} />
              <Route exact path="/signup" component={Signup} />
              <PrivateRoute exact path="/home/stores" component={Stores} />
              <PrivateRoute exact path="/profile" component={Profile} />
              <Route exact component={Error} />
            </Switch>
          </div>
          <Footer />
        </Router>
      </div>
    );
  }
}
const style = {
  margin: 15
};

export default App;
