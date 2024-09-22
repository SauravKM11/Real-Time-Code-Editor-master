import React, { useState } from 'react'
import './home.css'
import { Link } from 'react-router-dom';
import main from "../assets/main.png"
import {v4 as uuidV4} from 'uuid';
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [roomId, setRoomId] = useState('');
  const [username, setUsername] = useState('');


  const createNewRoom = (e)=>{
    e.preventDefault();
    const id = uuidV4();
    setRoomId(id);
    toast.success('Created a new room');
  };

  const joinRoom = () =>{
    if(!roomId || !username){
      toast.error('ROOM ID & username is requires');
      return;
    }

    navigate(`/editor/${roomId}`, {
      state: {
        username, 
      }
    })
  };

  const handleInputEnter = (e) =>{
    if(e.code == 'Enter'){
      joinRoom();
    }
  };


  return (
    <div>
      <div className='homePageWrapper'>
        <div className='formWrapper'>
          <img className='homePageLogo' src={main} alt='logo'/>
          <h4 className='mainLabel'>Paste invitation Room</h4>
          <div className='inputGroup'>
            <input type='text' className='inputBox' placeholder="Room ID" onChange={(e) => setRoomId(e.target.value)} value={roomId} onKeyUp={handleInputEnter}/>
            <input type='text' className='inputBox' placeholder="USERNAME" onChange={(e) => setUsername(e.target.value)} value={username} onKeyUp={handleInputEnter}/>
            <button className='btn joinBtn' onClick={joinRoom}>Join</button>

            <span className='createInfo'>
              If you don't have an ivite the create &nbsp;
              <a onClick={createNewRoom} href=' ' className='createNewBtn'>new room</a>
            </span>
          </div>
        </div>
        <footer>
          <h4>
            Built with by <a href=''>SKP/KM</a>
          </h4>
        </footer>
      </div>
    </div>

  )
}

export default Home