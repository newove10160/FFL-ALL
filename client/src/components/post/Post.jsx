import { MoreVert, ThumbUp } from "@mui/icons-material";
import "./post.css";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { format } from "timeago.js";
import { Link } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";

const styleModal = {
  position: "relative",
  top: "50%",
  left: "50%",
  overflow: "scroll",
  height: "100%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  height: 307,
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Post({ post }) {
  const [like, setLike] = useState(post.likes.length);
  const [isLiked, setIsLiked] = useState(false);
  const [user, setUser] = useState({});
  const [openModalEdit, setOpenModalEdit] = useState(false);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const { user: currentUser } = useContext(AuthContext);
  const [value, setValue] = useState("");

  useEffect(() => {
    setIsLiked(post.likes.includes(currentUser._id));
  }, [currentUser._id, post.likes]);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get(`/users?userId=${post.userId}`);
      setUser(res.data);
    };
    fetchUser();
  }, [post.userId]);

  useEffect(() => {
    console.log("post");
    console.log(post);
    console.log(post._id);
  }, []);

  const likeHandler = () => {
    try {
      axios.put("/posts/" + post._id + "like", { userId: currentUser._id });
    } catch (err) {}
    setLike(isLiked ? like - 1 : like + 1);
    setIsLiked(!isLiked);
  };

  const deletePost = async () => {
    if (currentUser._id === post.userId) {
      await axios.delete("/posts/" + post._id);
      window.location.reload();
    } else {
      alert("not your post");
    }
  };

  const handleCloseEditModal = () => {
    setOpenModalEdit(false);
  };

  const submitEdit = async () => {
    updatePost();
  };

  const updatePost = async () => {
    if (currentUser._id === post.userId) {
      try {
        await axios.put("/posts/" + post._id, { desc: value });
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    } else {
      alert("not your post");
    }
  };

  const handleChange = (event) => {
    setValue(event.target.value);
  };

  const checkUserPost = () => {
    if (currentUser._id === post.userId) {
      setOpenModalEdit(true);
    } else {
      alert("not your post!!!");
    }
  };

  const modalEdit = (
    <Modal
      open={openModalEdit}
      onClose={handleCloseEditModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={styleModal} className="modal">
        <TextField
          id="outlined-multiline-flexible"
          label="Edit"
          multiline
          maxRows={4}
          style={{ width: "900px", height: "50px" }}
          value={value}
          onChange={handleChange}
        />

        <Button
          className="submitBt"
          variant="contained"
          onClick={() => {
            submitEdit();
          }}
        >
          Submit
        </Button>
      </Box>
    </Modal>
  );

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`profile/${user.username}`}>
              <img
                className="postProfileImg"
                src={
                  user.profilePicture
                    ? PF + user.profilePicture
                    : PF + "CMYK.png"
                }
                alt=""
              />
            </Link>
            <span className="postUserName">{user.username}</span>
            <span className="postDate">{format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            {openModalEdit ? modalEdit : null}
            <Button variant="text">
              <Select
                // labelId="demo-simple-select-autowidth-label"
                id="demo-simple-select-autowidth"
                //   value={age}
                //   onChange={handleChange}
                autoWidth
              >
                <MenuItem value={21} onClick={() => checkUserPost()}>
                  Edit
                </MenuItem>
                <MenuItem
                  value={22}
                  onClick={() => {
                    deletePost();
                  }}
                >
                  Delete
                </MenuItem>
              </Select>
            </Button>
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <ThumbUp className="likeIcon" onClick={likeHandler}></ThumbUp>
            <span className="postLikeCounter" >
              {like} people
            </span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comment</span>
          </div>
        </div>
      </div>
    </div>
  );
}
