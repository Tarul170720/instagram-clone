import { Avatar, Button, IconButton } from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { auth, storage, db } from "./firebase";
import "./Profile.css";
function Profile({username}){
  return (
    <div className="Profile">
      
         <div className="profile_info">
          <div className="profile_infoavatar">
                <Avatar
                  className="avatar"
                  alt='RafehQazi'
                  src="https://pbs.twimg.com/profile_images/1268956476292268038/pcd90R0K.jpg"
              />
             

          
          <h1>{username}</h1>
          <Button>Edit Profile</Button>
          <h4><strong>Name</strong></h4>
          
          <p>Bio</p>
          <br></br>
          </div>
          <div className="pofile__data">
            <h5>40 posts</h5>
            <h5>40 followers</h5>
            <h5>40 following</h5>
          </div>
          
          </div>
          <div className="gallery">
            

          </div>
     </div>
        
      
  )
}

export default Profile;