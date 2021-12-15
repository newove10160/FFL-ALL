import "./chatOnline.css"

export default function ChatOnline() {
    return (
        <div className="chatOnline">
            <div className="chatOnlineFriend">
                <div className="chatOnlineImgContainer">
                     <img className="chatOnlineImg" src="blank-profile-picture.png" alt="" />
                <div className="chatOnlineBadge"></div>
            </div>
                <span className="chatOnlineName">Sakai</span>
            </div>
        </div>
    )
}
