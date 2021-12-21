import "./topbar.css"
import { Search, Chat, Notifications, AutoStories } from "@mui/icons-material";
import {Link} from "react-router-dom";
import { useContext, useRef } from "react";
import {AuthContext} from "../../context/AuthContext";
import { loginCall } from "../../apiCalls";
import axios from "axios";


export default function Topbar() {

    const {user} = useContext(AuthContext)
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const {dispatch} = useContext(AuthContext);
    const search = useRef();
    const handleClickLogout = (e) => {
        e.preventDefault()
        loginCall(
          { email: null, password: null },
          dispatch
        )
      }

    const handleSearch = ()=>{
        const searchResult = search.current.value;
        
        console.log(searchResult)
    }

    
    return (
        <div className = "topbarContainer">
            <div className="topbarLeft">
            <Link to="/" style={{textDecoration:"none"}}>
            <span className="logo">FFL</span>
            <AutoStories className="logoFFL"></AutoStories>
            </Link>
            </div>
            <div className="topbarCenter">
                <div className="searchbar" >
                    <Search  onClick={handleSearch} className= "searchIcon"/>
                    <input placeholder="search now!" className="searchInput" ref={search}/>
                </div>
            </div>
            <div className="topbarRight">
            
            <div className="topbarIcons">
                <div className="topbarIconsItem"> 
                <Link to="/messenger" style={{textDecoration:"none"}}>
                <Chat/>
                <span className="topbarIconBadge">1</span>
                </Link>
                </div>
                <div className="topbarIconsItem">
                <Notifications/>
                <span className="topbarIconBadge">1</span>
                </div>
            </div>
            <Link to = {`/profile/${user.username}`}>
            <img src={user.profilePicture? PF+user.profilePicture: PF+"CMYK.png"} alt="" className="topbarImage" />
            </Link>
            <form className="logout" onSubmit={handleClickLogout}>
            <button className="topbarLogOut">logout</button>
            </form>
            </div>
        </div>
    )
}
