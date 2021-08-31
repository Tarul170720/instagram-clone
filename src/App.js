import { useState ,useEffect} from 'react';
import './App.css';
import Post from './Post';
import {db,auth} from './firebase';
import { makeStyles } from '@material-ui/core/styles';
import Modal from '@material-ui/core/Modal';
import { Button, Input } from '@material-ui/core';
import ImageUpload from './ImageUpload';
import InstagramEmbed from 'react-instagram-embed';
import Profile from './Profile';


function getModalStyle() {
  const top = 50 ;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
  },
}));




function App() {
  const classes=useStyles();
  const [modalStyle]=useState(getModalStyle);
  const [posts,setPosts]=useState([]);
  const [open,setOpen]=useState(false);
  const [openSignIn,setOpenSignIn]=useState(false);
  const [username,setUsername]=useState('');
  const [password,setPassword]=useState('');
  const [email,setEmail]=useState('');
  const [user,setUser] =useState(null);
  const [profile,setProfile] =useState(false);
  useEffect(()=>{
    const unsubscribse=auth.onAuthStateChanged((authUser)=>{
      if(authUser){
        //userLogged In
        console.log(authUser);
        setUser(authUser);

        if(authUser.displayName){

        }
        else{
          return authUser.updateProfile({
            displayName:username,
          });
        }
      }
      else{
        //userLogged Out
        setUser(null);
      }
    })

    return ()=>{
      //perform somecleanup effect
      unsubscribse();
    }
  },[user,username])
  //useEfeccts runs peice of code based on specific function
  useEffect(()=>{
    
    db.collection('posts').orderBy('timestamp','desc').onSnapshot(snapshot=>{setPosts(snapshot.docs.map(doc => ({
      id:doc.id,
      post:doc.data()})))});      
 
  },[]);

  const signUp=(event)=>{
      event.preventDefault();
      auth.createUserWithEmailAndPassword(email,password)
      .then((authUser)=>{
        return authUser.user.updateProfile({
          displayName:username,
        });
      })
      .catch((error)=>alert(error.message))
      setOpen(false);

  
    }

  const signIn=(event) =>{
    event.preventDefault();

    auth.signInWithEmailAndPassword(email,password)
    .catch((error)=>alert(error.message));
    setOpenSignIn(false);
  }
  return (
    <div className=".app">
   
      

      <Modal
        open={open}
        onClose={()=>setOpen(false)}
      
      >
        <div style={modalStyle} className={classes.paper}>
         <form className="app__signup">
         <center>
            <img
            className="app__headerImage"
            src="data:image/jpeg;base64,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"
            alt=""/>
            </center>
               <Input
              placeholder="username"
              type="text"
              value={username}
              onChange={(e)=> setUsername(e.target.value)}/>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}/>
              <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}/>

              <Button type="sumbit" onClick={signUp}>Login</Button>

          

         </form>
               </div>
      </Modal>

      <Modal
        open={openSignIn}
        onClose={()=>setOpenSignIn(false)}
      
      >
        <div style={modalStyle} className={classes.paper}>
         <form className="app__signup">
         <center>
            <img
            className="app__headerImage"
            src="data:image/jpeg;base64,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"
            alt=""/>
            </center>
            <Input
              placeholder="email"
              type="text"
              value={email}
              onChange={(e)=> setEmail(e.target.value)}/>
              <Input
              placeholder="password"
              type="password"
              value={password}
              onChange={(e)=> setPassword(e.target.value)}/>

              <Button type="sumbit" onClick={signIn}>Login</Button>

          

         </form>
               </div>
      </Modal>
      
      
      
      
      <header className="App-header">
        
        <div className="app__header"> 
        <img 
        className="app__headerImage"      
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSe1mXowQOoDhnVexElVo_B017a1E__nKe8Yw&usqp=CAU"
        alt=""/>
        {user ? (
         <div classname="app__loginConatiner">
         <Button onClick={() => auth.signOut()}>Logout</Button>
         <Button onClick={() => setProfile(false)}>Profile</Button>
         <Button onClick={() => setProfile(true)}>Home</Button>
         </div>
        ):
        (
          <div classname="app__loginConatiner">
             <Button onClick={() => setOpenSignIn(true)}>Sign In</Button>
              <Button onClick={() => setOpen(true)}>Sign up</Button>

          </div>
        )}
        
        </div>
     </header>   
        
        
      {profile?(
        <div>
          <div className="app__posts">

            {
              posts.map(({id,post}) => (
                <Post key={id} postId={id} username={post.username} caption={post.caption} imageUrl={post.imageUrl}/>
              ))

            }

          </div>
         <div>
            {user?.displayName?(
          <ImageUpload username={user.displayName}/>
            ):(
              <h3>Sorry you need to login to upload</h3>
            )}
        </div>
      </div>
      ):(
        <div>
        {user?.displayName?(
      <Profile username={user.displayName}/>
        ):(
          <h3>Sorry you need to login to upload</h3>
        )}
    </div>
        
      )
        
      } 
     
    </div>
  );
}

export default App;
