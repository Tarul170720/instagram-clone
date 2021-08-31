import React, { useEffect, useState } from 'react';
import './Post.css';
import Avatar from '@material-ui/core/Avatar';
import {db} from './firebase';
function Post({postId,username,caption,imageUrl}) {



    const [comment,setComments]=useState([]);

    useEffect(()=>{
        let unsubscribe;
        if(postId){
            unsubscribe= db.collection('posts').doc(postId).collection("comments").onSnapshot(snapshot=>{setComments(snapshot.docs.map(doc => ({
                id:doc.id,
                post:doc.data()})))}); 
        }
    
    return()=>{
        unsubscribe();
    };
},[postId]);


    return (
        <div className="post" >
            <div className="post__header">
            <Avatar
                className="post__avatar"
                alt='RafehQazi'
                src="https://pbs.twimg.com/profile_images/1268956476292268038/pcd90R0K.jpg"
            />
            <h3>{username}</h3>
            </div>
            {/* header ->avatar + username */}
            <img className="post__image"
            src={imageUrl}
            alt=""
            />
           
            <h4 className="post__text"><strong>{username}</strong> {caption} </h4>
            
        </div>
    );
}

export default Post;