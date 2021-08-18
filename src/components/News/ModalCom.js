import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import TextField from "@material-ui/core/TextField";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

import InputLabel from "@material-ui/core/InputLabel";
import MenuItem from "@material-ui/core/MenuItem";
// import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from "@material-ui/core/FormControl";
import Select from "@material-ui/core/Select";

const useStyles = makeStyles((theme) =>
  createStyles({
    root1: {
      "& > *": {
        maxWidth: 500,
      },
      display: "flex",
      justifySelf: "center",
      justifyContent: "center",
    },
    root: {
      width: "100%",
      alignItems: "center",
    },
    formControl: {
      margin: theme.spacing(1),
      minWidth: 150,
    },
    bullet: {
      minWidth: "90%",
      display: "flex",
      transform: "scale(0.9)",
      flexDirection: "column",
      alignSelf: "center",
    },
    alert: {
      width: "100%",
      "& > * + *": {
        marginTop: theme.spacing(2),
      },
    },
  })
);

function ModalCom({
  open,
  saveNews,
  handleClose,
  modal,
  updateData,
  updateCate,
  setImageURL,
  handleSetCategory,
  category
}) {
  const classes = useStyles();
  const initialNewsState = {
    id: null,
    category_id: "",
    title: "",
    text: "",
    author: "",
    data: "",
    image: "",
  };
  const [news, setNews] = useState(initialNewsState);
  const [update, setUpdate] = useState(initialNewsState);
  const [cate, setСate] = useState("1");

  const required = "This field is required!";

  const [title, setTitle] = useState(false);
  const [titleError, setTitleError] = useState(false);
  const [text, setText] = useState(false);
  const [textError, setTextError] = useState(false);
  const [author, setAuthor] = useState(false);
  const [authorError, setAuthorError] = useState(false);
  const [data, setData] = useState(false);
  const [dataError, setDataError] = useState(false);
  const [err, setErr] = useState(false);
  const [categoryIdError, setCategoryIdError] = useState(false);                        
  
  
  const handleSubmit = (data) => {
    // if (cate === false) {
    //   setCategoryIdError(required);
    //   setErr(true);
    //   if (data.title.length === 0) {
    //     setTitleError(required);
    //     setTitle(true);
    //     if (data.text.length === 0) {
    //       setTextError(required);
    //       setText(true);
    //       if (data.author.length === 0) {
    //         setAuthorError(required);
    //         setAuthor(true);
    //         if (data.data.length === 0) {
    //           setDataError(required);
    //           setData(true);
    //         }
    //       }
    //     }
    //   }else if(data.title.length===0) {

    //   }
    // } else if (data.title.length === 0) {
    //   setTitleError(required);
    //   setTitle(true);
    //   setCategoryIdError("");
    //   setErr(false);
    //   if (data.text.length === 0) {
    //     setTextError(required);
    //     setText(true);
    //     if (data.author.length === 0) {
    //       setAuthorError(required);
    //       setAuthor(true);
    //       if (data.data.length === 0) {
    //         setDataError(required);
    //         setData(true);
    //       }
    //     }
    //   }
    // } else if (data.text.length === 0) {
    //   setTextError(required);
    //   setText(true);
    //   setTitleError("");
    //   setTitle(false);
    //   if (data.author.length === 0) {
    //     setAuthorError(required);
    //     setAuthor(true);
    //     if (data.data.length === 0) {
    //       setDataError(required);
    //       setData(true);
    //     }
    //   }
    // } else if (data.author.length === 0) {
    //   setAuthorError(required);
    //   setAuthor(true);
    //   setTextError("");
    //   setText(false);
    //   if (data.data.length === 0) {
    //     setDataError(required);
    //     setData(true);
    //   }
    // } else if (data.data.length === 0) {
    //   setDataError(required);
    //   setData(true);
    //   setAuthorError("");
    //   setAuthor(false);
    // } else {
    //   if (modal) {
    //     setDataError("");
    //     setErr(false);
    //     setTitle(false);
    //     setText(false);
    //     setAuthor(false);
    //     setData(false);
    //     saveNews(data);
    //     setNews(initialNewsState);
    //     setСate(false);
    //   } else {
    //     setDataError("");
    //     setErr(false);
    //     setTitle(false);
    //     setText(false);
    //     setAuthor(false);
    //     setData(false);
    //     updateCate(data);
    //     setСate(false);
    //     setUpdate(initialNewsState);
    //   }
    // }
    if (data.title.length === 0) {
      setTitleError(required);
      setTitle(true);
      setErr(false);
    } else if (data.title.length < 5) {
      setTitleError("Title must   be 5 characters at least!");
      setTitle(true);
      setErr(false);
    }else if (data.text.length === 0) {
      setTitleError("");
      setTextError(required);
      setText(true);
      setTitle(false);
    } else if (data.text.length < 5) {
      setTitleError("");
      setTextError("Title must be 5 characters at least!");
      setText(true);
      setTitle(false);
    }else if (data.author.length === 0) {
      setTextError("");
      setAuthorError(required);
      setAuthor(true);
      setText(false);
    } else if (data.author.length < 5) {
      setTextError("");
      setAuthorError("Title must be 5 characters at least!");
      setAuthor(true);
      setText(false);
    }else if (data.data.length === 0) {
      setAuthorError("");
      setDataError(required);
      setData(true);
      setAuthor(false);
    }else {
      if (modal) {
      setDataError("");
        setErr(false);
        setTitle(false);
        setText(false);
        setAuthor(false);
        setData(false);
        saveNews(data);
        setNews(initialNewsState);
      } else {
      setDataError("");
        setErr(false);
        setTitle(false);
        setText(false);
        setAuthor(false);
        setData(false);
        updateCate(data);
        setUpdate(initialNewsState);
      }
    }
  };

  useEffect(() => {
    setUpdate(updateData);
  }, [updateData]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    modal
      ? setNews({ ...news, [name]: value })
      : setUpdate({ ...update, [name]: value });
  };

  const ddd = (e) => {
    setImageURL(e.target.files[0]);
  };
  const handleChange = (event) => {
    setСate(event.target.value);
    // Category_ID(event.target.value);
    handleSetCategory(event.target.value)
  };

  const add = (
    <form autoComplete="off">
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-simple-select-label" >
          Choose category
        </InputLabel>
        <Select
           labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={cate}
          onChange={handleChange}
          // label="Age"
          error={err}
        >
          {category.map((cat) => {
            return (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <br />
      <br />
      <br />
      <TextField
        id="outlined-basic"
        label="Title"
        error={title}
        variant="outlined"
        value={news.title}
        onChange={handleInputChange}
        style={{ width: "100%", marginBottom: "30px" }}
        name="title"
        helperText={titleError}
      />
      <TextField
        id="outlined-basic"
        label="Text"
        error={text}
        variant="outlined"
        value={news.text}
        onChange={handleInputChange}
        style={{ width: "100%", marginBottom: "30px" }}
        name="text"
        helperText={textError}
      />
      <TextField
        id="outlined-basic"
        label="Author"
        variant="outlined"
        value={news.author}
        onChange={handleInputChange}
        style={{ width: "100%", marginBottom: "30px" }}
        name="author"
        error={author}
        helperText={authorError}
      />
      <TextField
        value={news.data}
        id="date"
        label="Data"
        type="date"
        onChange={handleInputChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        name="data"
        error={data}
        helperText={dataError}
      />
      <br />
      <br />
      <label htmlFor="upload-photo">
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          onChange={ddd}
        />
        <Button
          color="primary"
          variant="contained"
          component="span"
          style={{ marginBottom: "20px" }}
        >
          Upload Image
        </Button>
      </label>
    </form>
  );
  const upd = (
    <form autoComplete="off">
      <FormControl variant="outlined" className={classes.formControl}>
        <InputLabel id="demo-simple-select-outlined-label">
          Category ID
        </InputLabel>
        <Select
          labelId="demo-simple-select-outlined-label"
          id="demo-simple-select-outlined"
          value={cate}
          onChange={handleChange}
          label="Age"
        >
          {category.map((cat) => {
            return (
              <MenuItem key={cat.id} value={cat.id}>
                {cat.name}
              </MenuItem>
            );
          })}
        </Select>
      </FormControl>
      <br />
      <TextField
        id="outlined-basic"
        label="Title"
        variant="outlined"
        value={update.title}
        onChange={handleInputChange}
        style={{ width: "100%", marginBottom: "30px" }}
        name="title"
      />
      <TextField
        id="outlined-basic"
        label="Text"
        variant="outlined"
        value={update.text}
        onChange={handleInputChange}
        style={{ width: "100%", marginBottom: "30px" }}
        name="text"
      />
      <TextField
        id="outlined-basic"
        label="Author"
        variant="outlined"
        value={update.author}
        onChange={handleInputChange}
        style={{ width: "100%", marginBottom: "30px" }}
        name="author"
      />
      <TextField
        value={update.data}
        id="date"
        label="Data"
        type="date"
        onChange={handleInputChange}
        className={classes.textField}
        InputLabelProps={{
          shrink: true,
        }}
        name="data"
      />
      <br />
      <br />
      <label htmlFor="upload-photo">
        <input
          style={{ display: "none" }}
          id="upload-photo"
          name="upload-photo"
          type="file"
          onChange={ddd}
        />
        <Button
          color="primary"
          variant="contained"
          component="span"
          style={{ marginBottom: "20px" }}
        >
          Upload Image
        </Button>
      </label>
    </form>
  );

  return (
    <div>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="simple-modal-title"
        aria-describedby="simple-modal-description"
      >
        <div className={classes.root1}>
          <Card className={classes.root} variant="outlined">
            <CardContent className={classes.bullet}>
              {modal ? add : upd}
              <Button
                size="medium"
                color="primary"
                variant="contained"
                type="submit"
                onClick={
                  () => {
                    handleSubmit(modal ? news : update);
                  }
                }
                style={{
                  width: "100%",
                  padding: "15px 0px",
                  alignSelf: "center",
                }}
              >
                {modal ? "Add" : "Update"}
              </Button>
            </CardContent>
          </Card>
        </div>
      </Modal>
    </div>
  );
}

export default ModalCom;
