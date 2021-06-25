import React, { Component } from "react";
import Joi from "joi-browser";
import Input from "./input";
import Select from "./select";

class Form extends Component {
  state = {
    data: {},
    errors: {},
  };

  // validate all input box when submit form
  validate = () => {
    const option = { abortEarly: false };
    const { error } = Joi.validate(this.state.data, this.schema, option);
    if (!error) return null;

    const errors = {};
    for (let item of error.details) errors[item.path[0]] = item.message;
    // console.log(errors);
    return errors;
  };

  // validate single input box right immediately
  validateProperty({ name, value }) {
    const obj = { [name]: value };
    const schema = { [name]: this.schema[name] };
    const { error } = Joi.validate(obj, schema);
    return error ? error.details[0].message : null;
  }

  // arrow function, either call as a function or pass as an reference
  handleSubmit = (e) => {
    e.preventDefault();

    const errors = this.validate(); // checking is there any errors

    // update errors or {} empty object, because
    // TypeError: Cannot read property 'username' of null
    this.setState({ errors: errors || {} });
    if (errors) return; // errors are true than Submit cannot complete the function

    // Getting username and password from input box
    // ===== HTML Way, cannot use in React =====
    // const username = document.getElementById("username").value;
    // ===== React Way =====
    // const username = this.username.current.value;
    // console.log("username", username);
    this.doSubmit();
  };

  // arrow function, either call as a function or pass as an reference
  handleInputChange = ({ currentTarget: input }) => {
    // currentTarget: <input name="" type="" class="" value="" ...>
    // console.log("currentTarget", input);

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value; // input.name="username" or input.name="password"
    this.setState({ data, errors });
    // console.log("data", data);
  };

  handleSelectChange = ({ target: input }) => {
    // console.log(e);
    // console.log(e.target.value);

    const errors = { ...this.state.errors };
    const errorMessage = this.validateProperty(input);
    if (errorMessage) errors[input.name] = errorMessage;
    else delete errors[input.name];

    const data = { ...this.state.data };
    data[input.name] = input.value; // input.name="username" or input.name="password"
    this.setState({ data, errors });
    // console.log("data", data);
  };

  // helper rendering methods, only call as a function
  renderButton(label) {
    return (
      <button
        disabled={this.validate()} // Call this function and get immediately return
        type="submit"
        className="btn btn-primary"
      >
        {label}
      </button>
    );
  }

  // helper rendering methods, only call as a function
  renderInput(name, label, type = "text") {
    const { data, errors } = this.state;
    return (
      <Input
        type={type}
        name={name}
        label={label}
        value={data[name]}
        onChange={this.handleInputChange} // An Event Handler passes the function reference to another child-component via props
        error={errors[name]}
      />
    );
  }

  renderCheckBox(label) {
    return (
      <div className="mb-3 form-check">
        <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        />
        <label className="form-check-label" htmlFor="exampleCheck1">
          {label}
        </label>
      </div>
    );
  }

  renderSelection(name, label, options) {
    const { data, errors } = this.state;
    return (
      <Select
        name={name}
        value={data[name]}
        label={label}
        options={options}
        onChange={this.handleSelectChange}
        error={errors[name]}
      />
    );
  }
}

export default Form;
