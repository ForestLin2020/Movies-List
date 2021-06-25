import React, { Component } from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Movies from "./components/Movie";
import NavBar from "./components/navbar";
import Rentals from "./components/Rentals";
import Customers from "./components/Custormers";
import NotFound from "./components/Notfound";
import LoginForm from "./components/loginForm";
import RegisterForm from "./components/registerfrom";
import MovieForm from "./components/movieform";
import ProtectedRoute from "./components/common/protectedRoute";
import Logout from "./components/logout";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";
import auth from "./services/authService";

class App extends Component {
  state = {};

  componentDidMount() {
    const user = auth.getCurrentUser();
    this.setState({ user });
  }

  render() {
    const { user } = this.state;

    return (
      <React.Fragment>
        <ToastContainer />
        <NavBar user={user} />
        <main className="container">
          <div className="content">
            <Switch>
              <Route path="/loginform" component={LoginForm} />
              <Route path="/logout" component={Logout} />
              <Route path="/registerform" component={RegisterForm} />

              <ProtectedRoute path="/movies/:id" component={MovieForm} />

              <Route
                path="/movies"
                render={(props) => <Movies {...props} user={user} />}
              />
              <Route path="/customers" component={Customers} />
              <Route path="/rentals" component={Rentals} />
              <Route path="/not-found" component={NotFound} />
              <Redirect from="/" exact to="movies" />
              <Redirect to="not-found" />
            </Switch>
          </div>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
