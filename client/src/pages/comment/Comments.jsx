import axios from "axios"
import { React, useEffect, useState } from "react"
import { useParams } from "react-router"
import Post from "../../components/post/Post";

export default function Comments() {
    const postid = useParams();
    const [posts, setPost] = useState({});
    const [loading, setLoading] = useState(true);
    useEffect(() => {

        axios.get("/posts/" + postid)
            .then(res => {
                setPost(res.data);
            })

                const fetchData = async () => {
                    setLoading(true);
                    try {
                        axios.get("/comments/post/" + postid)
                            .then(res => {
                                
                            })
                    } catch (error) {

                    }
                    setTimeout(() => { setLoading(false); }, 100)
                }

                fetchData()

            }, [])

        return (
            <div>
                <Post post={posts} />
            </div>
        )

    }