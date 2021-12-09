import { Bookmark, Chat, Event, Group, HelpOutline, PlayCircleFilledOutlined, RssFeed, School, WorkOutline } from "@mui/icons-material"
import "./sidebar.css"
import { Users } from "../../dummyData"
import CloseFriend from "../closefriend/CloseFriend"


export default function Sidebar() {
    return (
        <div className="sidebar">
            <div className="sidebarWrapper">
                <ul className="sidebarList">
                    <li className="sidebarListItem">
                        <RssFeed className = "sidebarIcon"/>
                        <span className="sidebarlistItemText">Feed</span>
                    </li>
                    <li className="sidebarListItem">
                        <Chat className = "sidebarIcon"></Chat>
                        <span className="sidebarlistItemText">Chats</span>
                    </li>
                    <li className="sidebarListItem">
                        <PlayCircleFilledOutlined className = "sidebarIcon"/>
                        <span className="sidebarlistItemText">Videos</span>
                    </li>
                    <li className="sidebarListItem">
                        <Group className = "sidebarIcon"/>
                        <span className="sidebarlistItemText">Groups</span>
                    </li>
                    <li className="sidebarListItem">
                        <Bookmark className = "sidebarIcon"/>
                        <span className="sidebarlistItemText">Bookmarks</span>
                    </li>
                    <li className = "sidebarListItem">
                        <HelpOutline className = "sidebarIcon"/>
                        <span className="sidebarlistItemText">Questions</span>
                    </li>
                    <li className="sidebarListItem">
                        <WorkOutline className = "sidebarIcon"/>
                        <span className="sidebarlistItemText">Jobs</span>
                    </li>
                    <li className="sidebarListItem">
                        <Event className = "sidebarIcon"/>
                        <span className="sidebarlistItemText">Events</span>
                    </li>
                    <li className="sidebarListItem">
                        <School className = "sidebarIcon"/>
                        <span className="sidebarlistItemText">Courses</span>
                    </li>
                </ul>
                <button className="sidebarBotton">Show more</button>
                <hr className="sidebarHr"></hr>
                <ul className="sidebarFriendList">
                {Users.map((u)=>(
                      <CloseFriend key={u.id} user={u}/> 
                    ))}
                </ul>
            </div>
        </div>
    )
}
