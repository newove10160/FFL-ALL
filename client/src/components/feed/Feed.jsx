import { useContext, useEffect, useState, useRef } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import { Search } from "@mui/icons-material";


export default function Feed({username}) { 
    const [posts, setPost]= useState([]);
    const {user} = useContext(AuthContext)
   // const [search, SetSearch] = useState("");


    
    
    useEffect(()=>{
        const fetchPosts = async () =>{
            //if(search ==""){
            const res = username 
            ? await axios.get("/posts/profile/" + username)
            : await axios.get("/posts/timeline/"+user._id)
                setPost(res.data.sort((p1,p2)=>{
                    return new Date(p2.createdAt) - new Date(p1.createdAt);
                })
                )
            //}else{
           // const searchpost =  axios.get("/posts/feeds/search/"+search);
            //setPost(searchpost.data)
            
            //}
        }
        fetchPosts() 
    },[username, user._id])


    return (
        <div className= "feed">
            
            <div className="feedWrapper">
                {(!username || username === user.username) && <Share></Share>}
                {posts.map((p)=>(
                    <Post key={p._id} post={p} />
                ))}
            </div>
        </div>
    )
}
