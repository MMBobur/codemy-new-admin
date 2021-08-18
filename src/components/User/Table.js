import React, { useState } from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import Modal from "@material-ui/core/Modal";
import rubbish from "../Category/rubbish.png";

function Table({ posts, deleteId, handleData }) {
  const [open, setOpen] = useState(false);
  const [DelID, setDelID] = useState();

  const handleOpen = (post) => {
    setDelID(post)
    setOpen(true);
  };
  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div>
      <table id="customers">
        <thead>
          <tr>
            <th>ID</th>
            <th>UserName</th>
            <th>Login</th>
            <th>Password</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            return (
              <tr key={post.id}>
                <td>{post.id}</td>
                <td>{post.username}</td>
                <td>{post.login}</td>
                <td>{post.password}</td>
                <td>
                  <IconButton
                    aria-label="delete"
                    color="secondary"
                    onClick={()=>handleOpen(post)}
                  >
                    <DeleteIcon />
                  </IconButton>
                  <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="simple-modal-title"
                    aria-describedby="simple-modal-description"
                  >
                    <div className="head">
                      <div className="father_div">
                        <div className="exit_img">
                          <img src={rubbish} alt="rubbish.png" />
                        </div>
                        <div className="bottom_text">
                          <p>Are you sure you want to delete ?</p>

                          <button onClick={handleClose} className="no_exit">
                            No !
                          </button>
                          <button
                            className="no_exit2"
                            onClick={() => {
                              deleteId(DelID, setOpen(false));
                            }}
                          >
                            Yes, Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </Modal>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
