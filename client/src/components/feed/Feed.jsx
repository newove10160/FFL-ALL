import { useContext, useEffect, useState } from "react"
import Post from "../post/Post"
import Share from "../share/Share"
import "./feed.css"
import axios from "axios"
import { AuthContext } from "../../context/AuthContext"
import useInfiniteScroll from "../../useInfiniteScroll.js"

export default function Feed({username}) { 
    const [posts, setPost]= useState([]);
    const {user} = useContext(AuthContext)
    const [page, setPage] = useState(2);
    const [isFetching, setIsFetching] = useInfiniteScroll(moreData);

    const loadData = () => {
        let url = '/posts/feeds/page/1/size/5';
        axios.get(url).then(res => {
            if (res.data.length > 0) {
                setPost(res.data)
                console.log(res.data)
            }
        })
            .catch()
    }

    function moreData() {
        let url = '/posts/feeds/page/'+page+'/size/5';
        axios.get(url).then(res => {
            setPost([...posts, ...res.data]);
            setPage(page + 1)
            setIsFetching(false)
            console.log(res.data)
        });
    }
    
    useEffect(()=>{
        //  loadData();
        const fetchPosts = async () =>{
             const res = username 
            ? await axios.get("/posts/profile/" + username)
            : await axios.get("/posts/timeline/"+user._id)
            // : await axios.get("http://localhost:8800/api/posts/feeds/page/1/size/2")
            setPost(res.data.sort((p1,p2)=>{
                console.log(res.data)
                return new Date(p2.createdAt) - new Date(p1.createdAt);
                console.log(res.data)
            })
            )
            // setPost(res.data);
        }
        fetchPosts() 
        
    },[username, user._id])

    // if (posts.length==0) {
    //     return  <div>Loading...</div>;
                
    //   }

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
