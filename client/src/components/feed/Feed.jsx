
import { useEffect, useState } from "react";
import Post from "../post/Post";
import Share from "../share/Share";
import "./feed.css";
import axios from "axios"



export default function Feed() {
  const [posts,setPosts] = useState([])
  // const [text,setText] = useState("")  for TESTING useEffect

  useEffect(()=>{
    const fetchPosts = async() =>{
    const res =  await axios.get("posts/timeline/61e04dd5299306f9f4bfade6")
    setPosts(res.data)
    }
   fetchPosts()
  },[])
  return (
    <div className="feed">
      {/* <input type="text" onChange={e=>setText(e.target.value)} />    for TESTING useEffect*/}
      <div className="feedWrapper">
        <Share />
        {posts.map((p) => (
          <Post key={p._id} post={p} />
        ))}

      </div>
    </div>
  );
}