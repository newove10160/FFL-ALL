import { MoreVert, ThumbUp } from "@mui/icons-material"
import "./post.css"
import { useContext, useEffect, useState, useRef } from "react"
import axios from "axios"
import { format } from "timeago.js"
import { Link } from "react-router-dom"
import { AuthContext } from "../../context/AuthContext"
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';


const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};
export default function Post({ post }) {
    const [like, setLike] = useState(post.likes.length)
    const [isLiked, setIsLiked] = useState(false)
    const [user, setUser] = useState({})
    const PF = process.env.REACT_APP_PUBLIC_FOLDER
    const { user: currentUser } = useContext(AuthContext)
    const [comments, setComments] = useState([])
    const desc = useRef();
    const [openCommentModal, setOpenCommentModal] = useState(false);


    // useEffect(() => {
    //     getAllComment();
    // }, [openCommentModal])

    useEffect(() => {
        setIsLiked(post.likes.includes(currentUser._id))
    }, [currentUser._id, post.likes])

    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get(`/users?userId=${post.userId}`)
            setUser(res.data)
        }
        fetchUser()
    }, [post.userId])

    const likeHandler = () => {
        try {
            axios.put("/posts/" + post._id + "like", { userId: currentUser._id })
        } catch (err) { }
        setLike(isLiked ? like - 1 : like + 1)
        setIsLiked(!isLiked)
    }

    const deletePost = async () => {
        if (currentUser._id === post.userId) {
            await axios.delete("/posts/" + post._id)
            window.location.reload();
        } else {
            alert("not your post")
        }
    }
    const createComment = async () => {
        const newComment = {
            basePost: post._id,
            commenter: user._id,
            // desc: desc.current.value
            desc: document.getElementById("comment").value,
        }
        try {
            let res = await axios.post("/comments", newComment)
            console.log(res);
        } catch (err) {
            console.log(err);
        }
    }

    const deleteComment = async () => {
        // if(currentUser._id === post.userId){
        await axios.delete("/comments/")
        window.location.reload();
        //  }else{
        //     alert("not your comment")
    }

    const editComment = async () => {
        // if(currentUser._id === post.userId){
        await axios.edit("/comments/")
        window.location.reload();
        //  }else{
        //     alert("not your comment")
    };

    const handleCloseCommentModal = () => {
        setOpenCommentModal(false);
    };

    const setOpenComment = () => {
        setOpenCommentModal(true);
        getAllComment();
    }

    const commentModal = (<Modal
        open={openCommentModal}
        onClose={handleCloseCommentModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
    >
        <Box sx={style}>
            <p>sdsd</p>

            <Button variant="text" onClick={()=> getAllComment(post._id)}>Text</Button>
        </Box>
       
    </Modal>);

    const getAllComment = async () => {
        try {
            let res = await axios.get("/comments/post/ " + post._id)
            console.log("resComment")
            console.log(res.data)
        } catch (err) {
            console.log(err)
        }
    };

    return (
        <div className="post">
            {openCommentModal ? commentModal : null}
            <div className="postWrapper">
                <div className="postTop">
                    <div className="postTopLeft">
                        <Link to={`profile/${user.username}`} >
                            <img className="postProfileImg"
                                src={user.profilePicture ? PF + user.profilePicture : PF + "CMYK.png"} alt="" />
                        </Link>
                        <span className="postUserName">
                            {user.username}
                        </span>
                        <span className="postDate">{format(post.createdAt)}</span>
                    </div>
                    <div className="postTopRight">
                        <MoreVert className="deletePost" onClick={deletePost}></MoreVert>
                    </div>
                </div>
                <div className="postCenter">
                    <span className="postText">{post?.desc}</span>
                    <img className="postImg" src={PF + post.img} alt="" />
                </div>
                <div className="postBottom">
                    <div className="postBottomLeft">
                        <ThumbUp className="likeIcon" ></ThumbUp>
                        <span className="postLikeCounter" onClick={likeHandler}>{like} people</span>
                    </div>
                    <div className="postBottomRight">
                        <input type="text" id="comment" />
                        <input type="submit" onClick={createComment} />
                        {/* <Link to={"/comments/" + post._id}> <span className="postCommentText">{post.comment} comment</span> </Link> */}
                        <span className="postCommentText" onClick={() => setOpenComment()}>{post.comment} comment</span>
                    </div>
                </div>
            </div>
        </div>
    )

}
