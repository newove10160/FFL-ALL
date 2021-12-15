import "./messenger.css" ;
import Topbar from "../../components/topbar/Topbar";
import Conversation from "../../components/conversations/Conversation" ;
import Message from "../../components/message/Message" ;
import ChatOnline from "../../components/chatOnline/ChatOnline" ;
import { useContext, useState, useEffect} from "react" ;
import { AuthContext } from "../../context/AuthContext" ;
import axios from "axios";

export default function Messenger() {
    const [conversations, setConversations] = useState([]) ;
    const [currentChat, setCurrentChat] = useState(null) ;
    const [messages, setMessages] = useState([]) ;
    const [newMessage, setNewMessage] = useState([]) ;
    const {user} = useContext(AuthContext) ;

    useEffect(() => {
        const getConversations = async() => {
            try {
                const res = await axios.get("/conversations/"+ user._id)
                setConversations(res.data) ;
                console.log(res)
            } catch(err) {
                console.log(err) ;
            }
        };
        getConversations() ;
    }, [user._id]);

    useEffect(() => {
        const getMessages = async () => {
            try{
                const res = await axios.get("/messages/" + currentChat?._id) ;
                setMessages(res.data) ;
            } catch(err) {}
        };
        getMessages() ;
    }, [currentChat]) ;

    const handleSubmit = async (e) => {
        e.preventDefault() ;
        const message = {
            sender: user._id,
            text: newMessage, 
            conversationId: currentChat._id
        };
        try{
            const res = await axios.post("/messages", message) ;
            setMessages([...messages, res.data]) ;
            setNewMessage("") ;
        } catch(err) {
            console.log(err)
        }
    };

    return(
        <>
            <Topbar/>
            <div className="messenger">
                <div className="chatMenu">
                    <div className="chatMenuWrapper">
                        <input placeholder="Search Users" className="chatMenuInput" />
                        {conversations.map((c) => (
                            <div className="" onClick={() => setCurrentChat(c)}>
                            <Conversation conversation={c} currentUser = {user}/>
                            </div>
                        ))}            
                    </div>
                </div>
                <div className="chatBox">
                    <div className="chatBoxWrapper">
                        {
                            currentChat ?
                        (<>
                        <div className="chatBoxTop">
                            {messages.map((m) => (
                                <Message message = {m} own={m.sender === user._id} />
                            ))}
                        </div>
                        <div className="chatBoxBottom">
                            <textarea className="chatMessageInput" placeholder="Write something here" 
                            onChange = {(e) => setNewMessage(e.target.value)} value={newMessage} />
                            <button className="chatSubmitButton" onClick={handleSubmit}>Send</button>
                        </div>
                        </>): (<span className="noConversationText"> Open Conversation to Start Chat</span>) }
                    </div>
                </div>
                <div className="chatOnline">
                    <div className="chatOnlineWrapper">
                        <ChatOnline />
                    </div>
                </div>
            </div>
        </>
    )
}


