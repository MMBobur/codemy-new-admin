import React, { useState, useEffect } from "react";
import Table from "./Table";
import Navbar from "../Navbar/Navbar";
import service from "../../utils/service";
import SnackBar from "./Snackbar";
import CateModal from "./CateModal";
import DeleteSnackbar from "./deleteSnackbar";
import "./Category.css";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Paper, Button, Box, Container } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    paper: {
      padding: theme.spacing(),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

export default function Category() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);
  const [updateData, setUpdateData] = useState({});
  // const [id, setId] = useState(null);

  const closeSnackbar = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
    setOpenDeleteSnackbar(false);
  };

  const handleData = (postData) => {
    // setId(postData.id);
    setUpdateData({ ...postData });
    setModal(false);
    setOpen(true);
  };

  // const getOne = () => {
  //   service
  //     .getOne("/category", id)
  //     .then((res) => {
  //       setUpdateData({ ...res.data });
  //     })
  //     .catch((err) => {
  //       console.log("Get one err: ", err);
  //     });
  // };

  useEffect(() => {
    service
      .getAll("/category")
      .then((res) => {
        setPosts(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [refresh]);

  const handleOpen = () => {
    setOpen(true);
    setModal(true);
    setRefresh(!refresh);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const token = localStorage.getItem("token");
  const saveCategory = (data) => {
    service
      .create("/category", data, token)
      .then((res) => {
        setOpen(false);
        setOpenSnackbar(true);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log("Create err: " + err);
      });
  };

  const updateCate = (newData) => {
    service
      .update("/category", newData.id, newData, token)
      .then((res) => {
        setOpen(false);
        setOpenSnackbar(true);
        setRefresh(!refresh);
      })
      .catch((err) => {
        console.log("Update err: ", err);
      });
  };

  const deletId = (postId) => {
    // console.log(postId);
    service
      .remove("/category", postId.id, token)
      .then((res) => {
        setOpenDeleteSnackbar(true);
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
                <h3>Categories</h3>
              </Paper>
            </Grid>
            <Grid item xs={1} id="removeGrid"></Grid>
            <Grid item xs={5}></Grid>
            <Grid item xs={2}>
              <Paper className={classes.paper}>
                <Button color="primary" onClick={handleOpen} open={open}>
                  Add new
                </Button>
              </Paper>
            </Grid>
          </Grid>
          <Table posts={posts} deletId={deletId} handleData={handleData} />
        </Container>
        <CateModal
          open={open}
          handleClose={handleClose}
          saveCategory={saveCategory}
          updateCate={updateCate}
          updateData={updateData}
          modal={modal}
        />
        <SnackBar
          open={openSnackbar}
          handleClose={closeSnackbar}
          modal={modal}
        />
        <DeleteSnackbar open={openDeleteSnackbar} handleClose={closeSnackbar} />
      </Box>
    </>
  );
}
