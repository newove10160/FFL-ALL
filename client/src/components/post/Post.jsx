import { MoreVert, ThumbUp, Message } from "@mui/icons-material"
import "./post.css"
import { useContext, useEffect, useState } from "react"
import axios from "axios"
import {format} from "timeago.js"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"



export default function Post({post}) {
    const [like,setLike] = useState(post.likes.length)
    const [isLiked,setIsLiked] = useState(false)
    const [user, setUser]= useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const {user:currentUser} = useContext(AuthContext)
    
    useEffect(()=>{
        setIsLiked(post.likes.includes(currentUser._id))
    },[currentUser._id, post.likes])

    useEffect(()=>{
        const fetchUser = async () =>{
            const res = await axios.get(`/users?userId=${post.userId}`)
            setUser(res.data)
        }
        fetchUser()
    },[post.userId])

    const likeHandler = () => {
        try{
            axios.put("/posts/"+post._id+"like",{userId:currentUser._id})
        }catch(err){}
        setLike(isLiked ? like-1 : like+1)
        setIsLiked(!isLiked)
    }

    const sendMessageHandler = async () => {
        const newConversation = {
            senderId: currentUser._id,
            receiverId: post.userId ,
        };
            try {
                await axios.post("/conversations", newConversation);
                window.location.reload();
            } catch (err) {
                console.log(err)
            }
    }

    return (
        <div className="post">
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to ={`profile/${user.username}`} >
                        <img className ="postProfileImg"
                        src={user.profilePicture? PF+user.profilePicture : PF+"CMYK.png"} alt="" />
                        </Link>
                    <span className="postUserName">
                        {user.username}
                    </span>
                    <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                    <MoreVert/>
                    </div>
                </div> 
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg"src={PF+post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <ThumbUp className="likeIcon" ></ThumbUp>
                        <span className="postLikeCounter" onClick = {likeHandler}>{like} people</span>
                        <Link to="/messenger" style={{textDecoration:"none"}}>
                        <Message className="directMessage" onClick={sendMessageHandler}></Message>
                        </Link>
                    </div>
                    <div className="postBottomRight">
                        <span className="postCommentText">{post.comment} comment</span>
                    </div>
                </div>
            </div>
        </div>
    )
}
