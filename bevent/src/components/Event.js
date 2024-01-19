import React,{useEffect, useState} from 'react'
import Register from './Register';
import { useNavigate, useParams } from 'react-router-dom';
import logo from '../assets/images/bnug-logo.svg';
import text from '../assets/images/bnugtext.svg';

export default function Event({getEventById,handleRegister,event}) {
    const [isOpen,setIsOpen] = useState(false)
    const {id} = useParams();
    console.log(id)
    const navigate = useNavigate();
    
    useEffect(() => {
        // Call getEventById() when the component mounts
        getEventById(id)
        console.log(event)
      }, [id])

      
  return (
    <div className='wrapper'>
        <div className='container'>
                <a href='https://web-dapp-bnug.vercel.app'>
                    <img src={logo} alt="bnuglogo" ></img>
                    <img src={text} alt="bnugtext"></img>
                </a>
                <h3>...Earn rewards when you stake or provide liquidity into our pool</h3>
            </div>
            <div className='rewards'>
            <div className='rewards_container'>
                    <div className='rewards_box rewards_black'>
                    <div><h3>Event Rewards</h3></div>
                        <h4>Earn rewards when you stake or provide liquidity into our pool</h4>
                        <p>We're a DAO, Leveraging a strong community to build an inclusive financial ecosystem. We're agile, collaborative, diversified and transparent!</p>
                        <a href='https://web-dapp-bnug.vercel.app'>Start Earning</a>
                    </div>
                    {event ? (
                        
                            
                                <div className='rewards_box detailsBox' key={id}>
                                    <div className=''>
                                        <h3 className=''>{event[0]}</h3>
                                    </div>
                                    
                                    <div className=''>
                                    <img src={event.image} alt='celo Nig' width='200px' height='100px'></img>
                                    </div>

                                    <div className='blockDesc'>
                                    <p className=''>{event[1]}</p>
                                    </div>
                                    <div className='eventBox'>
                                    <h3 className=''>{event[2]}</h3>
                                    <h4 className=''>{event[3]}</h4>
                                    <h4 className=''>{event[4]}</h4>
                                    </div>
                                    <div className='eventBox'>
                                    <h4 className=''>{event[5]}</h4>
                                    <h4 className=''>{event[6]}</h4>
                                    <button className='wallet-btn' onClick={()=>setIsOpen(true)}>Register</button>
                                        {isOpen && <Register setIsOpen={setIsOpen} event={event} handleRegister={handleRegister}/>}
                                        <p className='' onClick={()=>navigate('/events')}>Go Back</p>
                                    </div>
                                </div>
                            
                        ) : (
                                    <div><p>Loading...</p></div>
                                    )}
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
