import "./post.css";
import { useEffect, useState } from "react";
import { MoreVertRounded } from "@mui/icons-material";
import axios from "axios";
import { Link } from "react-router-dom";
// import {format} from "timeago.js"
import TimeAgo from 'javascript-time-ago'

// English.
import en from 'javascript-time-ago/locale/en.json'

TimeAgo.addDefaultLocale(en)

// Create formatter (English).
const timeAgo = new TimeAgo('en-US')

timeAgo.format(new Date())
// "just now"

timeAgo.format(Date.now() - 60 * 1000)
// "1 minute ago"

timeAgo.format(Date.now() - 2 * 60 * 60 * 1000)
// "2 hours ago"

timeAgo.format(Date.now() - 24 * 60 * 60 * 1000)
// "1 day ago"



export default function Post({ post }) {
  const [like,setLike] = useState(post.likes.length)
  const [isLiked,setIsLiked] = useState(false)
  const [user,setUser] = useState({})

  const likeHandler =()=>{
    setLike(isLiked ? like-1 : like+1)
    setIsLiked(!isLiked)
  }

  const PF = process.env.REACT_APP_PUBLIC_FOLDER

  useEffect(()=>{
    const fetchUser = async() =>{
    const res =  await axios.get(`users?userId=${post.userId}`)
    setUser(res.data)
    }
   fetchUser()
  },[post.userId])

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <Link to={`/profile/${user.username}`}>
            <img
              className="postProfileImg"
              src={user.profilePicture || PF+"/person/noAvatar.png"}
              alt=""
              />
            </Link>
            <span className="postUsername">
              {user.username}
            </span>
            <span className="postDate">{timeAgo.format(post.createdAt)}</span>
          </div>
          <div className="postTopRight">
            <MoreVertRounded />
          </div>
        </div>
        <div className="postCenter">
          <span className="postText">{post?.desc}</span>
          <img className="postImg" src={PF + post.img} alt="" />
        </div>
        <div className="postBottom">
          <div className="postBottomLeft">
            <img className="likeIcon" src={`${PF}/like.png`} onClick={likeHandler} alt="" />
            <img className="likeIcon" src={`${PF}/heart.png`} onClick={likeHandler} alt="" />
            <span className="postLikeCounter">{like} people like it</span>
          </div>
          <div className="postBottomRight">
            <span className="postCommentText">{post.comment} comments</span>
          </div>
        </div>
      </div>
    </div>
  );
}