import React,{useState} from "react";
import DeleteIcon from "@material-ui/icons/Delete";
import IconButton from "@material-ui/core/IconButton";
import EditIcon from "@material-ui/icons/Edit";
import Modal from "@material-ui/core/Modal";
import rubbish from "./rubbish.png";

function Form({ posts, deleteId, handleData }) {
  const [open, setOpen] = useState(false);
  const [clearPost, setClearPost] = useState();

  const handleOpen = (post) => {
    setClearPost(post);
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
            <th>Category ID</th>
            <th>ID</th>
            <th>Title</th>
            <th>text</th>
            <th>Author</th>
            <th>Data</th>
            <th>Image</th>
            <th>Actions</th>

          </tr>
        </thead>
        <tbody>
          {posts.map((post) => {
            return (
              <tr key={post.id}>
                <td>{post.category_id}</td>
                <td>{post.id}</td>
                <td>{post.title}</td>
                <td>{post.text}</td>
                <td>{post.author}</td>
                <td>{post.data}</td>
                <td>
                  <img
                    src={post.image}
                    alt={post.image}
                    className="news-form-img"
                  />
                </td>
                <td>
                  <IconButton
                    aria-label="delete"
                    color="primary"
                    onClick={() => {
                      handleData(post)
                    }}
                  >
                    <EditIcon />
                  </IconButton>
                
                  <IconButton
                   onClick={()=>{handleOpen(post)}}
                   aria-label="delete"
                    color="secondary"
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
                              deleteId(clearPost); 
                              setOpen(false)
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

export default Form;
