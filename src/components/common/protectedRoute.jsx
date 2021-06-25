import React, { Component } from "react";
import auth from "../../services/authService";
import { Route, Redirect } from "react-router-dom";

const ProtectedRoute = ({ path, component: Component, render, ...rest }) => {
  return (
    <Route
      {...rest} // path={path} when attribute_name === variable_name >>> {...rest}
      render={(props) => {
        console.log("ProtectedRoute props", props);
        if (!auth.getCurrentUser())
          return (
            <Redirect
              to={{
                pathname: "/loginform", //  redirect to login page
                state: { from: props.location }, // passing to next page as a new prop called state
              }}
            />
          );
        return Component ? <Component {...props} /> : render(props);
      }}
    />
  );
};

export default ProtectedRoute;
