import React, { useState } from 'react'
import logo from '../assets/images/bnug-logo.svg';
import text from '../assets/images/bnugtext.svg';

export default function EventRegistration() {
    const [email, setEmail] = useState('')
    const [firstName, setFirstName] = useState('')
    const [middleName, setMiddleName] = useState('')
    const [lastName, setLastName] = useState('')
    const [address, setAddress] = useState('')
    const [state, setState] = useState('')
    const [phone, setPhone] = useState('')

    const handleRegistration = (e) =>{
        e.preventDefault();
        console.log('Registration Succesful')
    }
  return (
    <>
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
                    <div className='formContainer'>
                        <div className='formbox'>
                            <h3>Host An Event</h3>
                            <form className='formBlock' >
                                <div className='formChild'>
                                    <label for='email'>Email</label>
                                    <input type='text' placeholder='Email' name='email' onChange={(e) => {setEmail(e.target.value)}} ></input>
                                </div>
                                <div className='formChild'>
                                    <label for='firstname'>FirstName</label>
                                    <input type='text' name='firstname' placeholder='First Name' onChange={(e)=>{setFirstName(e.target.value)}} ></input>
                                </div>
                                <div className='formChild'>
                                    <label for='middlename'>MiddleName</label>
                                    <input name='middlename' placeholder='Middle Name' onChange={(e) => {setMiddleName(e.target.value)}} ></input>
                                </div>
                                <div className='formChild'>
                                    <label for='lastname'>Last Name</label>
                                    <input type='text' placeholder='Last Name' name='lastname' onChange={(e) => {setLastName(e.target.value)}} ></input>
                                </div>
                                <div className='formChild'>
                                    <label for='address'>Address</label>
                                    <input type='text' name='address' placeholder='Address' onChange={(e) => {setAddress(e.target.value)}} ></input>
                                </div>
                                <div className='formChild'>
                                    <label for='state'>State</label>
                                    <input type='text' name='state' placeholder='State' onChange={(e) => {setState(e.target.value)}} ></input>
                                </div>
                                <div className='formChild'>
                                    <label for='phone'>Phone Number</label>
                                    <input type='number' name='phone' placeholder='Phone Number' onChange={(e) => {setPhone(e.target.value)}} ></input>
                                </div>
                                
                                <div className='formButton'> 
                                    <button className='button' type='button' name='submit' onClick={handleRegistration}>SUBMIT</button>
                                </div>
                            </form>
                        </div>
                    </div>
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
    </>
  )
}
