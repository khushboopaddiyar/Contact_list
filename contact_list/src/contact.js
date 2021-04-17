import React from "react";
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
import Card from "@material-ui/core/Card";
import CardActionArea from "@material-ui/core/CardActionArea";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardMedia from "@material-ui/core/CardMedia";
const useStyles = makeStyles((theme) => ({
  root: {
    width: 200,
    height: 380,
  },
  inline: {
    display: "inline",
  },
}));
const Contact = (props) => {
  const classes = useStyles();
  const { onClose, open, responseParticularData } = props;
  console.log(props);

  const handleClose = () => {
    onClose();
  };
  console.log(responseParticularData);
  return (
    <Dialog
      onClose={handleClose}
      aria-labelledby="simple-dialog-title"
      open={open}
    >
      <DialogContent dividers>
        {responseParticularData && (
          <Card className={classes.root}>
            <CardActionArea style={{ alignItems: "center", padding: 10 }}>
              <img
                width="100%"
                alt="Remy Sharp"
                src={responseParticularData.data.avatar}
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="h2">
                  {responseParticularData.data.first_name}
                  <span> </span>
                  {responseParticularData.data.last_name}
                </Typography>
                <Typography variant="body2" color="textSecondary" component="p">
                  {responseParticularData.data.email}
                </Typography>
              </CardContent>
            </CardActionArea>
            <Grid style={{ alignItems: "center" }}>
              <Button
                autoFocus
                onClick={() => props.handleFavourite(responseParticularData)}
                color="primary"
                style={{ marginLeft: 20 }}
              >
                Add to Favourite
              </Button>
            </Grid>
          </Card>
        )}
      </DialogContent>
      <DialogActions>
        <Button autoFocus onClick={handleClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Contact;
