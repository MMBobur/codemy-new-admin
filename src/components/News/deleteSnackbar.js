import React from "react";
import { Snackbar } from "@material-ui/core";
import { Alert } from "@material-ui/lab";

function SnackBar({ open, handleClose}) {
  return (
    <div>
      <Snackbar
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        open={open}
        autoHideDuration={2000}
        onClose={handleClose}
      >
        <Alert color="info" variant='filled' severity="success">
          Category was deleted successfully!
        </Alert>
      </Snackbar>
    </div>
  );
}

export default SnackBar;
