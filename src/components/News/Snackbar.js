import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

function SnackBar({ open, modal, handeleClose }) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handeleClose}
      >
        <Alert color="info" variant='filled' severity="success" style={{color:"#fff"}}>
          News was {modal ? "added" : "updated"} successfully!        
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SnackBar;
