import { useContext, useEffect, useState, useRef } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import { Search } from "@mui/icons-material";
import Button from "@mui/material/Button";
import { color } from "@mui/system"


export default function Feed({ username }) {
    const [posts, setPost] = useState([]);
    const { user } = useContext(AuthContext)
    const search = useRef();
    const [searchInput, setSearchInput] = useState("");


    //const fetchSearch = async () => {
    //     try {
    //       const resSearch = await axios.get("/posts/feeds/search/" + searchInput);
    //       console.log("success");
    //       console.log(resSearch);
    //     } catch (err) {
    //       console.log(err);
    //     }
    //   };
    // }
    const handleSearch = async () => {
        // setSearchInput(document.getElementById("searchInput").value);
        setSearchInput(search.current.value);
        try {
            const resSearch = await axios.get("/posts/feeds/search/" + searchInput);
            console.log("success");
            console.log(resSearch);
            //   setPost(
            //     resSearch.data.sort((p1, p2) => {
            //       console.log("sort2");
            //       return new Date(p2.createdAt) - new Date(p1.createdAt);
            //     })
            //   );
            setPost(resSearch.data);
        } catch (err) {
            console.log(err);
        }
    };
    // fetchSearch();


    useEffect(() => {
        const fetchPosts = async () => {
            const res = username
                ? await axios.get("/posts/profile/" + username)
                : await axios.get("/posts/timeline/" + user._id)
            setPost(res.data.sort((p1, p2) => {
                return new Date(p2.createdAt) - new Date(p1.createdAt);
            })
            )
        }
        fetchPosts()
    }, [username, user._id])


    return (
        <div className="feed">
            <div className="searchbar">
                <Search className="searchIcon" />
                <input placeholder="search now!" className="searchInput" ref={search} style={{backgroundColor:"rgb(202, 196, 196)"}}/>
                <Button variant="text" onClick={handleSearch} style={{marginRight:"20px"}}>
                    submit
                </Button>
            </div>
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share></Share>}
                {posts.map((p) => (
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    )
}
