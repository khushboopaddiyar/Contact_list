import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import ListItemAvatar from "@material-ui/core/ListItemAvatar";
import Avatar from "@material-ui/core/Avatar";
import Divider from "@material-ui/core/Divider";
import Grid from "@material-ui/core/Grid";
import "./App.css";
import { makeStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";
import DialogActions from "@material-ui/core/DialogActions";
import Button from "@material-ui/core/Button";
import { Tab, Tabs } from "@material-ui/core";

import Contact from "./contact";
const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
  },
  inline: {
    display: "inline",
  },
}));

const App = () => {
  const classes = useStyles();
  const [tab, setTab] = useState(0);
  const handleTabChange = (event, newValue) => setTab(newValue);
  let [responseData, setResponseData] = React.useState("");
  let [responseParticularData, setResponseParticularData] = React.useState("");
  let [favouriteList, setFavouriteList] = React.useState([]);

  const [open, setOpen] = React.useState(false);

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = React.useCallback(() => {
    axios({
      method: "GET",
      url: "https://reqres.in/api/users",
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
      },
      params: {
        language_code: "en",
      },
    })
      .then((response) => {
        const sorted = [...response.data.data].sort((a, b) =>
          a.first_name.localeCompare(b.first_name)
        );

        console.log("sorted", sorted);
        setResponseData(sorted);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const fetchParticularData = (id) => {
    console.log(id);
    setOpen(true);
    ParticularData(id);
  };

  const handleFavourite = (obj) => {
    console.log("fav", favouriteList);
    const index = favouriteList.findIndex(
      (_cId) => _cId.data.id === obj.data.id
    );
    console.log(index);
    if (index === -1) {
      setFavouriteList([obj, ...favouriteList]);
    }
    setOpen(false);
  };

  const ParticularData = (id) => {
    axios({
      method: "GET",
      url: `https://reqres.in/api/users/${id}`,
      headers: {
        "content-type": "application/octet-stream",
        "x-rapidapi-host": "quotes15.p.rapidapi.com",
        "x-rapidapi-key": process.env.REACT_APP_API_KEY,
      },
      params: {
        language_code: "en",
      },
    })
      .then((response) => {
        setResponseParticularData(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  React.useEffect(() => {
    fetchData();
  }, [fetchData]);

  console.log("res", favouriteList);
  return (
    <Grid maxWidth="md" style={{ margin: "10px" }}>
      <Tabs
        value={tab}
        indicatorColor="primary"
        onChange={handleTabChange}
        style={{ backgroundColor: "#3498db", color: "white" }}
      >
        <Tab label="Contact List" />
        <Tab label="Favourite Contact" />
      </Tabs>
      {tab === 0 && (
        <>
          <div
            className="App"
            style={{
              marginLeft: "20px",
            }}
          >
            <Grid>
              {responseData &&
                responseData.map((s, index) => (
                  <>
                    <div
                      className="user"
                      onClick={() => fetchParticularData(s.id)}
                    >
                      <List className={classes.root}>
                        <ListItem alignItems="flex-start">
                          <ListItemAvatar>
                            <Avatar alt="Remy Sharp" src={s.avatar} />
                          </ListItemAvatar>
                          <ListItemText>
                            <Typography>
                              {s.first_name}
                              <span> </span>
                              {s.last_name}
                            </Typography>

                            {/* <Typography>{s.email}</Typography> */}
                          </ListItemText>
                        </ListItem>
                        <Divider variant="inset" component="li" />
                      </List>
                    </div>
                    <Contact
                      open={open}
                      onClose={handleClose}
                      responseParticularData={responseParticularData}
                      handleFavourite={handleFavourite}
                    />
                  </>
                ))}
            </Grid>
          </div>
        </>
      )}
      {tab === 1 && (
        <>
          <div
            className="App"
            style={{
              marginLeft: "20px",
            }}
          >
            <Grid>
              {favouriteList.map((s, index) => (
                <>
                  <div className="user">
                    <List className={classes.root}>
                      <ListItem alignItems="flex-start">
                        <ListItemAvatar>
                          <Avatar alt="Remy Sharp" src={s.data.avatar} />
                        </ListItemAvatar>
                        <ListItemText>
                          <Typography>
                            {s.data.first_name}
                            <span> </span>
                            {s.data.last_name}
                          </Typography>

                          {/* <Typography>{s.email}</Typography> */}
                        </ListItemText>
                      </ListItem>
                      <Divider variant="inset" component="li" />
                    </List>
                  </div>
                  <Contact
                    open={open}
                    onClose={handleClose}
                    responseParticularData={responseParticularData}
                    handleFavourite={handleFavourite}
                  />
                </>
              ))}
            </Grid>
          </div>
        </>
      )}
    </Grid>
  );
};
export default App;
