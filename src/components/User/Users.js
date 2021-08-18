import React, { useState, useEffect } from "react";
import Table from "./Table";
import service from "../../utils/service";
import "./User.css";
import Navbar from "../Navbar/Navbar";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Paper, Box, Container } from "@material-ui/core";
import SnackBar from "./Snackbar";

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

export default function Users() {
  const classes = useStyles();
  const [posts, setPosts] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  // const [id, setId] = useState(null);
  // const [open, setOpen] = useState(false);
  // const [modal, setModal] = useState(false);

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };
  const token = localStorage.getItem("token");

  const handleData = (postData) => {
    // setId(postData.id);
    // setUpdateData({ ...postData });
    // setModal(false);
    // setOpen(true);
  };
  useEffect(() => {
    service
      .getAll("/users")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const deleteId = (postId) => {
    service
      .remove("/users", postId.id, token)
      .then((res) => {
        setOpenSnackbar(true);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log("Delete err: " + err);
      });
  };

  return (
    <>
      <Navbar />
      <Box>
        <Container>
          <Grid container spacing={2} style={{ marginTop: "20px" }}>
            <Grid item xs={4}>
              <Paper className={classes.paper}>
                <h3>Users</h3>
              </Paper>
            </Grid>
            <Grid item xs={1} id="removeGrid"></Grid>
            <Grid item xs={5}></Grid>
            <Grid item xs={2}></Grid>
          </Grid>
          <Table posts={posts} deleteId={deleteId} handleData={handleData} />
        </Container>
        <SnackBar open={openSnackbar} handleClose={closeSnackbar} />
      </Box>
    </>
  );
}
