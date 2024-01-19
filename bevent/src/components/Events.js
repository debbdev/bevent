import React, { useState } from 'react'
import celoNig from '../assets/images/Celo-Nigeria.jpeg'
import './Events.css'
import './Home.css';
import logo from '../assets/images/bnug-logo.svg';
import text from '../assets/images/bnugtext.svg';
import web3a from '../assets/images/web3a.jpeg'
import web3b from '../assets/images/web3b.jpeg'
import web3c from '../assets/images/web3c.jpeg'
import web3d from '../assets/images/web3d.jpeg'
import web3e from '../assets/images/web3e.jpeg'
import web3f from '../assets/images/web3f.png'
import web3g from '../assets/images/web3g.jpeg'
import { useNavigate} from "react-router-dom"
import Event from './Event';



export default function Events({events}) {
  console.log(events)
  const navigate = useNavigate();
  
  /*const images = [web3a,web3b,web3c,web3d,web3e,web3f,web3g]

  function getRandomIndex(array){
    return Math.floor(Math.random()*array.length)
  }
  const RandomImage = () => {
    const randomIndex = getRandomIndex(images);
    const randomImage = images[randomIndex];
    return randomImage;
  };*/
  return (
    <div className='wrapper'>
            <div className='container'>
                <a href='https://web-dapp-bnug.vercel.app'>
                    <img src={logo} alt="bnuglogo" ></img>
                    <img src={text} alt="bnugtext"></img>
                </a>
                <h3>...Earn rewards when you stake or provide liquidity into our pool</h3>
            </div>
    
    <div className='eventContainer'>
      <div className='innerContainer'>
        {events && events.map((event,index) => (
          <div className='eventBlock' key={event.id}>
            <div className=''>
                <h3 className=''>{event.name}</h3>
            </div>
            
            <div className=''>
              <img src={event.image} alt='celo Nig' width='200px' height='100px'></img>
            </div>

            <div className='blockDesc'>
              <p className=''>{event.description}</p>
            </div>
            <div className='eventBox'>
              <h3 className=''>{event.hostName}</h3>
              <h4 className=''>{event.date}</h4>
              <h4 className=''>{event.time}</h4>
            </div>
            <div className='eventBox'>
              <h4 className=''>{event.totalFund}</h4>
              <h4 className=''>{event.amountRaised}</h4>
              <button className='wallet-btn' onClick={()=>navigate(`/events/${event.id}`)}>View More</button>
              
            </div>
          </div>
        ))}
      </div>
    </div>
    <div className='footer'>
               <div><a href='https://web-dapp-bnug.vercel.app'>Team</a></div> 
                <div><a href='https://web-dapp-bnug.vercel.app'>Support</a></div>
                <div><a href='https://web-dapp-bnug.vercel.app'>About BnugDAO</a></div>
                <div><a href='https://web-dapp-bnug.vercel.app'>Legal & Privacy</a></div>
                <div><a href='https://web-dapp-bnug.vercel.app'>Contact</a></div>
            </div>
    </div>
  )
}
