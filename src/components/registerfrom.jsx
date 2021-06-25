import React from "react";
import Form from "./common/form";
import Joi from "joi-browser";
import * as userService from "../services/userService";
import auth from "../services/authService";

class RegisterForm extends Form {
  state = {
    data: { email: "", password: "", name: "" },
    errors: {},
  };

  schema = {
    email: Joi.string().required().label("Email").email(),
    password: Joi.string().required().label("Password").min(5), //.min(3)
    name: Joi.string().required().label("Name"), //.min(3)
  };

  doSubmit = async () => {
    try {
      // try this first
      const response = await userService.register(this.state.data); // input my website box data into backend(userService).

      auth.loginWithJwt(response.headers["x-auth-token"]);
      // console.log(response.headers["x-auth-token"]);

      // window.location = "/", go back to home page and reload it
      // because home page need to run the cdm again for rendering token on Navbar
      window.location = "/";
    } catch (ex) {
      // if try was wrong then run catch and dealing with catching error
      if (ex.response && ex.response.status === 400) {
        // ex.response: client getting response and the error code is 400
        const errors = { ...this.state.errors }; // clone errors
        errors.email = ex.response.data; // typing a new email that is already exist in Database for checking and handling the errors issues.
        this.setState({ errors });
      }
    }
  };

  render() {
    return (
      <div>
        <h1>Register</h1>
        <form onSubmit={this.handleSubmit}>
          {this.renderInput("email", "Email", "email")}
          {this.renderInput("password", "Password", "password")}
          {this.renderInput("name", "Name")}
          {this.renderCheckBox("Check Register out")}
          {this.renderButton("Register")}
        </form>
      </div>
    );
  }
}

export default RegisterForm;
