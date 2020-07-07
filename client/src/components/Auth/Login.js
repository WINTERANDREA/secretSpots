import React, { useContext } from "react";
import { GraphQLClient } from "graphql-request";
import { withStyles } from "@material-ui/core/styles";
import { GoogleLogin } from "react-google-login";
// import Typography from "@material-ui/core/Typography";

import Context from "../../context";
import { Typography } from "@material-ui/core";
import { ME_QUERY } from "../../graphql/queries";

const Login = ({ classes }) => {
  const { dispatch } = useContext(Context);

  const onSuccess = async (googleUser) => {
    try {
      const idToken = googleUser.getAuthResponse().id_token;
      const client = new GraphQLClient("http://localhost:4000/graphql", {
        headers: { authorization: idToken },
      });
      const data = await client.request(ME_QUERY);
      console.log({ data });
      dispatch({ type: "LOGIN_USER", payload: data.me });
      dispatch({ type: "IS_LOGGED_IN", payload: googleUser.isSignedIn() });
      console.log(googleUser);
    } catch (err) {
      onFailure(err);
    }
  };

  const onFailure = (err) => {
    console.error("Error logging in", err);
  };

  return (
    <div className={classes.root}>
      <Typography
        component="h1"
        variant="h3"
        gutterBottom
        noWrap
        style={{ color: "rgb(66,133,244" }}
      >
        Welcome
      </Typography>
      <GoogleLogin
        clientId="716296216845-lhhlkkfin69ddflvh3n9t953u9k32g4t.apps.googleusercontent.com"
        onSuccess={onSuccess}
        onFailure={onFailure}
        isSignedIn={true}
        theme="dark"
        buttonText="Login with Google"
      />
    </div>
  );
};

const styles = {
  root: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
    alignItems: "center",
  },
};

export default withStyles(styles)(Login);
