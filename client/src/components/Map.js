import React, { useState, useEffect, useContext } from "react";
import ReactMapGL, { NavigationControl, Marker } from "react-map-gl";
import { withStyles } from "@material-ui/core/styles";
import PinIcon from "./PinIcon";
import Blog from "./Blog";
import Context from "../context";
// import Button from "@material-ui/core/Button";
// import Typography from "@material-ui/core/Typography";
// import DeleteIcon from "@material-ui/icons/DeleteTwoTone";

const INITIAL_VIEWPORT = {
  latitude: 45.544558,
  longitude: 9.009665,
  zoom: 13,
};

const Map = ({ classes }) => {
  const { state, dispatch } = useContext(Context);
  const [viewport, setViewport] = useState(INITIAL_VIEWPORT);
  const [userPosition, setUserPosition] = useState(null);

  useEffect(() => {
    getUserPosition();
  }, []);

  const getUserPosition = () => {
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition((position) => {
        const { latitude, longitude } = position.coords;
        setViewport({ ...viewport, latitude, longitude });
        setUserPosition({ latitude, longitude });
      });
    }
  };

  const handleClickMap = (event) => {
    if (!event.leftButton) return;
    if (!state.draft) {
      dispatch({ type: "CREATE_DRAFT" });
    }
    const [longitude, latitude] = event.lngLat;
    dispatch({
      type: "UPDATE_DRAFT_POSITION",
      payload: {
        longitude,
        latitude,
      },
    });
  };

  return (
    <div className={classes.root}>
      <ReactMapGL
        width="100vw"
        height="calc(100vh - 64px)"
        mapStyle="mapbox://styles/mapbox/streets-v11"
        mapboxApiAccessToken="pk.eyJ1IjoiYW5kcmVhOTF3aW50ZXIiLCJhIjoiY2tjYnhrM2thMG5oZjJ0dW5qMHlpNWdoYiJ9.XpHQLYyn4vp8ylKkDC5azA"
        onViewportChange={(newViewport) => setViewport(newViewport)}
        onClick={handleClickMap}
        {...viewport}
      >
        {/* Navigation Control */}
        <div className={classes.navigationControl}>
          <NavigationControl
            onViewportChange={(newViewport) => setViewport(newViewport)}
          />
        </div>
        {userPosition && (
          <Marker
            latitude={INITIAL_VIEWPORT.latitude}
            longitude={INITIAL_VIEWPORT.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="blue" />
          </Marker>
        )}

        {/* Draft Pin */}
        {state.draft && (
          <Marker
            latitude={state.draft.latitude}
            longitude={state.draft.longitude}
            offsetLeft={-19}
            offsetTop={-37}
          >
            <PinIcon size={40} color="hotpink" />
          </Marker>
        )}
      </ReactMapGL>

      {/* Blog Area to add Pin Content */}
      <Blog />
    </div>
  );
};

const styles = {
  root: {
    display: "flex",
  },
  rootMobile: {
    display: "flex",
    flexDirection: "column-reverse",
  },
  navigationControl: {
    position: "absolute",
    top: 0,
    left: 0,
    margin: "1em",
  },
  deleteIcon: {
    color: "red",
  },
  popupImage: {
    padding: "0.4em",
    height: 200,
    width: 200,
    objectFit: "cover",
  },
  popupTab: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
  },
};

export default withStyles(styles)(Map);
