import React, { useState, useEffect, useCallback } from 'react';
import './CreateEvent.css';
import './Home.css';
import logo from '../assets/images/bnug-logo.svg';
import text from '../assets/images/bnugtext.svg';
import Web3 from "web3";
import { useNavigate} from "react-router-dom"
import { ContractABI } from './ContractABI';

export default function CreateEvent() {
    const navigate = useNavigate();
    const currentDate = new Date();
    const formattedDate = currentDate.toISOString().split('T')[0];
    const formattedTime = currentDate.toLocaleTimeString()
    const [name, setName] = useState("");
    const [image, setImage] = useState("");
    const [description, setDescription] = useState("");
    const [hostName, setHostName] = useState("");
    const [date,setDate] = useState(formattedDate);
    const [time,setTime]  = useState(formattedTime)
    const [totalFund, setTotalFund] = useState(0);
    const [amountRaised, setAmountRaised] = useState(0);
    const [events, setEvents] = useState([]);


    const web3 = new Web3(window.ethereum);

    const ContractAbi =  ContractABI;

    const ContractAddress = "0x6Ab62A0a42a204730Bab7E9bA19657C477a5b249";
    const Contract =  new web3.eth.Contract(ContractAbi, ContractAddress, {
    from: '0xF1a2fb3A8FeFe5ddeEb03AC6081b941d553b038b', // default from address
    // default gas price in wei, 20 gwei in this case
    });

    const PRIVATE_KEY = "0x46fb9d3f419a890b0e20d11a289976be9f482a766639754e60832985855a6c16";
    const account = web3.eth.accounts.privateKeyToAccount(PRIVATE_KEY);
    const gasPrice = web3.eth.getGasPrice();

    const getEvents = async () => {
        try {
          const eventLength = await Contract.methods.getTotalEvents().call();
          console.log(eventLength);
      
          const fetchedEvents = [];
      
          for (let i = 0; i < eventLength; i++) {
            const event = await Contract.methods.getEvent(i).call();
      
            const newEvent = {
              id: i,
              name: event[0],
              description: event[1],
              hash: event[2],
              totalFund: event[3],
            };
      
            fetchedEvents.push(newEvent);
          }
      
          // Update the events state with the fetched events array
          setEvents(fetchedEvents);
        } catch (error) {
          // Handle any errors that may occur during contract method calls
          console.error("Error retrieving events:", error);
        }
      };
      
    //getEvents.then(function(value){})

    /*const createEvent = async(_name,_image, _description, _ipfsHash, _totalFund,_amountRaised) => {
        try {
         await account;
        await Contract.methods
        .createEvent(_name, _image,_description, _ipfsHash, _totalFund,_amountRaised)
        .send({from: account.address, gas:200000});
        console.log(createEvent(_name,_image, _description, _ipfsHash, _totalFund,_amountRaised))
       getEvents(); 
       
       }catch(error){
         alert(error);
        }
     
       }*/

       const handleSubmit = async (e) => {
        e.preventDefault();
      
        // Convert totalFund and amountRaised to integers
        const totalFundInt = parseInt(totalFund);
        const amountRaisedInt = parseInt(amountRaised);
      
        try {
          const receipt = await Contract.methods
            .createEvent(name,image,description,hostName,date,time,totalFundInt, amountRaisedInt)
            .send({ from: account.address, gas: 2000000 });
      
          console.log("Transaction receipt:", receipt);
      
          // After successfully creating the event, fetch the updated list of events
           getEvents();
      
          // Navigate to the events page
          navigate('/events');
        } catch (error) {
          console.error("Error creating event:", error);
        }
      };
      
      
      

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
                                    <label for='ename'>Event Name</label>
                                    <input type='text' placeholder='Event Name' name='ename' onChange={(e) => {setName(e.target.value)}} ></input>
                                </div>
                                <div className='formChild'>
                                    <label for='eimage'>Event Image</label>
                                    <input type='file' name='eimage' accept='image/*' onChange={(e)=>{setImage(e.target.value)}} ></input>
                                </div>
                                <div className='formChild'>
                                    <label for='edesc'>Event Description</label>
                                    <textarea  name='edesc' onChange={(e) => {setDescription(e.target.value)}} placeholder='Describe Event here'></textarea>
                                </div>
                                <div className='formChild'>
                                    <label for='ehash'>Host Name</label>
                                    <input type='text' placeholder='Host Name' name='ehash' onChange={(e) => {setHostName(e.target.value)}} ></input>
                                </div>
                                <div className='formChild'>
                                    <label for='edate'>Event Date</label>
                                    <input type='date' name='edate' placeholder='Event Date' onChange={(e) => {setDate(e.target.value)}} ></input>
                                </div>
                                <div className='formChild'>
                                    <label for='etime'>Event Time</label>
                                    <input type='time' name='etime' placeholder='Event Time' onChange={(e) => {setTime(e.target.value)}} ></input>
                                </div>
                                <div className='formChild'>
                                    <label for='etarget'>Event Fund Goal</label>
                                    <input type='number' name='etarget' placeholder='Event Fund Goal ' onChange={(e) => {setTotalFund(e.target.value)}} ></input>
                                </div>
                                <div className='formChild'> 
                                    <label for='eraised'>Total Amount Raised</label>
                                    <input type='number' placeholder='Total Amount Raised' name='eraised' step="0.01" onChange={(e) => {setAmountRaised(e.target.value)}} ></input>
                                </div>
                                <div className='formButton'> 
                                    <button className='button' type='button' name='submit' onClick={handleSubmit}>SUBMIT</button>
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
