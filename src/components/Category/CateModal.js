import React, { useState, useEffect } from "react";
import ColorPicker from "./ColorPicker";
import Modal from "@material-ui/core/Modal";
import { TextField } from "@material-ui/core";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import { makeStyles, createStyles } from "@material-ui/core/styles";
import { Button } from "@material-ui/core";

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

function CateModal({
  open,
  saveCategory,
  handleClose,
  modal,
  updateData,
  updateCate,
}) {
  const classes = useStyles();
  const initialCategoryState = {
    id: null,
    name: "",
    color: "",
  };

  //Form Validation
  const [validator, setValidator] = useState('');
  const [err, setErr] = useState(false);
  const handleSubmit = (data)=>{
    if(data.name.length === 0){
      setValidator("Name is required!");
      setErr(true);
    } else if(data.name.length<3){
      setValidator("Name must be 3 characters at least!");
      setErr(true);
    }else if(data.name.length>=15){
      setValidator("Name can't be more than 15 characters!");
      setErr(true);
    }else{
      if(modal){
        setErr(false);
        saveCategory(data);
        setCategory(initialCategoryState);
        setValidator("")
      }else{
        setErr(false);
        updateCate(data);
        setUpdate(initialCategoryState);
        setValidator('')
      }
    }

  }

  const [category, setCategory] = useState(initialCategoryState);
  const [update, setUpdate] = useState({});

  useEffect(() => {
    setUpdate(updateData);
  }, [updateData]);

  const pickColor = (colorData) => {
    modal
      ? setCategory({ ...category, color: colorData })
      : setUpdate({ ...update, color: colorData });
  };
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    modal
      ? setCategory({ ...category, [name]: value })
      : setUpdate({ ...update, [name]: value });
  };

  const add = (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        error={err}
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={category.name}
        onChange={handleInputChange}
        style={{ width: "100%", marginBottom: "30px" }}
        name="name"
        helperText={validator}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ColorPicker prevColor={category} pickColor={pickColor} />
      </div>
    </form>
  );

  const upd = (
    <form autoComplete="off" onSubmit={handleSubmit}>
      <TextField
        error={err}
        id="outlined-basic"
        label="Name"
        variant="outlined"
        value={update.name}
        required
        onChange={handleInputChange}
        style={{ width: "100%", marginBottom: "30px" }}
        name="name"
        helperText={validator}
      />
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <ColorPicker pickColor={pickColor} prevColor={update} />
      </div>
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
                onClick={
                    () => {
                        handleSubmit(modal ? category : update)
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

export default CateModal;
