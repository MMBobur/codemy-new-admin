import React, { useState, useEffect } from "react";
import Form from "./Form";
import Navbar from '../Navbar/Navbar';
import service from "../../utils/service";
import SnackBar from "./Snackbar";
import ModalCom from "./ModalCom";
import DeleteSnackbar from './deleteSnackbar';
import "./News.css";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Grid, Paper, Box, Container, Button } from "@material-ui/core";

const useStyles = makeStyles((theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    paper: {
      padding: theme.spacing(),
      textAlign: "center",
      color: theme.palette.text.secondary,
    },
  })
);

export default function News() {
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [posts, setPosts] = useState([]);
  
  const [category_id, setCategory_id] = useState('');

  const [image, setImage] = useState('');
  const [Category_ID, setCategory_Id] = useState("");
  const [Category_IDU, setCategory_IdU] = useState("");
  const [openDeleteSnackbar, setOpenDeleteSnackbar] = useState(false);

  const [modal, setModal] = useState(false);
  const [refresh, setRefresh] = useState(false);
  const [updateData, setUpdateData] = useState({});
  const [id, setId] = useState(null);
  const [category, setCategory] = useState([]);

  const [openSnackbar, setOpenSnackbar] = useState(false);  


  const closeSnackbar = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
    setOpenDeleteSnackbar(false);
  };

  useEffect(() => {
    service
      .getAll("/category")
      .then((res) => {
        setCategory(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  },[]);

  const handleData = (postData) => {
    setId(postData.id);
    setUpdateData({
      ...postData,
    });
    setCategory_id(postData.category_id);    
    setModal(false);
    setOpen(true);

  };

  useEffect(() => {
    service
      .getOne("/news", id)
      .then((res) => {
        setUpdateData({
          ...res.data,
        });
      })
      .catch((err) => {
        console.log("Get one err: ", err);
      });
  }, [id]);

  useEffect(() => {
    service
      .getAll("/news")
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

  const handleSetCategory = (id) => {
    setCategory_Id(id)
  }
  const handleCategory = (id) => {
    setCategory_IdU(id)
  }

  const token = localStorage.getItem("token");
  const saveNews = (data) => {
    let formData = new FormData();
    formData.append("image", image);
    formData.append("category_id", Category_ID);
    formData.append("title", data.title);
    formData.append("text", data.text);
    formData.append("author", data.author);
    formData.append("data", data.data);
    service
      .create("/news", formData,token)
      .then((res) => {
        setOpen(false);
        setOpenSnackbar(true)
        setRefresh(!refresh);
        setTimeout(closeSnackbar,3000)
      })
      .catch((err) => {
        console.log("Create err: " + err);
      });
  };

  const updateCate = (data) => {
    let formData = new FormData();
    formData.append("image", image);
    formData.append("category_id", Category_IDU);
    formData.append("title", data.title);
    formData.append("text", data.text);
    formData.append("author", data.author);
    formData.append("data", data.data);

    service
      .update("/news", data.id, formData,token)
      .then((res) => {
        setOpen(false);
        setOpenSnackbar(true)
        setRefresh(!refresh);
        setTimeout(closeSnackbar,3000)

      })
      .catch((err) => console.log("Update err: ", err));
  };
  
  const deleteId = (postId) => {
    service
      .remove("/news", postId.id, token)
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
        <Grid
          container
          spacing={2}
          style={{
            marginTop: "20px",
          }}
        >
          <Grid item xs={4}>
            <Paper className={classes.paper}>
              <h3> News </h3>
            </Paper>
          </Grid>
          <Grid item xs={1} id="removeGrid"></Grid> <Grid item xs={5}></Grid>
          <Grid item xs={2}>
            <Paper className={classes.paper}>
              <Button color="primary" onClick={handleOpen} >
                Add new
              </Button>
            </Paper>
          </Grid>
        </Grid>
        <Form posts={posts} deleteId={deleteId} handleData={handleData} />
      </Container>
      <ModalCom
        category_id={category_id}
        open={open}
        handleClose={handleClose}
        saveNews={saveNews}
        updateCate={updateCate}
        updateData={updateData}
        modal={modal}
        handleSetCategory = {handleSetCategory}
        handleCategory = {handleCategory}
        setImageURL={setImage}
        category={category}
        image={image}
      />
      <SnackBar open={openSnackbar}  modal={modal} handleClose={closeSnackbar}/>
      <DeleteSnackbar open={openDeleteSnackbar} handleClose={closeSnackbar} />
    </Box>
    </>
    
  );
}
