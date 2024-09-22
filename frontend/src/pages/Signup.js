import React from 'react'
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faArrowLeftLong } from '@fortawesome/free-solid-svg-icons';
import './signup.css';
import arrow from '../assets/arrow.png';

function Signup() {
  return (
    <div className='container'>
      <div className='main'>
        <div className='box1'>
          <div className='box1-content'>
            <div className='member'>
              <div className='circle'>
                <FontAwesomeIcon icon={faArrowLeftLong} className='arrow'/>
              </div>
              <h3>Already member? &nbsp;<Link to="/login" className='Sign'>Sign in</Link></h3>
            </div>
            <div className='heading'>
              <div className='head'>
                <h1>Signup</h1>
                <p>Secure your communication with us!</p>
              </div>
                <img src={arrow} alt="Logo" />
            </div>
            <form>
              <div>
                <label htmlFor='name'>Name</label>
                <input type='text'/>
              </div>
            </form>
          </div>
        </div>
        <div className='box11'></div>
        <div className='box14'>
          <div className='box15'></div>
        </div>
        
        <div className='box2'>
          <div className='box12'></div>
          <div className='box13'></div>
          
        </div>
      </div>
    </div>
  )
}

export default Signup