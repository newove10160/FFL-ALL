import React, { useState, useEffect } from "react";
import "./topbar.css";
import { Search, Chat, Notifications, AutoStories } from "@mui/icons-material";
import { Link } from "react-router-dom";
import { useContext, useRef } from "react";
import { AuthContext } from "../../context/AuthContext";
import { loginCall } from "../../apiCalls";
import axios from "axios";
import Button from "@mui/material/Button";

export default function Topbar() {
  const { user } = useContext(AuthContext);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { dispatch } = useContext(AuthContext);
  const [searchInput, setSearchInput] = useState("");

  const fetchSearch = async () => {
    try {
      const res = await axios.get("/posts/feeds/search/" + searchInput);
      console.log("success");
      console.log(res)
    } catch (err) {
      console.log(err);
    }
  };

  const handleClickLogout = (e) => {
    e.preventDefault();
    loginCall({ email: null, password: null }, dispatch);
  };

  const handleSearch = () => {
    setSearchInput(document.getElementById("searchInput").value);
    fetchSearch();
  };

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" style={{ textDecoration: "none" }}>
          <span className="logo">FFL</span>
          <AutoStories className="logoFFL"></AutoStories>
        </Link>
      </div>
      <div className="topbarCenter">
        <div className="searchbar">
          <Search onClick={handleSearch} className="searchIcon" />
          <input
            placeholder="search now!"
            className="searchInput"
            id="searchInput"
          />
          <Button variant="text" onClick={handleSearch}>
            submit
          </Button>
        </div>
      </div>
      <div className="topbarRight">
        <div className="topbarIcons">
          <div className="topbarIconsItem">
            <Chat />
            <span className="topbarIconBadge">1</span>
          </div>
          <div className="topbarIconsItem">
            <Notifications />
            <span className="topbarIconBadge">1</span>
          </div>
        </div>
        <Link to={`/profile/${user.username}`}>
          <img
            src={
              user.profilePicture ? PF + user.profilePicture : PF + "CMYK.png"
            }
            alt=""
            className="topbarImage"
          />
        </Link>
        <form className="logout" onSubmit={handleClickLogout}>
          <button className="topbarLogOut">logout</button>
        </form>
      </div>
    </div>
  );
}
