import React, { useState } from "react";
import { Link } from "react-router-dom";
import * as FaIcons from "react-icons/fa";
import * as AiIcons from "react-icons/ai";
import { SidebarData } from "./SidebarData";
import exit_photo from "../images/exit.png";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import Modal from "@material-ui/core/Modal";
import "./Navbar.css";
import "./logout.css";
import { IconContext } from "react-icons";
import {useSelector, useDispatch} from 'react-redux';
import { signOut } from '../store/actions';

function Navbar() {
  const dispatch = useDispatch();
  
  const handleLogout = () => {
    dispatch(signOut());
  };
  

  const [sidebar, setSidebar] = useState(false);
  const [open, setOpen] = useState(false);
  const showSidebar = () => setSidebar(!sidebar);

  const auth = useSelector((state) => state.loggedIn);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const body = (
    <div className="head">
      <div className="father_div">
        <div className="exit_img">
          <img src={exit_photo} alt="exit.png" />
        </div>
        <div className="bottom_text">
          <p>
            Oh no! You're leaving... <br /> Are you sure ?{" "}
          </p>

          <button onClick={handleClose} className="no_exit">
            No !
          </button>
          <button className="no_exit2" onClick={handleLogout}>Yes, Log Me Out</button>
        </div>
      </div>
    </div>
  );


  return auth ?(
    <>
      <IconContext.Provider value={{ color: "#fff" }}>
        <div className="navbar">
          <Link to="#" className="menu-bars">
            <FaIcons.FaBars onClick={showSidebar} />
          </Link>
        </div>
        <nav className={sidebar ? "nav-menu active" : "nav-menu"}>
          <ul className="nav-menu-items" onClick={showSidebar}>
            <li className="navbar-toggle">
              <Link to="#" className="menu-bars">
                <AiIcons.AiOutlineClose className="xIcon" />
              </Link>
            </li>
            {SidebarData.map((item, index) => {
              return (
                <li key={index} className={item.cName}>
                  <Link to={item.path}>
                    <span className='span_title'>{item.title}</span>
                    <span className="icons">{item.icon}</span>
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      </IconContext.Provider>

      <div>
        <button className="logout_div" onClick={handleOpen}>
          Logout
          <PowerSettingsNewIcon className="power" />
        </button>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="simple-modal-title"
          aria-describedby="simple-modal-description"
        >
          {body}
        </Modal>
      </div>
    </>
  ) : (
    ""
  );
};

export default Navbar;
