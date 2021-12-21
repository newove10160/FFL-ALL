import { Cancel, Label, PermMedia, Room } from "@mui/icons-material"
import { useContext, useRef, useState} from "react"
import "./share.css"
import {AuthContext} from "../../context/AuthContext"
import axios from "axios"
import Box from "@mui/material/Box";
import Modal from "@mui/material/Modal";
import ReactMapGL, {Marker, Popup} from 'react-map-gl';
import AddLocationIcon from '@mui/icons-material/AddLocation';
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import Checkbox from '@mui/material/Checkbox';

const styleModal = {
  position: "relative",
  top: "50%",
  left: "50%",
  overflow: "scroll",
  height: "60%",
  transform: "translate(-50%, -50%)",
  width: "50%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

const styleModalTags = {
  position: "relative",
  top: "50%",
  left: "50%",
  overflow: "scroll",
  height: "25%",
  transform: "translate(-50%, -50%)",
  width: "15%",
  bgcolor: "background.paper",
  boxShadow: 24,
  p: 4,
};

export default function Share() {
    const { user } = useContext(AuthContext);
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const desc = useRef();
    const [file, setFile] = useState(null);
  const PF = process.env.REACT_APP_PUBLIC_FOLDER;
  const desc = useRef();
  const [file, setFile] = useState(null);
  const [openModalMap, setOpenModalMap] = useState(false);
  const [openModalTags, setOpenModalTags] = useState(false);
  
  
  const [newPlace, setNewPlace] = useState(null)
  const [viewport, setViewport] = useState({
    width: "100vw",
    height: "100vh",
    latitude: 13.650954 ,
    longitude: 100.494172,
    zoom: 15
    });

    const handleAddClick = (e)=>{
      const [longitude, latitude] = e.lngLat; 
      setNewPlace({
        lat:latitude,
        long:longitude
      })
    }

  const submitHandler = async (e) => {
    e.preventDefault();
    const newPost = {userId:null,desc:null,lat:null,long:null}
    if(newPlace == null){
      newPost.userId = user._id;
      newPost.desc = desc.current.value;
    }else{
      newPost.userId = user._id
      newPost.desc = desc.current.value
      newPost.lat = newPlace.lat
      newPost.long= newPlace.long
    }
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.img = fileName;
      console.log(newPost);
      try {
        await axios.post("/upload", data);
      } catch (err) {}
      try {
      await axios.post("/posts", newPost);
      window.location.reload();
      } catch (err) {}
    }
    }

    const handleCloseMapModal= ()=>{
      setOpenModalMap(false)
    }

    const modalMap = (
      <Modal
        open={openModalMap}
        onClose={handleCloseMapModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={styleModal} className="modal">
        <div className="app">
    <ReactMapGL
    {...viewport}
    mapboxApiAccessToken={process.env.REACT_APP_MAPBOX}
    onViewportChange={nextViewport => setViewport(nextViewport)}
    mapStyle="mapbox://styles/mapbox/streets-v11"
    onDblClick = {handleAddClick} 
    >
    {newPlace &&
    <Marker latitude={newPlace.lat} 
    longitude={newPlace.long} 
    offsetLeft={-20} 
    offsetTop={-10}>
    <AddLocationIcon style={{fontSize:viewport.zoom*2, color:"slateblue", cursor: "pointer"}}
    />
  </Marker>
    }
    </ReactMapGL>
    </div>
        </Box>
      </Modal>
    );
    const handleCloseTagsModal= ()=>{
      setOpenModalTags(false)
    }
    const handleCheckBox = (e)=>{
      console.log(e.target.label)
    }
    const modalTags = (
      <Modal
        open={openModalTags}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        onClose={handleCloseTagsModal}
      >
        <Box sx={styleModalTags} className="modal">
        <FormGroup onChange={handleCheckBox} >
        <FormControlLabel control={<Checkbox defaultUnChecked />} label="APPLIANCES" />
        <FormControlLabel control={<Checkbox defaultUnChecked />} label="CLOTHES" />
        <FormControlLabel control={<Checkbox defaultUnChecked />} label="FURNITURES" />
        <FormControlLabel control={<Checkbox defaultUnChecked />} label="STUDY" />
        <FormControlLabel control={<Checkbox defaultUnChecked />} label="MEDICAL" />
        <FormControlLabel control={<Checkbox defaultUnChecked />} label="OTHERS" />
        </FormGroup>
        </Box>
      </Modal>
    );

    
    return (
        <div className = "share">
            <div className="shareWrapper">
                <div className="shareTop">
                    <img className="shareProfileImg" src={user.profilePicture? PF+user.profilePicture: PF+"CMYK.png"} alt="" />
                    <input placeholder={"Input your status "+ user.username+" ? "} className="shareInput" ref = {desc}/>
                </div>
                <hr className="shareHr"/>
                {file &&(
                    <div className="shareImgContainer">
                        <img src={URL.createObjectURL(file)} alt="" className="shareImg" />
                        <Cancel className="shareCancelImg" onClick={ ()=> setFile(null)}/>
                    </div>
                ) }
                <form className="shareBottom" onSubmit={submitHandler}>
                    <div className="shareOptions">
                    <label htmlFor="file" className="shareOption">
                        <PermMedia htmlColor="tomato" className = "shareIcon"/>
                        <span className = "shareOptionText">Photos/Videos</span>
                        <input style={{display:"none"}} type="file" id="file" accept=".png,.jpeg,.jpg" onChange={(e)=> setFile(e.target.files[0])}></input>
                    </label>
                    <div>
                    {openModalTags ? modalTags:null}
                    <div className="shareOption" onClick={()=>{setOpenModalTags(true)}}>
                        <Label htmlColor="blue" className = "shareIcon" />
                        <span className = "shareOptionText" >Tag</span>
                        
                    </div>
                    </div>
                    <div>
                      {openModalMap ? modalMap:null}
                      <div className="shareOption" onClick={()=>{setOpenModalMap(true)}}>
                        <Room htmlColor="green" className = "shareIcon" />
                        <span className = "shareOptionText" >Location</span>
                      </div>
                    </div>
                    </div>
                    <button className="shareBotton" type="submit"> Share </button>
                </form>
            </div>
        </div>
    )
}

